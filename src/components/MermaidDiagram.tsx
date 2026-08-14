"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidProps {
  chart: string;
  id?: string;
}

export function MermaidDiagram({ chart, id = "homelab-topology-mermaid" }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let isSubscribed = true;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;
        
        const isDark = resolvedTheme === "dark";
        
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-geist-mono), monospace",
          themeVariables: isDark ? {
            primaryColor: "#1e293b",
            primaryTextColor: "#f8fafc",
            primaryBorderColor: "#3b82f6",
            lineColor: "#64748b",
            secondaryColor: "#0f172a",
            tertiaryColor: "#020617",
            clusterBkg: "#09090b",
            clusterBorder: "#3f3f46",
          } : {
            primaryColor: "#f1f5f9",
            primaryTextColor: "#0f172a",
            primaryBorderColor: "#2563eb",
            lineColor: "#94a3b8",
            secondaryColor: "#ffffff",
            tertiaryColor: "#f8fafc",
            clusterBkg: "#f8fafc",
            clusterBorder: "#e2e8f0",
          }
        });

        const uniqueId = `${id}-${Date.now()}`;
        const { svg } = await mermaid.render(uniqueId, chart);

        if (isSubscribed) {
          setSvgContent(svg);
        }
      } catch (err) {
        console.error("Mermaid rendering failed:", err);
      }
    }

    renderChart();

    return () => {
      isSubscribed = false;
    };
  }, [chart, resolvedTheme, mounted, id]);

  if (!mounted) {
    return (
      <div className="w-full h-64 bg-muted/40 rounded-xl animate-pulse flex items-center justify-center text-xs font-mono text-muted-foreground">
        Loading topology diagram...
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto p-4 rounded-xl border border-border bg-card/50 backdrop-blur-sm flex justify-center selection:bg-blue-500/20">
      <div 
        ref={containerRef}
        className="w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
        dangerouslySetInnerHTML={{ __html: svgContent }}
      />
    </div>
  );
}
