import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Link from "next/link";

export function Contact({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      
      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="mailto:contact@example.com" className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors w-fit">
          <Mail className="w-5 h-5" />
          Email
        </Link>
        <Link href="https://github.com/bencegyurus" className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors w-fit">
          <GithubIcon className="w-5 h-5" />
          GitHub
        </Link>
        <Link href="https://linkedin.com/in/bencegyurus" className="flex items-center gap-2 text-lg hover:text-blue-500 transition-colors w-fit">
          <LinkedinIcon className="w-5 h-5" />
          LinkedIn
        </Link>
      </div>
    </section>
  );
}
