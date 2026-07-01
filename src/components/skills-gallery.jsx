import { skills } from "../data/projects"

const SkillsGallery = () => {
    return (
        <section className="gallery-section" id="skills">
            <div className="wrap gallery-inner">
                <div className="eyebrow">§ II · Faculties &amp; Trades</div>
                <h2 className="mast">A Catalogue of Skills</h2>
                <p className="lead">Three disciplines, hung in careful balance.</p>
                <div className="ornament">❧</div>

                <div className="gallery">
                    {skills.map(skill => (
                        <figure className="pic" key={skill.title}>
                            <span className="cnr tl">❦</span><span className="cnr tr">❦</span>
                            <span className="cnr bl">❦</span><span className="cnr br">❦</span>
                            <div className="glyph">{skill.glyph}</div>
                            <div className="num">{skill.num}</div>
                            <h3>{skill.title}</h3>
                            <p className="clead">{skill.clead}</p>
                            <div className="hr"></div>
                            <ul>
                                {skill.items.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                            <span className="plate">{skill.plate}</span>
                        </figure>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsGallery
