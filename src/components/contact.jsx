import { useState } from "react"
import SectionHead from "./section-head"

const Contact = () => {
    const [sent, setSent] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        setSent(true)
    }

    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="contact">
            <SectionHead
                eyebrow="§ V · Correspondence"
                heading="Send Word"
                description="For commissions, collaborations, or a considered conversation."
                marginBottom="mb-4"
            />

            <form onSubmit={submitHandler}>
                <div className="flex max-[900px]:flex-col gap-5 mb-5">
                    <div className="flex flex-col gap-[6px] flex-1">
                        <label className="font-mono text-xs uppercase tracking-caps text-paper-400" htmlFor="c-name">Your Name</label>
                        <input
                            className="select-text font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                            id="c-name"
                            type="text"
                            placeholder="Ada Lovelace"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-[6px] flex-1">
                        <label className="font-mono text-xs uppercase tracking-caps text-paper-400" htmlFor="c-email">Electronic Mail</label>
                        <input
                            className="select-text font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                            id="c-email"
                            type="email"
                            placeholder="ada@analytical.engine"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[6px] mb-5">
                    <label className="font-mono text-xs uppercase tracking-caps text-paper-400" htmlFor="c-msg">Message</label>
                    <textarea
                        className="select-text font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                        id="c-msg"
                        rows="4"
                        placeholder="A few lines on what you have in mind…"
                    ></textarea>
                </div>
                <div className="flex items-center gap-4">
                    <button className="btn btn--solid" type="submit">Dispatch</button>
                    {sent && (
                        <span className="italic text-status-positive">✓ Your message has been entered into the post.</span>
                    )}
                </div>
            </form>
        </section>
    )
}

export default Contact
