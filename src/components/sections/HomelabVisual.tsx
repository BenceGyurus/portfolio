"use client";

import React from "react";
import { TopologyFlow } from "@/components/TopologyFlow";

export function HomelabVisual({ dict }: { dict?: any }) {
  return (
    <div className="w-full">
      <TopologyFlow />
    </div>
  );
}
