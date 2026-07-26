import { buttonVariants } from "@/components/ui/button";
import { Mail, FileText } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Link from "next/link";

export function Hero({ dict }: { dict: any }) {
  return (
    <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 py-20">
      <div className="flex-1 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{dict.title}</h1>
          <p className="text-xl text-muted-foreground font-mono">
            {dict.subtitle1}
          </p>
        </div>
        
        <p className="text-lg max-w-md text-foreground">
          {dict.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link href="https://github.com/bencegyurus" target="_blank" className={buttonVariants({ variant: "default" })}>
            <GithubIcon className="mr-2 h-4 w-4" />
            GitHub
          </Link>
          <Link href="/resume.pdf" target="_blank" className={buttonVariants({ variant: "outline" })}>
            <FileText className="mr-2 h-4 w-4" />
            Resume
          </Link>
          <Link href="mailto:contact@example.com" className={buttonVariants({ variant: "outline" })}>
            <Mail className="mr-2 h-4 w-4" />
            Email
          </Link>
        </div>
      </div>

      <div className="w-full md:w-96 bg-zinc-950 dark:bg-zinc-900 rounded-lg p-6 font-mono text-sm text-zinc-300 shadow-xl border border-zinc-800">
        <div className="flex gap-2 mb-4">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
        <div className="space-y-4">
          <div>
            <span className="text-blue-400">$</span> whoami<br />
            {dict.title}
          </div>
          <div>
            <span className="text-blue-400">{dict.locationLabel}</span><br />
            {dict.location}
          </div>
          <div>
            <span className="text-blue-400">{dict.educationLabel}</span><br />
            {dict.education}
          </div>
          <div>
            <span className="text-blue-400">{dict.focusLabel}</span><br />
            {dict.focuses[0]}<br />
            {dict.focuses[1]}<br />
            {dict.focuses[2]}
          </div>
        </div>
      </div>
    </section>
  );
}
