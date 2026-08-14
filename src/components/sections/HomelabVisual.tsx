"use client";

import React from "react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const HOMELAB_MERMAID_CHART = `
graph TD
    Internet[Internet Public Traffic] --> Cloudflare[cloudflare-tunnel LXC]
    
    subgraph Proxmox [Proxmox VE Hypervisor]
        MainTraefik[loadbalancer - Main Traefik Reverse Proxy LXC]
        Cloudflare --> MainTraefik
        
        subgraph DockerMain ["docker-vm - Main Docker Host (4TB)"]
            DockerTraefik[Dedicated Docker Traefik]
            DockerTraefik --> Immich[Immich - Photo Storage]
            DockerTraefik --> Seafile[Seafile - Cloud Storage]
            DockerTraefik --> Paperless[Paperless-ngx - Documents]
            DockerTraefik --> Authentik[Authentik - SSO & Auth]
            DockerTraefik --> Forgejo[Forgejo - Git Server]
            DockerTraefik --> OpenWebUI[OpenWebUI - AI Workspace]
            DockerTraefik --> Affine[Affine - Workspace]
        end
        
        subgraph DockerStateless ["docker2 - Stateless & Monitoring"]
            Grafana[Grafana - Dashboards]
            Prometheus[Prometheus - Metrics]
        end
        
        subgraph K8sCluster ["Talos K8s Cluster (Bare-Metal)"]
            K8sTraefik[Internal K8s Traefik Ingress Controller]
            K8sTraefik --> TalosCP[talos-controlplane]
            K8sTraefik --> TalosWorker[talos-worker]
            TalosCP --- TalosWorker
            TalosWorker --> Flux[Flux CD - GitOps Engine]
        end
        
        subgraph VLAN99 ["VLAN 99 - Secure Network"]
            Tailscale[vpn - Tailscale Gateway LXC] --> AdGuard[adguard-home - DNS Server LXC]
        end
        
        subgraph DedicatedVMs ["Dedicated Service VMs"]
            HASS[Home-Assistant HAOS]
            Crafty[minecraft - Crafty Controller]
            Maildrop[mail-drop-server]
            UniFi[unifi Controller - Inactive]
        end

        MainTraefik --> DockerTraefik
        MainTraefik --> Grafana
        MainTraefik --> Prometheus
        MainTraefik --> K8sTraefik
    end
`;

export function HomelabVisual({ dict }: { dict?: any }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap justify-between items-center text-xs font-mono text-muted-foreground px-1">
        <span>Proxmox VE Cluster Architecture</span>
        <span>Mermaid.js Topology Flowchart</span>
      </div>
      <MermaidDiagram chart={HOMELAB_MERMAID_CHART} id="homelab-mermaid-diagram" />
    </div>
  );
}
