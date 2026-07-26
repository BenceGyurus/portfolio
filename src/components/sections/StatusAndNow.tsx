export function StatusAndNow({ dict }: { dict: any }) {
  return (
    <section className="py-12 flex flex-col md:flex-row justify-between items-stretch gap-12">
      {/* Status */}
      <div className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-border">
        <h3 className="font-mono text-sm text-muted-foreground mb-4">{dict.statusLabel}</h3>
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </div>
          <span className="font-semibold">{dict.statusAvailable}</span>
        </div>
      </div>

      {/* Now */}
      <div className="flex-1 w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-border">
        <h3 className="font-mono text-sm text-muted-foreground mb-4">{dict.nowLabel}</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-semibold mb-1">{dict.nowReading}</div>
            <div className="text-sm text-muted-foreground">{dict.readingTitle}</div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">{dict.nowLearning}</div>
            <div className="text-sm text-muted-foreground">{dict.learningTitle}</div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">{dict.nowBuilding}</div>
            <div className="text-sm text-muted-foreground">{dict.buildingTitle}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
