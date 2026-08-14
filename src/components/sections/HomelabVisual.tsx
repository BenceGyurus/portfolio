"use client";

import React from "react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const HOMELAB_MERMAID_CHART = `
graph TD
    Internet[Internet Public Traffic] --> Cloudflare[cloudflare-tunnel LXC 106]
    Cloudflare --> Traefik[loadbalancer Traefik VM 600]
    
    subgraph Proxmox [Proxmox VE Hypervisor]
        
        subgraph DockerMain ["docker-vm (VM 103) - Main Docker Host (4TB)"]
            Traefik --> DockerTraefik[Dedicated Docker Traefik]
            DockerTraefik --> Immich[Immich - Photo Storage]
            DockerTraefik --> Seafile[Seafile - Cloud Storage]
            DockerTraefik --> Paperless[Paperless-ngx - Documents]
            DockerTraefik --> Authentik[Authentik - SSO & Auth]
            DockerTraefik --> Forgejo[Forgejo - Git Server]
            DockerTraefik --> OpenWebUI[OpenWebUI - AI Workspace]
            DockerTraefik --> Affine[Affine - Workspace]
        end
        
        subgraph DockerStateless ["docker2 (VM 112) - Stateless & Monitoring"]
            Traefik --> Grafana[Grafana - Dashboards]
            Traefik --> Prometheus[Prometheus - Metrics]
        end
        
        subgraph K8sCluster ["Talos K8s Cluster"]
            Traefik --> TalosCP[talos-controlplane VM 120]
            Traefik --> TalosWorker[talos-worker VM 121]
            TalosCP --- TalosWorker
            TalosWorker --> Flux[Flux CD - GitOps Engine]
        end
        
        subgraph VLAN99 ["VLAN 99 - Secure VPN Network"]
            Tailscale[vpn VM 113 - Tailscale Gateway] --> AdGuard[adguard-home VM 104 - DNS Server]
        end
        
        subgraph DedicatedVMs ["Dedicated Service VMs"]
            HASS[Home-Assistant HAOS VM 780]
            Crafty[minecraft VM 102 - Crafty Controller]
            Maildrop[mail-drop-server VM 107]
            UniFi[unifi Controller VM 105 - Inactive]
        end
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
