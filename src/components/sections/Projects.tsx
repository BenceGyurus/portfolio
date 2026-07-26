import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Link from "next/link";

export function Projects({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-12">{dict.title}</h2>
      
      <div className="space-y-16">
        {/* Project 1 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">irodalomerettsegi.hu</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {dict.active}
            </div>
            
            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project1.desc}
            </div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.role}</div>
            <div className="md:col-span-3">{dict.project1.role}</div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.responsibilities}</div>
            <div className="md:col-span-3 space-y-1">
              {dict.project1.resps.map((resp: string) => (
                <p key={resp}>• {resp}</p>
              ))}
            </div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex gap-4">
              <Link href="https://github.com/bencegyurus" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <GithubIcon className="w-4 h-4" /> GitHub
              </Link>
              <Link href="https://irodalomerettsegi.hu" className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                <ExternalLink className="w-4 h-4" /> {dict.website}
              </Link>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">HomeLab</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project2.desc}
            </div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.architecture}</div>
            <div className="md:col-span-3 flex flex-wrap gap-2">
              {['Proxmox', 'Docker', 'Traefik', 'Grafana', 'Prometheus', 'Cloudflare', 'Tailscale'].map(tech => (
                <span key={tech} className="bg-secondary px-2 py-1 rounded-md text-sm">{tech}</span>
              ))}
            </div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.runningServices}</div>
            <div className="md:col-span-3 space-y-1">
              <p>• Immich</p>
              <p>• Navidrome</p>
              <p>• Paperless</p>
              <p>• AdGuard Home</p>
              <p>• Authentik</p>
              <p>• Seafile</p>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">{dict.project3.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              {dict.inDevelopment}
            </div>
            
            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project3.desc}
            </div>

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.focus}</div>
            <div className="md:col-span-3 space-y-1">
              <p>• {dict.project3.focus1}</p>
              <p>• {dict.project3.focus2}</p>
              <p>• {dict.project3.focus3}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
