import { SiCloudflare, SiTraefikproxy, SiDocker, SiKubernetes, SiHomeassistant, SiTailscale, SiAdguard } from "react-icons/si";

export function HomelabVisual({ dict }: { dict: any }) {
  if (!dict.homelabNodes) return null;
  const n = dict.homelabNodes.nodes;

  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 md:p-10 rounded-lg border border-border w-full overflow-x-auto">
      <div className="min-w-[600px] flex flex-col items-center select-none">
        
        {/* Internet */}
        <div className="flex flex-col items-center relative">
          <div className="bg-white dark:bg-zinc-950 border-2 border-border rounded-full px-6 py-2 shadow-sm font-semibold z-10">
            Internet
          </div>
          <div className="h-8 w-0.5 bg-muted-foreground/50 relative">
             {/* Branch to the left for VPN */}
             <div className="absolute top-1/2 right-0 w-[180px] h-0.5 bg-muted-foreground/50"></div>
             <div className="absolute top-1/2 right-[180px] w-0.5 h-8 bg-muted-foreground/50"></div>
          </div>
        </div>

        {/* Nodes Layer */}
        <div className="flex justify-center w-full relative mb-4">
           {/* VPN Node */}
           <div className="absolute top-0 left-1/2 -translate-x-[180px]">
               <div className="relative -translate-x-1/2 flex flex-col items-center">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap bg-zinc-50 dark:bg-zinc-900/50 px-2 mb-1">VLAN 99</span>
                 <div className="flex flex-col gap-3">
                   <div className="bg-white dark:bg-zinc-950 border-2 border-blue-400 rounded-xl p-3 shadow-sm w-44 flex items-center gap-3">
                     <SiTailscale className="text-blue-400 w-6 h-6 shrink-0" />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold leading-none">{n.vpn.name}</span>
                     </div>
                   </div>

                   <div className="bg-white dark:bg-zinc-950 border-2 border-[#68BC71] rounded-xl p-3 shadow-sm w-44 flex items-center gap-3">
                     <SiAdguard className="text-[#68BC71] w-6 h-6 shrink-0" />
                     <div className="flex flex-col">
                       <span className="text-sm font-bold leading-none">{n.adguard.name}</span>
                     </div>
                   </div>
                 </div>
               </div>
           </div>

           {/* Cloudflare Node */}
           <div className="flex flex-col items-center relative z-10">
             <div className="bg-white dark:bg-zinc-950 border-2 border-[#F38020] rounded-xl p-3 shadow-sm w-48 flex items-center gap-3">
               <SiCloudflare className="text-[#F38020] w-6 h-6 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-bold leading-none">{n.cloudflare.name}</span>
               </div>
             </div>
             
             <div className="h-8 w-0.5 bg-muted-foreground/50"></div>

             {/* Traefik Loadbalancer */}
             <div className="bg-white dark:bg-zinc-950 border-2 border-[#24A1C1] rounded-xl p-3 shadow-sm w-48 flex items-center gap-3">
               <SiTraefikproxy className="text-[#24A1C1] w-6 h-6 shrink-0" />
               <div className="flex flex-col">
                 <span className="text-sm font-bold leading-none">{n.loadbalancer.name}</span>
               </div>
             </div>
           </div>
        </div>

        {/* Splitter Line */}
        <div className="w-[480px] h-0.5 bg-muted-foreground/50 relative mt-6">
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 bg-zinc-50 dark:bg-zinc-900/50 px-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">VLAN 100</span>
          </div>
          <div className="absolute left-0 top-0 h-4 w-0.5 bg-muted-foreground/50"></div>
          <div className="absolute left-1/2 top-0 h-4 w-0.5 bg-muted-foreground/50"></div>
          <div className="absolute right-0 top-0 h-4 w-0.5 bg-muted-foreground/50"></div>
        </div>
        <div className="h-4"></div>

        {/* Environments Grid */}
        <div className="flex justify-between w-[520px]">
          
          {/* Docker Environment */}
          <div className="flex flex-col items-center gap-3 bg-blue-50/50 dark:bg-blue-900/10 border-2 border-blue-500/30 border-dashed rounded-xl p-4 w-40">
            <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Docker</div>
            
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-lg p-2.5 shadow-sm w-full flex items-center justify-center gap-2">
              <SiDocker className="text-[#2496ED] w-5 h-5 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold leading-none truncate">Engine</span>
              </div>
            </div>
            
            <div className="flex flex-col w-full gap-1.5 mt-1">
              <div className="bg-white dark:bg-zinc-950 border border-border rounded text-[10px] font-semibold px-2 py-1 text-center truncate">Immich</div>
              <div className="bg-white dark:bg-zinc-950 border border-border rounded text-[10px] font-semibold px-2 py-1 text-center truncate">Seafile</div>
              <div className="bg-white/50 dark:bg-zinc-950/50 border border-border border-dashed rounded text-[10px] font-semibold px-2 py-1 text-center text-muted-foreground">{dict.andMore}</div>
            </div>
          </div>

          {/* K8s VMs */}
          <div className="flex flex-col items-center gap-4 bg-indigo-50/50 dark:bg-indigo-900/10 border-2 border-indigo-500/30 border-dashed rounded-xl p-4 w-40">
            <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1">Talos K8s</div>
            
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-lg p-2.5 shadow-sm w-full flex items-center gap-2">
              <SiKubernetes className="text-[#326CE5] w-5 h-5 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold leading-none truncate">{n.k8sCp.name}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-950 border border-border rounded-lg p-2.5 shadow-sm w-full flex items-center gap-2">
              <SiKubernetes className="text-[#326CE5] w-5 h-5 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold leading-none truncate">{n.k8sWorker.name}</span>
              </div>
            </div>
          </div>

          {/* Other VMs */}
          <div className="flex flex-col items-center gap-4 bg-emerald-50/50 dark:bg-emerald-900/10 border-2 border-emerald-500/30 border-dashed rounded-xl p-4 w-40">
            <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">Services</div>
            
            <div className="bg-white dark:bg-zinc-950 border border-border rounded-lg p-2.5 shadow-sm w-full flex items-center gap-2">
              <SiHomeassistant className="text-[#41BDF5] w-5 h-5 shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold leading-none truncate">{n.hass.name}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
