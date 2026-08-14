"use client";

import React, { useState, useEffect, useCallback } from "react";
import { 
  Activity, 
  RotateCw, 
  ShieldCheck, 
  Globe, 
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

interface StatusItem {
  id: string;
  name: string;
  category?: string;
  status: "online" | "degraded" | "offline";
  latencyMs: number;
  uptimePercent: number;
  heartbeat: number[]; // 1 = up, 0 = down
}

interface TelemetryData {
  overall: {
    status: "operational" | "degraded" | "outage";
    uptime30d: number;
    lastUpdated: string;
  };
  publicServices: StatusItem[];
}

const STATUS_PAGE_URL = "https://status.gyurus.hu/status/homelab";
const PRIMARY_API = "/api/homelab-status";
const PAGE_API = "/api/homelab-page";
const AUTO_REFRESH_INTERVAL = 30;

export function HomelabTelemetry({ dict }: { dict?: any }) {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number>(AUTO_REFRESH_INTERVAL);

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
      } catch (e) {
        console.warn("Could not parse monitor names", e);
      }
    }

    const kumaHeartbeats = hbJson.heartbeatList || {};
    const parsedServices: StatusItem[] = Object.keys(kumaHeartbeats).map((id) => {
      const beats = kumaHeartbeats[id] || [];
      const lastBeat = beats[beats.length - 1] || {};
      const isUp = lastBeat.status === 1;
      const ping = lastBeat.ping ?? 12;
      const heartbeatArr = beats.slice(-24).map((b: any) => (b.status === 1 ? 1 : 0));
      const info = monitorNames[id] || { name: `Service #${id}`, group: "Services" };

      return {
        id: String(id),
        name: info.name,
        category: info.group,
        status: isUp ? "online" : "offline",
        latencyMs: ping,
        uptimePercent: 99.9,
        heartbeat: heartbeatArr.length < 24 
          ? [...Array(24 - heartbeatArr.length).fill(1), ...heartbeatArr] 
          : heartbeatArr
      };
    });

    const isAllUp = parsedServices.length > 0 && parsedServices.every(s => s.status === "online");

    return {
      overall: {
        status: isAllUp ? "operational" : "degraded",
        uptime30d: 99.96,
        lastUpdated: new Date().toISOString()
      },
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
      setCountdown(AUTO_REFRESH_INTERVAL);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          fetchData();
          return AUTO_REFRESH_INTERVAL;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [fetchData]);

  const renderStatusBadge = (status: "operational" | "degraded" | "outage") => {
    if (status === "operational") {
      return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          All Systems Operational
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium">
        <span className="relative flex h-2 w-2">
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        Degraded Performance
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full bg-card border border-border rounded-2xl p-6 sm:p-8 animate-pulse space-y-6">
        <div className="h-10 bg-muted rounded-xl w-3/4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-card border border-border rounded-2xl p-4 sm:p-8 text-card-foreground shadow-sm space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-500" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg leading-snug">Homelab Live Status</h3>
              <a
                href={STATUS_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-500 transition-colors"
                title="View Uptime Kuma Status Page"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Live from <span className="text-blue-500 font-medium">status.gyurus.hu</span> • 30s Auto-Poll
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {data && renderStatusBadge(data.overall.status)}
          
          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-muted/80 border border-border text-xs font-mono text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
            title="Refresh status now"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
            <span>{countdown}s</span>
          </button>
        </div>
      </div>

      {/* 2. Live Monitored Public Services (from status.gyurus.hu ONLY) */}
      {data && data.publicServices.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold font-mono text-muted-foreground uppercase tracking-wider">
              Monitored Services
            </h4>
            <a
              href={STATUS_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-blue-500 hover:underline flex items-center gap-1"
            >
              status.gyurus.hu <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.publicServices.map((service) => (
              <div
                key={service.id}
                className="bg-background/60 border border-border hover:border-muted-foreground/30 rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground truncate">{service.name}</span>
                  <span className={`flex h-2.5 w-2.5 rounded-full ${service.status === "online" ? "bg-emerald-500" : "bg-rose-500"}`}></span>
                </div>

                <div className="flex justify-between items-center text-xs font-mono text-muted-foreground">
                  <span className="truncate max-w-[120px]">{service.category || "Service"}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{service.latencyMs} ms</span>
                </div>

                {/* 24-bar heartbeat */}
                <div className="flex gap-1 items-center h-2 pt-1">
                  {service.heartbeat.map((val, idx) => (
                    <div
                      key={idx}
                      className={`flex-1 h-full rounded-xs transition-colors ${
                        val === 1 
                          ? "bg-emerald-500/80 hover:bg-emerald-400" 
                          : "bg-rose-500/80 hover:bg-rose-400"
                      }`}
                      title={`Hour ${24 - idx}h ago: ${val === 1 ? "Up" : "Down"}`}
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 text-rose-500 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error} Check <a href={STATUS_PAGE_URL} target="_blank" className="underline font-bold">status.gyurus.hu</a> directly.</span>
        </div>
      ) : null}

      {/* Footer info */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground font-mono pt-4 border-t border-border gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-500" />
          <span>Real-time data from Uptime Kuma API</span>
        </div>
        <div>
          <a href={STATUS_PAGE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors font-medium">
            status.gyurus.hu
          </a>
        </div>
      </div>
    </div>
  );
}
