import { Star, GitFork } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import Link from "next/link";

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

async function getRepos(): Promise<Repo[]> {
  try {
    const res = await fetch("https://api.github.com/users/bencegyurus/repos?sort=updated&per_page=6", {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      return [];
    }
    
    const repos: Repo[] = await res.json();
    return repos;
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return [];
  }
}

export async function OpenSource({ dict }: { dict: any }) {
  const repos = await getRepos();

  return (
    <section className="py-16 border-t border-border">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-bold tracking-tight">{dict.title}</h2>
        <GithubIcon className="w-6 h-6 ml-2" />
      </div>
      
      {repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <Link 
              key={repo.name} 
              href={repo.html_url} 
              target="_blank"
              className="group flex flex-col justify-between h-full p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-border hover:border-blue-500/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all"
            >
              <div>
                <div className="flex items-center gap-2 mb-3 text-foreground">
                  <svg className="w-4 h-4 text-muted-foreground group-hover:text-blue-500 transition-colors" viewBox="0 0 16 16" fill="currentColor">
                    <path fillRule="evenodd" d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"></path>
                  </svg>
                  <h3 className="font-semibold font-mono truncate">{repo.name}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 overflow-hidden">
                  {repo.description || "No description provided."}
                </p>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-auto">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    {repo.language}
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stargazers_count}
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  {repo.forks_count}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-muted-foreground font-mono bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed border-border">
          {dict.noRepos}
        </div>
      )}
    </section>
  );
}
