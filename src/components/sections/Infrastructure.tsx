
import { HomelabVisual } from "./HomelabVisual";

export function Infrastructure({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="space-y-12">
        <div>
          <h3 className="text-xl font-bold mb-6">{dict.currentStack}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Linux', desc: dict.linuxDesc },
              { name: 'Docker', desc: dict.dockerDesc },
              { name: 'Traefik', desc: dict.traefikDesc },
              { name: 'Proxmox', desc: dict.proxmoxDesc },
              { name: 'Prometheus', desc: dict.prometheusDesc },
              { name: 'Tailscale', desc: dict.tailscaleDesc },
            ].map(item => (
              <div key={item.name} className="bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-lg border border-border">
                <div className="font-semibold text-foreground mb-1">{item.name}</div>
                <div className="text-muted-foreground text-xs leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <HomelabVisual dict={dict} />
        </div>

      </div>
    </section>
  );
}
