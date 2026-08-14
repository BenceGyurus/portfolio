"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface MermaidProps {
  chart: string;
  id?: string;
}

export function MermaidDiagram({ chart, id = "homelab-topology-mermaid" }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [svgContent, setSvgContent] = useState<string>("");
  const [mounted, setMounted] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const clampPan = useCallback((rawX: number, rawY: number, currentZoom: number) => {
    const content = containerRef.current;
    const viewport = viewportRef.current;
    if (!content || !viewport) return { x: rawX, y: rawY };

    const contentWidth = content.clientWidth * currentZoom;
    const contentHeight = content.clientHeight * currentZoom;
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;

    const maxX = Math.max(80, (contentWidth - viewportWidth) / 2 + 200);
    const maxY = Math.max(80, (contentHeight - viewportHeight) / 2 + 200);

    return {
      x: Math.min(Math.max(rawX, -maxX), maxX),
      y: Math.min(Math.max(rawY, -maxY), maxY)
    };
  }, []);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse Wheel Zoom (attached when viewport DOM element is mounted)
  useEffect(() => {
    if (!mounted || !svgContent) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY;
      const zoomFactor = delta < 0 ? 1.12 : 0.88;
      setZoomLevel((prev) => Math.min(Math.max(prev * zoomFactor, 0.4), 5.0));
    };

    viewport.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      viewport.removeEventListener("wheel", onWheel);
    };
  }, [mounted, svgContent]);

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
    const rawX = e.clientX - dragStartRef.current.x;
    const rawY = e.clientY - dragStartRef.current.y;
    setPan(clampPan(rawX, rawY, zoomLevel));
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
    const rawX = e.touches[0].clientX - dragStartRef.current.x;
    const rawY = e.touches[0].clientY - dragStartRef.current.y;
    setPan(clampPan(rawX, rawY, zoomLevel));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

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
    <div className="relative w-full rounded-xl border border-border bg-card/40 backdrop-blur-xs overflow-hidden group select-none">
      {/* Sleek Minimal Zoom Controls Bar */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1 bg-background/80 backdrop-blur-md border border-border rounded-lg p-1 shadow-xs font-mono text-xs">
        <button
          onClick={handleZoomOut}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <span className="px-1.5 text-[11px] font-medium text-muted-foreground min-w-[42px] text-center select-none">
          {Math.round(zoomLevel * 100)}%
        </span>

        <button
          onClick={handleZoomIn}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <div className="h-3 w-px bg-border mx-0.5"></div>

        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition-colors"
          title="Reset"
          aria-label="Reset"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Draggable & Wheel Zoom Viewport */}
      <div 
        ref={viewportRef}
        className={`w-full overflow-hidden p-4 sm:p-8 min-h-[420px] flex items-center justify-center ${
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
          className="flex justify-center [&_svg]:min-w-[650px] sm:[&_svg]:min-w-[850px] [&_svg]:h-auto text-center"
          style={{ 
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel})`,
            transition: isDragging ? "none" : "transform 0.15s ease-out"
          }}
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
    </div>
  );
}
