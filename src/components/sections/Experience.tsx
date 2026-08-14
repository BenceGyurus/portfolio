import { GraduationCap, Rocket, Server, Calendar } from "lucide-react";

export function Experience({ dict }: { dict: any }) {
  const experiences = [
    {
      year: dict.exp1.year,
      title: dict.exp1.title,
      desc: dict.exp1.desc,
      icon: Rocket,
      badge: "Active",
      isCurrent: true,
    },
    {
      year: dict.exp2.year,
      title: dict.exp2.title,
      desc: dict.exp2.desc,
      icon: Server,
      badge: "Infrastructure",
      isCurrent: true,
    },
    {
      year: dict.exp3.year,
      title: dict.exp3.title,
      desc: dict.exp3.desc,
      icon: GraduationCap,
      badge: "Education",
      isCurrent: true,
    }
  ];

  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8 text-foreground">{dict.title}</h2>

      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-border/60">
        {experiences.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={`${item.year}-${index}`} className="relative group">
              {/* Icon / Timeline Badge */}
              <div className="absolute -left-6 sm:-left-8 top-1 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-background border border-border text-foreground shadow-2xs group-hover:border-blue-500/50 group-hover:text-blue-500 transition-colors">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>

              {/* Experience Card */}
              <div className="bg-card border border-border/80 rounded-xl p-4 sm:p-5 shadow-2xs transition-all hover:border-muted-foreground/30 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md border border-border/40">
                    <Calendar className="w-3 h-3 text-muted-foreground/70" />
                    <span>{item.year}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
