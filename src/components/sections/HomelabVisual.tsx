"use client";

import React from "react";
import { MermaidDiagram } from "@/components/MermaidDiagram";

const HOMELAB_MERMAID_CHART = `
graph TD
    Internet[Internet Public Traffic] --> Cloudflare[cloudflare-tunnel LXC 106]
    Cloudflare --> Traefik[loadbalancer Traefik VM 600]
    
    subgraph VLAN99 [VLAN 99 - Secure Network]
        Tailscale[vpn Tailscale VM 113] --> AdGuard[adguard-home DNS VM 104]
    end
    
    subgraph Proxmox [Proxmox VE Hypervisor]
        Traefik --> DockerVM[docker-vm Main Docker Host VM 103 - 4TB Storage]
        Traefik --> Docker2[docker2 Monitoring Host VM 112]
        Traefik --> TalosCP[talos-controlplane K8s Control Plane VM 120]
        Traefik --> TalosWorker[talos-worker K8s Worker Node VM 121]
        
        subgraph DockerVMApps [Stateful Stack - docker-vm 103]
            Immich[Immich Media Archival]
            Seafile[Seafile Storage]
            Paperless[Paperless-ngx Documents]
            Authentik[Authentik SSO]
            Forgejo[Forgejo Git]
            OpenWebUI[OpenWebUI AI]
            Affine[Affine Workspace]
        end
        
        subgraph Docker2Apps [Monitoring Stack - docker2 112]
            Grafana[Grafana Dashboards]
            Prometheus[Prometheus Metrics]
        end
        
        subgraph DedicatedVMs [Dedicated VMs & LXCs]
            HASS[Home-Assistant HAOS VM 780]
            Crafty[minecraft Crafty Controller VM 102]
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
        <span>Mermaid.js Flowchart</span>
      </div>
      <MermaidDiagram chart={HOMELAB_MERMAID_CHART} id="homelab-mermaid-diagram" />
    </div>
  );
}
