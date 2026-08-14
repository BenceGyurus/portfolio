"use client";

import React, { useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  Node,
  BackgroundVariant
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTheme } from "next-themes";
import { 
  SiCloudflare, 
  SiTraefikproxy, 
  SiDocker, 
  SiKubernetes, 
  SiHomeassistant, 
  SiTailscale, 
  SiAdguard,
  SiGrafana,
  SiPrometheus,
  SiFlux
} from "react-icons/si";
import { Globe, Gamepad2, Mail, Server } from "lucide-react";

type GroupData = Node<{ label: string; tag?: string }>;
type CardData = Node<{
  title: string;
  subtitle?: string;
  icon?: string;
  tags?: string[];
  status?: "online" | "inactive" | "internal";
}>;

// --- Custom Group Node ---
function GroupNode({ data }: NodeProps<GroupData>) {
  return (
    <div className="w-full h-full border border-dashed border-border/70 bg-card/20 rounded-2xl p-4 transition-all pointer-events-none">
      <div className="flex items-center justify-between gap-2 mb-2 pointer-events-auto">
        <span className="text-xs font-mono font-semibold tracking-wider uppercase text-muted-foreground">
          {data.label}
        </span>
        {data.tag && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted/60 border border-border/50 text-muted-foreground">
            {data.tag}
          </span>
        )}
      </div>
    </div>
  );
}

// --- Custom Service Card Node ---
function CardNode({ data }: NodeProps<CardData>) {
  const renderIcon = () => {
    switch (data.icon) {
      case "cloudflare": return <SiCloudflare className="w-4 h-4 text-[#F38020]" />;
      case "traefik": return <SiTraefikproxy className="w-4 h-4 text-[#24A1C1]" />;
      case "docker": return <SiDocker className="w-4 h-4 text-[#2496ED]" />;
      case "k8s": return <SiKubernetes className="w-4 h-4 text-[#326CE5]" />;
      case "hass": return <SiHomeassistant className="w-4 h-4 text-[#41BDF5]" />;
      case "tailscale": return <SiTailscale className="w-4 h-4 text-blue-400" />;
      case "adguard": return <SiAdguard className="w-4 h-4 text-[#68BC71]" />;
      case "grafana": return <SiGrafana className="w-4 h-4 text-[#F46800]" />;
      case "prometheus": return <SiPrometheus className="w-4 h-4 text-[#E6522C]" />;
      case "flux": return <SiFlux className="w-4 h-4 text-[#50668F]" />;
      case "minecraft": return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      case "mail": return <Mail className="w-4 h-4 text-amber-500" />;
      case "internet": return <Globe className="w-4 h-4 text-blue-500" />;
      default: return <Server className="w-4 h-4 text-foreground/70" />;
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-xl p-3.5 shadow-2xs min-w-[200px] max-w-[260px] text-card-foreground select-none">
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground/40 !w-2 !h-2 !-top-1 opacity-0 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-md bg-muted/50 shrink-0">
            {renderIcon()}
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-semibold leading-tight truncate">{data.title}</h4>
            {data.subtitle && (
              <p className="text-[10px] font-mono text-muted-foreground leading-tight truncate mt-0.5">
                {data.subtitle}
              </p>
            )}
          </div>
        </div>
        {data.status && (
          <span
            className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${
              data.status === "online"
                ? "bg-emerald-500"
                : data.status === "inactive"
                ? "bg-amber-500/60"
                : "bg-blue-500"
            }`}
          />
        )}
      </div>

      {data.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2.5 pt-2 border-t border-border/40">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground border border-border/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!bg-muted-foreground/40 !w-2 !h-2 !-bottom-1 opacity-0 group-hover:opacity-100" />
    </div>
  );
}

const nodeTypes = {
  groupNode: GroupNode,
  cardNode: CardNode,
};

export function TopologyFlow() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const initialNodes = useMemo(
    () => [
      // 1. External Public Internet
      {
        id: "internet",
        type: "cardNode",
        position: { x: 340, y: 20 },
        data: { title: "Public Internet", subtitle: "Global Traffic", icon: "internet", status: "online" }
      },
      // 2. Cloudflare Tunnel LXC
      {
        id: "cloudflare",
        type: "cardNode",
        position: { x: 340, y: 110 },
        data: { title: "cloudflare-tunnel", subtitle: "LXC Container", icon: "cloudflare", status: "online", tags: ["Encrypted Tunnel"] }
      },

      // 3. Proxmox Container Group
      {
        id: "proxmox",
        type: "groupNode",
        position: { x: 20, y: 210 },
        style: { width: 900, height: 720 },
        data: { label: "Proxmox VE Hypervisor", tag: "Bare-Metal Host" }
      },

      // Main Loadbalancer LXC inside Proxmox
      {
        id: "main-lb",
        type: "cardNode",
        position: { x: 340, y: 260 },
        data: { title: "loadbalancer", subtitle: "Traefik Reverse Proxy LXC", icon: "traefik", status: "online", tags: ["SSL Offloading", "Routing"] }
      },

      // Subgroup A: docker-vm (Stateful)
      {
        id: "docker-group",
        type: "groupNode",
        position: { x: 40, y: 380 },
        style: { width: 400, height: 260 },
        data: { label: "docker-vm", tag: "4TB Stateful Storage" }
      },
      {
        id: "docker-traefik",
        type: "cardNode",
        position: { x: 60, y: 440 },
        data: {
          title: "Dedicated Docker Traefik",
          subtitle: "Container Proxy",
          icon: "docker",
          status: "online",
          tags: ["Immich", "Seafile", "Paperless", "Authentik", "Forgejo", "OpenWebUI", "Affine"]
        }
      },

      // Subgroup B: docker2 (Stateless)
      {
        id: "docker2-group",
        type: "groupNode",
        position: { x: 470, y: 380 },
        style: { width: 430, height: 260 },
        data: { label: "docker2", tag: "Stateless & Monitoring" }
      },
      {
        id: "grafana",
        type: "cardNode",
        position: { x: 490, y: 440 },
        data: { title: "Grafana", subtitle: "Dashboards & Alerts", icon: "grafana", status: "online" }
      },
      {
        id: "prometheus",
        type: "cardNode",
        position: { x: 680, y: 440 },
        data: { title: "Prometheus", subtitle: "Metrics Storage", icon: "prometheus", status: "online" }
      },

      // Subgroup C: Talos K8s Cluster
      {
        id: "k8s-group",
        type: "groupNode",
        position: { x: 40, y: 660 },
        style: { width: 400, height: 240 },
        data: { label: "Talos K8s Cluster", tag: "Kubernetes" }
      },
      {
        id: "k8s-ingress",
        type: "cardNode",
        position: { x: 60, y: 720 },
        data: { title: "Internal K8s Traefik", subtitle: "Ingress Controller", icon: "traefik", status: "online" }
      },
      {
        id: "flux",
        type: "cardNode",
        position: { x: 230, y: 720 },
        data: { title: "Flux CD", subtitle: "GitOps Engine", icon: "flux", status: "online" }
      },

      // Subgroup D: Dedicated VMs & VLAN 99
      {
        id: "services-group",
        type: "groupNode",
        position: { x: 470, y: 660 },
        style: { width: 430, height: 240 },
        data: { label: "Network & Service VMs", tag: "VLAN 99 / HAOS" }
      },
      {
        id: "tailscale",
        type: "cardNode",
        position: { x: 490, y: 720 },
        data: { title: "Tailscale Gateway", subtitle: "LXC (VLAN 99)", icon: "tailscale", status: "online" }
      },
      {
        id: "adguard",
        type: "cardNode",
        position: { x: 680, y: 720 },
        data: { title: "AdGuard Home", subtitle: "DNS Server LXC", icon: "adguard", status: "online" }
      },
      {
        id: "hass",
        type: "cardNode",
        position: { x: 490, y: 810 },
        data: { title: "Home-Assistant", subtitle: "HAOS VM", icon: "hass", status: "online" }
      },
      {
        id: "minecraft",
        type: "cardNode",
        position: { x: 680, y: 810 },
        data: { title: "Minecraft Server", subtitle: "Crafty Controller VM", icon: "minecraft", status: "online" }
      }
    ],
    []
  );

  const strokeColor = isDark ? "#64748b" : "#94a3b8";

  const initialEdges = useMemo(
    () => [
      { id: "e1", source: "internet", target: "cloudflare", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e2", source: "cloudflare", target: "main-lb", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e3", source: "main-lb", target: "docker-traefik", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e4", source: "main-lb", target: "grafana", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e5", source: "main-lb", target: "prometheus", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e6", source: "main-lb", target: "k8s-ingress", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e7", source: "k8s-ingress", target: "flux", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e8", source: "tailscale", target: "adguard", style: { stroke: strokeColor, strokeWidth: 1.5 } }
    ],
    [strokeColor]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[650px] rounded-xl border border-border bg-card/20 backdrop-blur-xs overflow-hidden relative select-none">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={2.0}
        colorMode={isDark ? "dark" : "light"}
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={28}
          size={1}
          color={isDark ? "#27272a" : "#e4e4e7"}
        />
        <Controls
          className="!bg-background/80 !backdrop-blur-md !border !border-border !rounded-lg !shadow-2xs font-mono text-xs !m-3"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}
