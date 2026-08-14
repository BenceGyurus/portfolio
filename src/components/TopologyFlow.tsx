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
  SiFlux,
  SiImmich,
  SiSeafile,
  SiPaperlessngx,
  SiAuthentik,
  SiForgejo,
  SiAffine
} from "react-icons/si";
import { 
  Globe, 
  Gamepad2, 
  Mail, 
  Layers,
  Bot
} from "lucide-react";

type GroupData = Node<{ label: string }>;
type CardData = Node<{
  title: string;
  subtitle?: string;
  icon?: string;
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
      case "immich": return <SiImmich className="w-4 h-4 text-[#8957E5]" />;
      case "seafile": return <SiSeafile className="w-4 h-4 text-[#00A8E8]" />;
      case "paperless": return <SiPaperlessngx className="w-4 h-4 text-[#17A2B8]" />;
      case "authentik": return <SiAuthentik className="w-4 h-4 text-[#FD4F00]" />;
      case "forgejo": return <SiForgejo className="w-4 h-4 text-[#F05032]" />;
      case "openwebui": return <Bot className="w-4 h-4 text-[#10A37F]" />;
      case "affine": return <SiAffine className="w-4 h-4 text-[#0052FF]" />;
      case "minecraft": return <Gamepad2 className="w-4 h-4 text-emerald-500" />;
      case "mail": return <Mail className="w-4 h-4 text-amber-500" />;
      case "internet": return <Globe className="w-4 h-4 text-blue-500" />;
      default: return <Layers className="w-4 h-4 text-foreground/70" />;
    }
  };

  return (
    <div className="relative bg-card border border-border rounded-xl p-3 shadow-2xs w-[190px] text-card-foreground select-none">
      <Handle type="target" position={Position.Top} className="!bg-muted-foreground/40 !w-2 !h-2 !-top-1 opacity-0 group-hover:opacity-100" />
      
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
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
        position: { x: 390, y: 20 },
        data: { title: "Public Internet", subtitle: "Global Traffic", icon: "internet", status: "online" }
      },

      // 2. Proxmox Container Group (VLAN 100 Main Host)
      {
        id: "proxmox",
        type: "groupNode",
        position: { x: 20, y: 110 },
        style: { width: 960, height: 960 },
        data: { label: "Proxmox VE Hypervisor" }
      },

      // Cloudflare Tunnel LXC inside Proxmox
      {
        id: "cloudflare",
        type: "cardNode",
        position: { x: 390, y: 160 },
        data: { title: "cloudflare-tunnel", subtitle: "LXC Container", icon: "cloudflare", status: "online" }
      },

      // Main Loadbalancer LXC inside Proxmox
      {
        id: "main-lb",
        type: "cardNode",
        position: { x: 390, y: 260 },
        data: { title: "loadbalancer", subtitle: "Traefik Reverse Proxy LXC", icon: "traefik", status: "online" }
      },

      // --- Subgroup A: docker-vm (Stateful 4TB) ---
      {
        id: "docker-group",
        type: "groupNode",
        position: { x: 40, y: 360 },
        style: { width: 920, height: 320 },
        data: { label: "docker-vm (4TB Stateful Storage)" }
      },
      { id: "docker-traefik", type: "cardNode", position: { x: 60, y: 420 }, data: { title: "Docker Traefik", subtitle: "Dedicated Container Proxy", icon: "traefik", status: "online" } },
      { id: "immich", type: "cardNode", position: { x: 280, y: 420 }, data: { title: "Immich", subtitle: "Photo & Video Storage", icon: "immich", status: "online" } },
      { id: "seafile", type: "cardNode", position: { x: 500, y: 420 }, data: { title: "Seafile", subtitle: "Cloud File Storage", icon: "seafile", status: "online" } },
      { id: "paperless", type: "cardNode", position: { x: 720, y: 420 }, data: { title: "Paperless-ngx", subtitle: "Document Management", icon: "paperless", status: "online" } },
      { id: "authentik", type: "cardNode", position: { x: 60, y: 540 }, data: { title: "Authentik", subtitle: "Identity & SSO Auth", icon: "authentik", status: "online" } },
      { id: "forgejo", type: "cardNode", position: { x: 280, y: 540 }, data: { title: "Forgejo", subtitle: "Git Code Server", icon: "forgejo", status: "online" } },
      { id: "openwebui", type: "cardNode", position: { x: 500, y: 540 }, data: { title: "OpenWebUI", subtitle: "AI Workspace", icon: "openwebui", status: "online" } },
      { id: "affine", type: "cardNode", position: { x: 720, y: 540 }, data: { title: "Affine", subtitle: "Knowledge Workspace", icon: "affine", status: "online" } },

      // --- Subgroup B: docker2 (Stateless) ---
      {
        id: "docker2-group",
        type: "groupNode",
        position: { x: 40, y: 710 },
        style: { width: 440, height: 160 },
        data: { label: "docker2 (Stateless)" }
      },
      { id: "grafana", type: "cardNode", position: { x: 60, y: 770 }, data: { title: "Grafana", subtitle: "Dashboards & Alerts", icon: "grafana", status: "online" } },
      { id: "prometheus", type: "cardNode", position: { x: 270, y: 770 }, data: { title: "Prometheus", subtitle: "Metrics Storage", icon: "prometheus", status: "online" } },

      // --- Subgroup C: Talos K8s Cluster ---
      {
        id: "k8s-group",
        type: "groupNode",
        position: { x: 500, y: 710 },
        style: { width: 460, height: 160 },
        data: { label: "Talos K8s Cluster" }
      },
      { id: "k8s-ingress", type: "cardNode", position: { x: 520, y: 770 }, data: { title: "Internal K8s Traefik", subtitle: "Ingress Controller", icon: "traefik", status: "online" } },
      { id: "flux", type: "cardNode", position: { x: 730, y: 770 }, data: { title: "Flux CD", subtitle: "GitOps Engine", icon: "flux", status: "online" } },

      // --- Separate VM Subgroup D1: Home-Assistant HAOS (Dedicated VM) ---
      {
        id: "hass-vm-group",
        type: "groupNode",
        position: { x: 40, y: 890 },
        style: { width: 230, height: 160 },
        data: { label: "Home-Assistant (VM)" }
      },
      { id: "hass", type: "cardNode", position: { x: 60, y: 940 }, data: { title: "Home-Assistant", subtitle: "HAOS OS", icon: "hass", status: "online" } },

      // --- Separate VM Subgroup D2: Minecraft Server (Dedicated VM) ---
      {
        id: "mc-vm-group",
        type: "groupNode",
        position: { x: 280, y: 890 },
        style: { width: 230, height: 160 },
        data: { label: "minecraft (VM)" }
      },
      { id: "minecraft", type: "cardNode", position: { x: 300, y: 940 }, data: { title: "Minecraft Server", subtitle: "Crafty Controller", icon: "minecraft", status: "online" } },

      // --- Separate Top-Level Network: VLAN 99 (Secure VPN Network) ---
      {
        id: "vlan99-group",
        type: "groupNode",
        position: { x: 530, y: 890 },
        style: { width: 430, height: 160 },
        data: { label: "VLAN 99 (Tailscale VPN)" }
      },
      { id: "tailscale", type: "cardNode", position: { x: 550, y: 940 }, data: { title: "Tailscale Gateway", subtitle: "LXC Container", icon: "tailscale", status: "online" } },
      { id: "adguard", type: "cardNode", position: { x: 750, y: 940 }, data: { title: "AdGuard Home", subtitle: "DNS Server LXC", icon: "adguard", status: "online" } }
    ],
    []
  );

  const strokeColor = isDark ? "#64748b" : "#94a3b8";

  const initialEdges = useMemo(
    () => [
      { id: "e1", source: "internet", target: "cloudflare", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e2", source: "cloudflare", target: "main-lb", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      
      // Main LB to Docker Traefik & Services
      { id: "e3", source: "main-lb", target: "docker-traefik", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e3-1", source: "docker-traefik", target: "immich", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-2", source: "docker-traefik", target: "seafile", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-3", source: "docker-traefik", target: "paperless", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-4", source: "docker-traefik", target: "authentik", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-5", source: "docker-traefik", target: "forgejo", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-6", source: "docker-traefik", target: "openwebui", style: { stroke: strokeColor, strokeWidth: 1 } },
      { id: "e3-7", source: "docker-traefik", target: "affine", style: { stroke: strokeColor, strokeWidth: 1 } },

      // Main LB to docker2
      { id: "e4", source: "main-lb", target: "grafana", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e5", source: "main-lb", target: "prometheus", style: { stroke: strokeColor, strokeWidth: 1.5 } },

      // Main LB to K8s
      { id: "e6", source: "main-lb", target: "k8s-ingress", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e7", source: "k8s-ingress", target: "flux", style: { stroke: strokeColor, strokeWidth: 1.5 } },

      // Main LB to Dedicated VMs
      { id: "e8-1", source: "main-lb", target: "hass", style: { stroke: strokeColor, strokeWidth: 1.5 } },
      { id: "e8-2", source: "main-lb", target: "minecraft", style: { stroke: strokeColor, strokeWidth: 1.5 } },

      // VLAN 99 Tailscale to AdGuard
      { id: "e9", source: "tailscale", target: "adguard", style: { stroke: strokeColor, strokeWidth: 1.5 } }
    ],
    [strokeColor]
  );

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[700px] rounded-xl border border-border bg-card/20 backdrop-blur-xs overflow-hidden relative select-none">
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
        fitViewOptions={{ padding: 0.15 }}
        minZoom={0.3}
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
