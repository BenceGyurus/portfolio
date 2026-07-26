export function TechStack({ dict }: { dict: any }) {
  const categories = [
    {
      title: "Languages",
      items: ["Python", "C++", "TypeScript"]
    },
    {
      title: "Infrastructure",
      items: ["Linux", "Docker", "Proxmox"]
    },
    {
      title: "Networking",
      items: ["Traefik", "Cloudflare", "Tailscale"]
    },
    {
      title: "Tools",
      items: ["Git"]
    },
    {
      title: dict.basics || "Familiar with",
      items: ["Java", "Go", "Ansible", "Terraform", "Grafana", "Prometheus", "GitOps"]
    }
  ];

  const mainCategories = categories.slice(0, 4);
  const basicsCategory = categories[4];

  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {mainCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="font-semibold text-foreground border-b border-border pb-2">{category.title}</h3>
            <ul className="space-y-2">
              {category.items.map((item) => (
                <li key={item} className="text-muted-foreground">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-border/50">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">{basicsCategory.title}</h3>
        <div className="flex flex-wrap gap-2">
          {basicsCategory.items.map(item => (
            <span key={item} className="px-3 py-1 bg-secondary/50 text-secondary-foreground text-sm rounded-md border border-border/50">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
