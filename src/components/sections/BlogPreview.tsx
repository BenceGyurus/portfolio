export function BlogPreview({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-border border-dashed">
        <p className="text-muted-foreground font-mono">{dict.comingSoon}</p>
        <div className="mt-6 opacity-50 space-y-3 pointer-events-none">
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span>Building my HomeLab</span>
            <span className="font-mono text-xs">TBA</span>
          </div>
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span>Running Immich</span>
            <span className="font-mono text-xs">TBA</span>
          </div>
          <div className="flex justify-between items-center border-b border-border/50 pb-2">
            <span>NixOS Server</span>
            <span className="font-mono text-xs">TBA</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Traefik Setup</span>
            <span className="font-mono text-xs">TBA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
