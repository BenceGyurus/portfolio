import { HomelabTelemetry } from "./HomelabTelemetry";
import { HomelabVisual } from "./HomelabVisual";

export function Infrastructure({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border space-y-12">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      {/* Live Status & Telemetry Component */}
      <HomelabTelemetry dict={dict} />

      {/* Network Topology Visual Diagram */}
      <div className="pt-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4 font-mono">Infrastructure Topology</h3>
        <HomelabVisual dict={dict} />
      </div>
    </section>
  );
}
