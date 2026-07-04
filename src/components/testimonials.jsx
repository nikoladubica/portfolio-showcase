import { testimonials } from "../data/projects"
import SectionHead from "./section-head"

// ☞ Not yet mounted in App.jsx — pending real, permission-cleared quotes (see the
// `testimonials` placeholder array in src/data/projects.js). When mounting this between
// <Ledger /> and <OpenSource />, renumber the following sections to keep the § numerals
// sequential: Open Source § IV → § V (open-source.jsx) and Correspondence § V → § VI
// (contact.jsx). Also confirm the "Letters to the Editor" heading with Nikola.
const Testimonials = () => {
    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="testimonials">
            <SectionHead
                eyebrow="§ IV · Testimonials"
                heading="Letters to the Editor"
                description="A few words from those I have built alongside."
            />

            <div className="mt-6 border-t border-[rgba(226,205,148,0.18)]">
                {testimonials.map(({ quote, name, role, company }) => (
                    <figure
                        className="py-6 border-b border-[rgba(226,205,148,0.18)]"
                        key={name}
                    >
                        <blockquote className="font-serif italic text-md text-paper-200 leading-[1.6] max-w-[70ch] mx-auto text-center">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <figcaption className="font-mono text-[11px] tracking-[0.1em] uppercase text-brass-400 text-center mt-4">
                            {[name, role, company].filter(Boolean).join(' · ')}
                        </figcaption>
                    </figure>
                ))}
            </div>
        </section>
    )
}

export default Testimonials
