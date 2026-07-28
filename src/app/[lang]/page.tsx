import { Hero } from "@/components/sections/Hero";
import { StatusAndNow } from "@/components/sections/StatusAndNow";
import { Projects } from "@/components/sections/Projects";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { OpenSource } from "@/components/sections/OpenSource";
import { TechStack } from "@/components/sections/TechStack";
import { Experience } from "@/components/sections/Experience";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getDictionary } from "@/dictionaries";

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12 min-h-screen relative overflow-hidden selection:bg-blue-500/30">
      <div className="relative z-0">
        <LanguageSwitcher />
        <Hero dict={dict.hero} />
        <StatusAndNow dict={dict.statusAndNow} />
        <Projects dict={dict.projects} />
        <Infrastructure dict={{ ...dict.infrastructure, homelabNodes: dict.projects.homelabNodes }} />
        <Experience dict={dict.experience} />
        <TechStack dict={dict.techStack} />
        <OpenSource dict={dict.openSource} />
        <BlogPreview dict={dict.blog} />
        <Contact dict={dict.contact} />
        <Footer dict={dict.footer} />
      </div>
    </main>
  );
}
