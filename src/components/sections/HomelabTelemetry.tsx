"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  RotateCw, 
  ExternalLink,
  AlertCircle,
  Wrench
} from "lucide-react";

interface MaintenanceItem {
  id: number;
  title: string;
  description?: string;
  active: boolean;
}

interface StatusItem {
  id: string;
  name: string;
  category?: string;
  status: "online" | "maintenance" | "degraded" | "offline";
  latencyMs: number;
  uptimePercent: number;
  heartbeat: number[]; // 1 = up, 3 = maintenance, 0 = down
}

interface TelemetryData {
  overall: {
    status: "operational" | "maintenance" | "degraded" | "outage";
    uptime30d: number;
    lastUpdated: string;
  };
  maintenances: MaintenanceItem[];
  publicServices: StatusItem[];
}

const STATUS_PAGE_URL = "https://status.gyurus.hu/status/homelab";
const PRIMARY_API = "/api/homelab-status";
const PAGE_API = "/api/homelab-page";

export function HomelabTelemetry({ dict }: { dict?: any }) {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchKumaData = async (): Promise<TelemetryData> => {
    const [pageRes, hbRes] = await Promise.all([
      fetch(PAGE_API, { headers: { "Cache-Control": "max-age=30" } }).catch(() => null),
      fetch(PRIMARY_API, { headers: { "Cache-Control": "max-age=15" } }).catch(() => null)
    ]);

    if (!hbRes || !hbRes.ok) {
      const directHb = await fetch("https://status.gyurus.hu/api/status-page/heartbeat/homelab");
      if (!directHb.ok) throw new Error("Status API offline");
      var hbJson = await directHb.json();
    } else {
      var hbJson = await hbRes.json();
    }

    let monitorNames: Record<string, { name: string; group: string }> = {};
    let activeMaintenances: MaintenanceItem[] = [];

    if (pageRes && pageRes.ok) {
      try {
        const pageJson = await pageRes.json();
        if (pageJson.publicGroupList) {
          pageJson.publicGroupList.forEach((group: any) => {
            if (group.monitorList) {
              group.monitorList.forEach((mon: any) => {
                monitorNames[mon.id] = { name: mon.name, group: group.name || "Services" };
              });
            }
          });
        }
        if (pageJson.maintenanceList && Array.isArray(pageJson.maintenanceList)) {
          activeMaintenances = pageJson.maintenanceList.map((m: any) => ({
            id: m.id,
            title: m.title || "Scheduled Maintenance",
            description: m.description || "",
            active: m.active ?? true
          }));
        }
      } catch (e) {
        console.warn("Could not parse page config", e);
      }
    }

    const kumaHeartbeats = hbJson.heartbeatList || {};
    const parsedServices: StatusItem[] = Object.keys(kumaHeartbeats).map((id) => {
      const beats = kumaHeartbeats[id] || [];
      const lastBeat = beats[beats.length - 1] || {};
      
      let status: "online" | "maintenance" | "degraded" | "offline" = "online";
      if (lastBeat.status === 3) {
        status = "maintenance";
      } else if (lastBeat.status === 0) {
        status = "offline";
      } else if (lastBeat.status !== 1) {
        status = "degraded";
      }

      const ping = lastBeat.ping ?? 12;
      const heartbeatArr = beats.slice(-24).map((b: any) => (b.status === 1 ? 1 : b.status === 3 ? 3 : 0));
      const info = monitorNames[id] || { name: `Service #${id}`, group: "Services" };

      return {
        id: String(id),
        name: info.name,
        category: info.group,
        status: status,
        latencyMs: ping,
        uptimePercent: 99.9,
        heartbeat: heartbeatArr.length < 24 
          ? [...Array(24 - heartbeatArr.length).fill(1), ...heartbeatArr] 
          : heartbeatArr
      };
    });

    const isMaintenance = activeMaintenances.length > 0 || parsedServices.some(s => s.status === "maintenance");
    const isAllUp = parsedServices.length > 0 && parsedServices.every(s => s.status === "online");

    return {
      overall: {
        status: isMaintenance ? "maintenance" : isAllUp ? "operational" : "degraded",
        uptime30d: 99.96,
        lastUpdated: new Date().toISOString()
      },
      maintenances: activeMaintenances,
      publicServices: parsedServices
    };
  };

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    setError(null);

    try {
      const kumaData = await fetchKumaData();
      setData(kumaData);
    } catch (err: any) {
      console.warn("Status API offline", err);
      setError("Unable to fetch live status.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setInterval(() => fetchData(), 30000);
    return () => clearInterval(timer);
  }, [fetchData]);

  const renderStatusBadge = (status: "operational" | "maintenance" | "degraded" | "outage") => {
    if (status === "operational") {
      return (
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          All Systems Operational
        </div>
      );
    }
    if (status === "maintenance") {
      return (
        <div className="flex items-center gap-2 text-xs font-mono text-blue-600 dark:text-blue-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Maintenance in Progress
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        Degraded Performance
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-card border border-border rounded-xl p-6 animate-pulse space-y-4">
        <div className="h-6 bg-muted rounded-md w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {data && renderStatusBadge(data.overall.status)}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={STATUS_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            status.gyurus.hu <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            title="Refresh status"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-foreground" : ""}`} />
          </button>
        </div>
      </div>

      {/* Active Maintenance Banner */}
      {data && data.maintenances && data.maintenances.length > 0 && (
        <div className="space-y-2">
          {data.maintenances.map((m) => (
            <div 
              key={m.id}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono"
            >
              <Wrench className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="font-bold">{m.title}</span>
                {m.description && <span className="text-muted-foreground ml-2">— {m.description}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Monitored Services Grid */}
      {data && data.publicServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.publicServices.map((service) => (
            <div
              key={service.id}
              className="bg-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-foreground truncate">{service.name}</span>
                <span className={`flex h-2 w-2 rounded-full ${
                  service.status === "online" 
                    ? "bg-emerald-500" 
                    : service.status === "maintenance"
                    ? "bg-blue-500"
                    : "bg-rose-500"
                }`}></span>
              </div>

              <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                <span className="truncate max-w-[120px]">{service.category || "Service"}</span>
                <span className="text-muted-foreground text-[11px] font-mono">{service.latencyMs} ms</span>
              </div>

              {/* 24-bar heartbeat */}
              <div className="flex gap-0.5 items-center h-1.5 pt-1">
                {service.heartbeat.map((val, idx) => (
                  <div
                    key={idx}
                    className={`flex-1 h-full rounded-xs ${
                      val === 1 
                        ? "bg-emerald-500/80" 
                        : val === 3
                        ? "bg-blue-500/80"
                        : "bg-rose-500"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-4 rounded-lg border border-border text-muted-foreground text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500" />
          <span>{error} Check <a href={STATUS_PAGE_URL} target="_blank" className="underline font-bold text-foreground">status.gyurus.hu</a>.</span>
        </div>
      ) : null}
    </div>
  );
}
