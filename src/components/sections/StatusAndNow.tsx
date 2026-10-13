export function StatusAndNow({ dict }: { dict: any }) {
  return (
    <section className="py-12">
      {/* Now */}
      <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg border border-border">
        <h3 className="font-mono text-sm text-muted-foreground mb-4">{dict.nowLabel}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
