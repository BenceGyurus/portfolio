export function Experience({ dict }: { dict: any }) {
  const experiences = [
    {
      year: dict.exp1.year,
      title: dict.exp1.title,
      desc: dict.exp1.desc
    },
    {
      year: dict.exp2.year,
      title: dict.exp2.title,
      desc: dict.exp2.desc
    },
    {
      year: dict.exp3.year,
      title: dict.exp3.title,
      desc: dict.exp3.desc
    }
  ];

  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="space-y-8">
        {experiences.map((item, index) => (
          <div key={`${item.year}-${index}`} className="relative pl-8 md:pl-0">
            {/* Desktop layout: Year on left, content on right */}
            <div className="hidden md:grid grid-cols-5 gap-4">
              <div className="col-span-1 text-right text-muted-foreground font-mono mt-1">
                {item.year}
              </div>
              <div className="col-span-4 relative pl-8 border-l border-border">
                {/* Timeline dot */}
                <div className="absolute left-[-5px] top-[10px] w-2 h-2 rounded-full bg-foreground"></div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-1">{item.desc}</p>
              </div>
            </div>

            {/* Mobile layout: Vertical timeline */}
            <div className="md:hidden relative border-l border-border pl-6 pb-6">
              <div className="absolute left-[-5px] top-[10px] w-2 h-2 rounded-full bg-foreground"></div>
              <div className="text-sm text-muted-foreground font-mono mb-2">{item.year}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-muted-foreground mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
