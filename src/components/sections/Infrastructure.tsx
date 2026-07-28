
import { HomelabVisual } from "./HomelabVisual";

export function Infrastructure({ dict }: { dict: any }) {
  return (
    <section className="py-16 border-t border-border">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{dict.title}</h2>
      <HomelabVisual dict={dict} />
    </section>
  );
}
