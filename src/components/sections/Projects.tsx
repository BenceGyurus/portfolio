import { ExternalLink, Camera } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";

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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {dict.active}
            </div>
            
            <div className="text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project1.desc}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.role}</div>
            <div className="md:col-span-3">{dict.project1.role}</div>

            <div className="text-sm font-mono text-muted-foreground">{dict.responsibilities}</div>
            <div className="md:col-span-3 space-y-1">
              {dict.project1.resps.map((resp: string) => (
                <p key={resp}>• {resp}</p>
              ))}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex gap-4">
              <Link
                href="https://irodalomerettsegi.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> {dict.website}
              </Link>
            </div>
          </div>

          {/* Screenshot */}
          <div className="rounded-lg border border-border overflow-hidden shadow-sm">
            <Image
              src="/images/irodalomerettsegi.png"
              alt="irodalomerettsegi.hu screenshot"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
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
              {['Proxmox', 'Kubernetes', 'FluxCD', 'Docker', 'Ansible', 'Terraform', 'Traefik', 'Grafana', 'Prometheus', 'Cloudflare', 'Tailscale'].map(tech => (
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

            <div className="md:col-span-1 text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex flex-wrap gap-4">
              <Link
                href="https://github.com/BenceGyurus/Homelab"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> {dict.project2.homelabRepo}
              </Link>
              <Link
                href="https://github.com/BenceGyurus/talos"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> {dict.project2.talosRepo}
              </Link>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">{dict.project3.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {dict.active}
            </div>
            
            <div className="text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project3.desc}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.role}</div>
            <div className="md:col-span-3">{dict.project3.role}</div>

            <div className="text-sm font-mono text-muted-foreground">{dict.responsibilities}</div>
            <div className="md:col-span-3 space-y-1">
              {dict.project3.resps?.map((resp: string) => (
                <p key={resp}>• {resp}</p>
              ))}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex gap-4">
              <Link
                href="https://matekx.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> {dict.website}
              </Link>
            </div>
          </div>

          {/* Screenshot */}
          <div className="rounded-lg border border-border overflow-hidden shadow-sm">
            <Image
              src="/images/matekx.png"
              alt="matekx.hu screenshot"
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Project 4 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">{dict.project4.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              {dict.hobby}
            </div>
            
            <div className="text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project4.desc}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.architecture}</div>
            <div className="md:col-span-3 flex flex-wrap gap-2">
              {['Docker', 'Terraform', 'OSPF', 'FRRouting', 'Wireshark'].map(tech => (
                <span key={tech} className="bg-secondary px-2 py-1 rounded-md text-sm">{tech}</span>
              ))}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.focus}</div>
            <div className="md:col-span-3 space-y-1">
              <p>• {dict.project4.focus1}</p>
              <p>• {dict.project4.focus2}</p>
              <p>• {dict.project4.focus3}</p>
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex gap-4">
              <Link
                href="https://github.com/BenceGyurus/network-sandbox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </Link>
            </div>
          </div>

          {/* Screenshot */}
          <div className="rounded-lg border border-border overflow-hidden shadow-sm bg-zinc-50 dark:bg-zinc-900/40 p-4 sm:p-6 flex justify-center items-center">
            <Image
              src="/images/network-sandbox.png"
              alt="network-sandbox OSPF topology diagram"
              width={446}
              height={574}
              className="max-h-[380px] w-auto object-contain rounded-md"
            />
          </div>
        </div>

        {/* Project 5 */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <h3 className="text-xl font-bold">{dict.project5.title}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-sm font-mono text-muted-foreground">{dict.status}</div>
            <div className="md:col-span-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-sky-500"></div>
              {dict.project5.hobbyTag}
            </div>
            
            <div className="text-sm font-mono text-muted-foreground">{dict.description}</div>
            <div className="md:col-span-3">
              {dict.project5.desc}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.architecture}</div>
            <div className="md:col-span-3 flex flex-wrap gap-2">
              {['Plane Spotting', 'Fujifilm', 'WebP', 'Cloudflare'].map(tech => (
                <span key={tech} className="bg-secondary px-2 py-1 rounded-md text-sm">{tech}</span>
              ))}
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.focus}</div>
            <div className="md:col-span-3 space-y-1">
              <p>• {dict.project5.focus1}</p>
              <p>• {dict.project5.focus2}</p>
              <p>• {dict.project5.focus3}</p>
            </div>

            <div className="text-sm font-mono text-muted-foreground">{dict.links}</div>
            <div className="md:col-span-3 flex gap-4">
              <Link
                href="https://repsit.gyurus.hu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <Camera className="w-4 h-4" /> {dict.project5.galleryLink}
              </Link>
            </div>
          </div>

          {/* Photo Preview Grid */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { src: "/images/repsit/plane-1.webp", alt: "easyJet Airbus A320 landing", label: "Airbus A320" },
                { src: "/images/repsit/plane-2.webp", alt: "Helvetic Airways Embraer takeoff", label: "Embraer E-Jet" },
                { src: "/images/repsit/plane-3.webp", alt: "Air Central Boeing 747-400F climb", label: "Boeing 747-400F" },
                { src: "/images/repsit/plane-4.webp", alt: "SF Airlines Boeing 767 at Budapest tower", label: "B767 & LHBP Tower" },
              ].map((photo, i) => (
                <Link
                  key={i}
                  href="https://repsit.gyurus.hu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative aspect-[16/9] rounded-lg border border-border overflow-hidden shadow-sm bg-zinc-950 block"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[11px] font-mono text-white/90 truncate">{photo.label}</span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs font-mono text-muted-foreground text-right">
              {dict.project5.previewNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
