"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";

interface MermaidProps {
  chart: string;
  id?: string;
}

export function MermaidDiagram({ chart, id = "homelab-topology-mermaid" }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 5.0));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.35, 0.4));
  };

  const handleReset = () => {
    setZoomLevel(1);
    setPan({ x: 0, y: 0 });
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Drag handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    setPan({
      x: e.touches[0].clientX - dragStartRef.current.x,
      y: e.touches[0].clientY - dragStartRef.current.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

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
    <div className="relative w-full rounded-xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden group select-none">
      {/* Zoom Controls Bar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-background/90 backdrop-blur-md border border-border rounded-lg p-1 shadow-md font-mono text-xs">
        <button
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom Out (-)"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="px-2 text-[11px] font-bold text-muted-foreground min-w-[50px] text-center select-none">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom In (+)"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-border mx-0.5"></div>

        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Reset Zoom & Pan"
          aria-label="Reset Zoom & Pan"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Draggable & Zoomable Viewport */}
      <div 
        className={`w-full overflow-hidden p-4 sm:p-8 min-h-[450px] flex items-center justify-center ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          ref={containerRef}
          className="transition-transform duration-100 ease-out origin-center flex justify-center [&_svg]:min-w-[650px] sm:[&_svg]:min-w-[850px] [&_svg]:h-auto text-center"
          style={{ 
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})` 
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>

      {/* Mobile & Mouse Drag Hint Overlay */}
      <div className="absolute bottom-2 left-3 z-10 flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/70 pointer-events-none">
        <Move className="w-3 h-3" />
        <span>Click & drag to pan • + / - to zoom</span>
      </div>
    </div>
  );
}
