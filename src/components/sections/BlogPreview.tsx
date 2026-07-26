export function BlogPreview({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="p-8 bg-zinc-50 dark:bg-zinc-900/30 rounded-lg border border-border">
        <div className="mt-6 space-y-4 text-left">
          <a href="#" className="block group">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 pb-2 border-b border-border/50 group-hover:border-primary/50 transition-colors">
              <h3 className="text-foreground group-hover:text-primary transition-colors font-medium">Bootstrapping a Talos Kubernetes Cluster with Flux GitOps</h3>
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">2026-07-26</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2 opacity-80 line-clamp-2">
              A detailed walkthrough of how I built my bare-metal Kubernetes cluster using Talos Linux, an immutable and API-managed OS, and how I set up Flux CD for a complete GitOps workflow.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
}
