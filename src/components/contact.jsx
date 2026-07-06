import { useRef, useState } from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import SectionHead from "./section-head"

const Contact = () => {
    const [sent, setSent] = useState(false)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState(null)
    const [captchaToken, setCaptchaToken] = useState(null)
    const captchaRef = useRef(null)

    const submitHandler = async (event) => {
        event.preventDefault()

        if (!captchaToken) {
            setError("Please complete the captcha before dispatching.")
            return
        }

        setSending(true)
        setError(null)

        const form = event.target
        const payload = Object.fromEntries(new FormData(form))
        payload.access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
        payload.subject = "New message from your portfolio"
        payload["h-captcha-response"] = captchaToken

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(payload),
            })
            const result = await response.json()
            if (!result.success) throw new Error(result.message || "Submission failed")

            setSent(true)
            form.reset()
        } catch {
            setError("Something went wrong. Please try again, or email me directly.")
        } finally {
            setSending(false)
            captchaRef.current?.resetCaptcha()
            setCaptchaToken(null)
        }
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
                            className="font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                            id="c-name"
                            name="name"
                            type="text"
                            placeholder="Ada Lovelace"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-[6px] flex-1">
                        <label className="font-mono text-xs uppercase tracking-caps text-paper-400" htmlFor="c-email">Electronic Mail</label>
                        <input
                            className="font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                            id="c-email"
                            name="email"
                            type="email"
                            placeholder="ada@analytical.engine"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-[6px] mb-5">
                    <label className="font-mono text-xs uppercase tracking-caps text-paper-400" htmlFor="c-msg">Message</label>
                    <textarea
                        className="font-serif text-base text-ink-900 bg-paper-50 border border-ink-300 rounded-[2px] py-[10px] px-3 focus:outline-none focus:border-oxblood-600 focus:shadow-[inset_0_0_0_1px_var(--color-oxblood-300)]"
                        id="c-msg"
                        name="message"
                        rows="4"
                        placeholder="A few lines on what you have in mind…"
                        required
                    ></textarea>
                </div>
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />
                <div className="mb-5">
                    <HCaptcha
                        ref={captchaRef}
                        sitekey="50b2fe65-b00b-4b9e-ad62-3ba471098be2"
                        reCaptchaCompat={false}
                        theme="dark"
                        onVerify={setCaptchaToken}
                        onExpire={() => setCaptchaToken(null)}
                        onError={() => setCaptchaToken(null)}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <button className="btn btn--solid" type="submit" disabled={sending}>
                        {sending ? "Dispatching…" : "Dispatch"}
                    </button>
                    {sent && (
                        <span className="italic text-status-positive">✓ Your message has been entered into the post.</span>
                    )}
                    {error && (
                        <span className="italic text-oxblood-500">{error}</span>
                    )}
                </div>
            </form>
        </section>
    )
}

export default Contact
