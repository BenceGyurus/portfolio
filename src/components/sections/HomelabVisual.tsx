import { SiCloudflare, SiTraefikproxy, SiDocker, SiKubernetes, SiHomeassistant, SiTailscale, SiAdguard } from "react-icons/si";
import { Server, Gamepad2, Mail } from "lucide-react";

function NodeCard({ icon, name, desc, color }: { icon: React.ReactNode; name: string; desc: string; color: string }) {
  return (
    <div className={`bg-white dark:bg-zinc-950 border-2 rounded-xl p-3 shadow-sm flex items-center gap-3 ${color}`}>
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col min-w-0">
        <span className="text-sm font-bold leading-tight truncate">{name}</span>
        <span className="text-[10px] text-muted-foreground leading-tight truncate">{desc}</span>
      </div>
    </div>
  );
}

function GroupBox({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-3 border-2 border-dashed rounded-xl p-4 ${color}`}>
      <div className="text-xs font-bold uppercase tracking-wider text-center">{title}</div>
      {children}
    </div>
  );
}

export function HomelabVisual({ dict }: { dict: any }) {
  if (!dict.homelabNodes) return null;
  const n = dict.homelabNodes.nodes;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 sm:p-6 md:p-10 rounded-lg border border-border w-full">
      {/* Stats bar */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-8 text-sm font-mono text-muted-foreground">
        <span>~12 VM/LXC</span>
        <span>•</span>
        <span>15+ services</span>
        <span>•</span>
        <span>4TB storage</span>
      </div>

      <div className="flex flex-col items-center gap-4">
        {/* Internet */}
        <div className="bg-white dark:bg-zinc-950 border-2 border-border rounded-full px-6 py-2 shadow-sm font-semibold">
          Internet
        </div>
        <div className="w-0.5 h-6 bg-muted-foreground/40"></div>

        {/* Cloudflare + Traefik (vertical flow) */}
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <NodeCard
            icon={<SiCloudflare className="text-[#F38020] w-5 h-5" />}
            name={n.cloudflare.name}
            desc={n.cloudflare.desc}
            color="border-[#F38020]/40"
          />
          <div className="w-0.5 h-4 bg-muted-foreground/40"></div>
          <NodeCard
            icon={<SiTraefikproxy className="text-[#24A1C1] w-5 h-5" />}
            name={n.loadbalancer.name}
            desc={n.loadbalancer.desc}
            color="border-[#24A1C1]/40"
          />
        </div>

        <div className="w-0.5 h-4 bg-muted-foreground/40"></div>

        {/* Proxmox wrapper */}
        <div className="w-full border-2 border-orange-500/30 border-dashed rounded-xl p-4 sm:p-6">
          <div className="text-xs font-bold text-orange-500 uppercase tracking-wider text-center mb-4">Proxmox VE</div>
          
          {/* Grid of groups - responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Docker VMs */}
            <GroupBox title="Docker" color="bg-blue-50/50 dark:bg-blue-900/10 border-blue-500/30 text-blue-500">
              <NodeCard
                icon={<SiDocker className="text-[#2496ED] w-5 h-5" />}
                name={n.dockerMain.name}
                desc="4TB — Stateful apps"
                color="border-blue-400/40"
              />
              <div className="flex flex-wrap gap-1.5">
                {["Immich", "Seafile", "Paperless", "Authentik", "Forgejo", "OpenWebUI"].map(s => (
                  <span key={s} className="bg-white dark:bg-zinc-950 border border-border rounded text-[10px] font-semibold px-2 py-0.5">{s}</span>
                ))}
              </div>
              <NodeCard
                icon={<SiDocker className="text-[#2496ED] w-5 h-5" />}
                name={n.docker2.name}
                desc="Stateless — Monitoring"
                color="border-blue-400/40"
              />
              <div className="flex flex-wrap gap-1.5">
                {["Grafana", "Prometheus"].map(s => (
                  <span key={s} className="bg-white dark:bg-zinc-950 border border-border rounded text-[10px] font-semibold px-2 py-0.5">{s}</span>
                ))}
              </div>
            </GroupBox>

            {/* K8s */}
            <GroupBox title="Talos K8s" color="bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-500/30 text-indigo-500">
              <NodeCard
                icon={<SiKubernetes className="text-[#326CE5] w-5 h-5" />}
                name={n.k8sCp.name}
                desc={n.k8sCp.desc}
                color="border-indigo-400/40"
              />
              <NodeCard
                icon={<SiKubernetes className="text-[#326CE5] w-5 h-5" />}
                name={n.k8sWorker.name}
                desc={n.k8sWorker.desc}
                color="border-indigo-400/40"
              />
            </GroupBox>

            {/* Network + Services */}
            <GroupBox title="Network & Services" color="bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-500/30 text-emerald-500">
              <NodeCard
                icon={<SiTailscale className="text-blue-400 w-5 h-5" />}
                name={n.vpn.name}
                desc={n.vpn.desc}
                color="border-blue-400/40"
              />
              <NodeCard
                icon={<SiAdguard className="text-[#68BC71] w-5 h-5" />}
                name={n.adguard.name}
                desc={n.adguard.desc}
                color="border-[#68BC71]/40"
              />
              <NodeCard
                icon={<SiHomeassistant className="text-[#41BDF5] w-5 h-5" />}
                name={n.hass.name}
                desc={n.hass.desc}
                color="border-[#41BDF5]/40"
              />
              <NodeCard
                icon={<Gamepad2 className="text-green-500 w-5 h-5" />}
                name={n.minecraft.name}
                desc={n.minecraft.desc}
                color="border-green-400/40"
              />
            </GroupBox>

          </div>
        </div>
      </div>
    </div>
  );
}
