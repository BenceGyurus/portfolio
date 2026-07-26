export function CurrentFocus({ dict }: { dict: any }) {
  const focuses = dict.items;

  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {focuses.map((focus: any) => (
          <div key={focus.title} className="space-y-1">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-blue-500">•</span>
              {focus.title}
            </h3>
            <p className="text-muted-foreground">{focus.desc}</p>
            <p className="text-sm font-mono text-muted-foreground">{focus.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
