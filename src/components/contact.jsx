import { useState } from "react"

const Contact = () => {
    const [sent, setSent] = useState(false)

    const submitHandler = (event) => {
        event.preventDefault()
        setSent(true)
    }

    return (
        <section className="section wrap" id="contact">
            <div className="contact-grid">
                <div>
                    <div className="sec-head" style={{ marginBottom: "var(--space-4)" }}>
                        <span className="num">§ IV</span>
                        <span className="eyebrow">Correspondence</span>
                        <h2>Send Word</h2>
                        <p>For commissions, collaborations, or a considered conversation.</p>
                    </div>
                    <p className="manicule" style={{ fontStyle: "italic", color: "var(--paper-300)" }}>
                        Replies are dispatched within a day or two.
                    </p>
                </div>

                <form onSubmit={submitHandler}>
                    <div className="field">
                        <label htmlFor="c-name">Your Name</label>
                        <input id="c-name" type="text" placeholder="Ada Lovelace" required />
                    </div>
                    <div className="field">
                        <label htmlFor="c-email">Electronic Mail</label>
                        <input id="c-email" type="email" placeholder="ada@analytical.engine" required />
                    </div>
                    <div className="field">
                        <label htmlFor="c-msg">Message</label>
                        <textarea id="c-msg" rows="4" placeholder="A few lines on what you have in mind…"></textarea>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)" }}>
                        <button className="btn btn--solid" type="submit">Dispatch</button>
                        {sent && (
                            <span className="sent-note">✓ Your message has been entered into the post.</span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Contact
