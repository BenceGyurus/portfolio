"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
    <div className="relative w-full rounded-xl border border-border bg-card/40 backdrop-blur-xs overflow-hidden select-none">
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={4}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        {({ zoomIn, zoomOut, resetTransform, state }) => (
          <>
            {/* Minimal Zoom Controls */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-background/85 backdrop-blur-md border border-border rounded-lg p-1 shadow-xs font-mono text-xs">
              <button
                onClick={() => zoomOut()}
                className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Zoom Out"
                aria-label="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="px-1.5 text-[11px] font-medium text-muted-foreground min-w-[42px] text-center select-none">
                {Math.round(state.scale * 100)}%
              </span>

              <button
                onClick={() => zoomIn()}
                className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Zoom In"
                aria-label="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <div className="h-3 w-px bg-border mx-0.5"></div>

              <button
                onClick={() => resetTransform()}
                className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
                title="Reset"
                aria-label="Reset"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>

            {/* Pan & Zoom Canvas Container */}
            <TransformComponent
              wrapperClass="!w-full !h-auto min-h-[420px] cursor-grab active:cursor-grabbing"
              contentClass="!w-full flex justify-center p-4 sm:p-8"
            >
              <div 
                ref={containerRef}
                className="flex justify-center [&_svg]:min-w-[650px] sm:[&_svg]:min-w-[850px] [&_svg]:h-auto text-center"
                dangerouslySetInnerHTML={{ __html: svgContent }}
              />
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
