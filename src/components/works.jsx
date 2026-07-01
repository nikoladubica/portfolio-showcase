import { projects } from "../data/projects"

const Works = () => {
    return (
        <section className="section wrap" id="works">
            <div className="sec-head">
                <span className="num">§ I</span>
                <span className="eyebrow">Selected Works</span>
                <h2>Projects &amp; Commissions</h2>
                <p>A register of recent front-end engagements — each shipped to production.</p>
            </div>

            {projects.map(project => (
                <article className="work" key={project.name}>
                    <div className="work-plate-col">
                        <div className="work-plate">
                            <span className="badge"><span className="dot"></span>{project.status}</span>
                            <div className="frame">
                                <img src={project.image} alt={project.name} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="work-no">{project.no}</div>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div className="tags">
                            {project.tags.map(tag => (
                                <span className="tag" key={tag}>{tag}</span>
                            ))}
                        </div>
                        <a
                            className="btn btn--gilt btn--sm"
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Visit Live ↗
                        </a>
                    </div>
                </article>
            ))}
        </section>
    )
}

export default Works
