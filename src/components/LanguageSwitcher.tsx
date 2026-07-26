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
    <div className="absolute top-6 right-6 flex items-center gap-2 text-sm font-mono z-50">
      <Link 
        href={switchLocale("en")} 
        className={`px-2 py-1 rounded transition-colors ${currentLocale === "en" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
      >
        EN
      </Link>
      <Link 
        href={switchLocale("hu")} 
        className={`px-2 py-1 rounded transition-colors ${currentLocale === "hu" ? "bg-primary text-primary-foreground" : "hover:bg-muted text-muted-foreground"}`}
      >
        HU
      </Link>
    </div>
  );
}
