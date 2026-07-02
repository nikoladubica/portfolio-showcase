import { useState } from "react"

const Contact = () => {
    const [sent, setSent] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        setSent(true)
    }

    return (
        <section className="pt-8 pb-8 border-t border-[rgba(226,205,148,0.18)] wrap" id="contact">
            <div className="text-center mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-brass-400 block my-2">§ V · Correspondence</span>
                <h2 className="font-blackletter text-3xl max-[560px]:text-2xl font-bold text-text-heading my-2 tracking-[0.01em] [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">Send Word</h2>
                <p className="font-serif italic text-md text-paper-300 max-w-[60ch] mx-auto">For commissions, collaborations, or a considered conversation.</p>
                <div className="ornament">❧</div>
            </div>
            <p className="manicule italic text-paper-300 text-center mb-6">
                Replies are dispatched within a day or two.
            </p>

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
