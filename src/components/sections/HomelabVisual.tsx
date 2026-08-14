"use client";

import React from "react";
import { TopologyFlow } from "@/components/TopologyFlow";

export function HomelabVisual({ dict }: { dict?: any }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap justify-between items-center text-xs font-mono text-muted-foreground px-1">
        <span>Proxmox VE Cluster Architecture</span>
        <span>Interactive Node Topology</span>
      </div>
      <TopologyFlow />
    </div>
  );
}
