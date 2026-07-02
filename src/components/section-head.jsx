const SectionHead = ({ eyebrow, heading, description, marginBottom = "mb-7" }) => {
    return (
        <div className={`${marginBottom} text-center`}>
            <span className="font-mono text-xs uppercase tracking-wider text-brass-400 block my-2">{eyebrow}</span>
            <h2 className="font-blackletter text-3xl max-[560px]:text-2xl font-bold text-text-heading my-2 tracking-[0.01em] [text-shadow:0_2px_10px_rgba(0,0,0,0.4)]">{heading}</h2>
            <p className="font-serif italic text-md text-paper-300 mx-auto text-center w-full">{description}</p>
            <div className="ornament">❧</div>
        </div>
    )
}

export default SectionHead
