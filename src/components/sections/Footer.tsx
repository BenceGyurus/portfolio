import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import Link from "next/link";

export function Footer({ dict }: { dict: any }) {
  return (
    <footer className="border-t border-border py-8 mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Bence Gyürüs</p>
        <div className="flex items-center gap-4">
          <Link href="https://github.com/bencegyurus" target="_blank" className="hover:text-foreground transition-colors">
            <GithubIcon className="w-4 h-4" />
          </Link>
          <Link href="https://www.linkedin.com/in/bence-gy%C3%BCr%C3%BCs-42ab05422" target="_blank" className="hover:text-foreground transition-colors">
            <LinkedinIcon className="w-4 h-4" />
          </Link>
          <span className="text-xs">{dict.builtWith}</span>
        </div>
      </div>
    </footer>
  );
}
