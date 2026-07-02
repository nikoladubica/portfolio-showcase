import { projects } from "../data/projects"

const TAG_TONES = {
    'React': 'oxblood',
    'Next.js': 'ink',
    'Framer Motion': 'gilt',
    'Redux': 'patina',
    'TypeScript': 'oxblood',
    'Tailwind': 'patina',
    'Swiper': 'gilt'
}

const Works = () => {
    return (
        <section className="section wrap" id="works">
            <div className="sec-head center">
                <span className="eyebrow">§ I · Selected Works</span>
                <h2>Projects &amp; Commissions</h2>
                <p>A register of recent front-end engagements — each shipped to production.</p>
                <div className="ornament">❧</div>
            </div>

            <div className="wgrid">
                {projects.map(project => (
                    <article className="wcard-v4" key={project.name}>
                        <div className="wcard-v4-frame">
                            <span className="pin tl"></span>
                            <span className="pin tr"></span>
                            <span className="pin bl"></span>
                            <span className="pin br"></span>
                            <img src={project.image} alt={project.name} />
                            <div className="wcard-v4-plate">{project.name}</div>
                        </div>
                        <div className="wcard-v4-body">
                            <div className="work-no">{project.no}</div>
                            <p>{project.description}</p>
                            <div className="tags">
                                {project.tags.map(tag => (
                                    <span className={`tag tag--${TAG_TONES[tag] || 'ink'}`} key={tag}>{tag}</span>
                                ))}
                            </div>
                            <a
                                className="btn btn--solid btn--sm"
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Visit Live ↗
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default Works
