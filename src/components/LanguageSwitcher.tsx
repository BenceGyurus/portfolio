"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const pathname = usePathname();
  
  // Replace the current locale in the pathname
  const switchLocale = (newLocale: string) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/");
  };

  const currentLocale = pathname?.split("/")[1] || "en";

  return (
    <div className="absolute top-6 right-6 flex items-center gap-1 p-1 rounded-full bg-background/50 backdrop-blur-md border border-border/50 shadow-sm text-sm font-mono z-50">
      <Link 
        href={switchLocale("en")} 
        className={`px-3 py-1.5 rounded-full transition-colors ${currentLocale === "en" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
      >
        EN
      </Link>
      <Link 
        href={switchLocale("hu")} 
        className={`px-3 py-1.5 rounded-full transition-colors ${currentLocale === "hu" ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted text-muted-foreground hover:text-foreground"}`}
      >
        HU
      </Link>
    </div>
  );
}
