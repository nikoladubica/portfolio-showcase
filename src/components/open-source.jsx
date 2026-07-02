import { openSourceProjects } from "../data/projects"

const OpenSource = () => {
    return (
        <section className="section wrap" id="open-source">
            <div className="sec-head center">
                <span className="eyebrow">§ IV · Open Source</span>
                <h2>Public Repositories</h2>
                <p>Smaller tools and experiments, kept in the open on GitHub.</p>
                <div className="ornament">❧</div>
            </div>

            <div className="oss-list">
                {openSourceProjects.map(project => (
                    <div className="oss-item" key={project.name}>
                        <div className="oss-main">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                        </div>
                        <div className="oss-meta">{project.tags.join(' · ')}</div>
                        <a
                            className="oss-arrow"
                            href={project.url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`View ${project.name} on GitHub`}
                        >
                            ↗
                        </a>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default OpenSource
