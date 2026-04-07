import { useRef, useEffect, useState } from 'react'

function CVPreview({ jobTitle = "Alternant Data/IA", skills = [] }) {

    const outerRef = useRef(null)
    const [containerW, setContainerW] = useState(300)

    const DESIGN_W = 300
    const DESIGN_H = 560

    useEffect(() => {
        const obs = new ResizeObserver(entries => {
            for (const entry of entries) {
                setContainerW(entry.contentRect.width)
            }
        })
        if (outerRef.current) obs.observe(outerRef.current)
        return () => obs.disconnect()
    }, [])

    const scale = containerW / DESIGN_W

    function SectionTitle({ label }) {
        return (
            <div className="mb-1.5">
                <p style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#000', margin: 0 }}>{label}</p>
                <div style={{ height: '0.5px', backgroundColor: '#000', marginTop: '1px', marginBottom: '4px' }} />
            </div>
        )
    }

    const defaultSkills = [
        { category: "Data & IA",         content: "Python, Pandas, Machine Learning, LLM, algorithmes" },
        { category: "Developpement",      content: "JavaScript, React, Node.js, SQL, HTML, CSS" },
        { category: "DevOps & Outils",    content: "Git, Docker, Linux, CI/CD" },
        { category: "Autres",             content: "Infographie 3D, Anglais B2, UI/UX" },
        { category: "En apprentissage",   content: "Power BI, RAG, FastAPI, Azure" },
    ]

    const displaySkills = skills.length > 0 ? skills : defaultSkills

    return (
        <div className="bg-white rounded-2xl shadow-xl p-4">
            <h2 className="text-gray-800 mb-4 text-xl font-bold">Apercu CV</h2>

            <div ref={outerRef} style={{
                width: '100%',
                maxWidth: '520px',
                margin: '0 auto',
                height: DESIGN_H * scale + 'px',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div style={{
                    width: DESIGN_W + 'px',
                    height: DESIGN_H + 'px',
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px 8px 14px', borderBottom: '0.5px solid #ccc', gap: '10px' }}>
                        <div style={{ width: '30px', height: '36px', backgroundColor: '#d1d5db', borderRadius: '2px', flexShrink: 0 }} />
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#000', letterSpacing: '0.04em' }}>TIMOTHEE ITHIER</div>
                            <div style={{ fontSize: '8px', color: '#555', marginTop: '1px' }}>{jobTitle}</div>
                            <div style={{ fontSize: '8px', fontWeight: 'bold', color: '#0050b3', marginTop: '1px' }}>{'{EPITECH}'}</div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

                        <div style={{ flex: 1, padding: '8px 10px', borderRight: '0.5px solid #bbb' }}>

                            <SectionTitle label="Profil" />
                            <p style={{ fontSize: '6.5px', color: '#444', lineHeight: '1.4', marginBottom: '7px' }}>
                                Etudiant a Epitech, je recherche une alternance (2 semaines a Epitech, 4 semaines en entreprise) disponible des maintenant sur Lyon et son agglomeration. Creatif et rigoureux, je fais preuve d'un solide sens de l'organisation et de competences averees en informatique.
                            </p>

                            <SectionTitle label="Experiences" />

                            <div style={{ marginBottom: '5px' }}>
                                <span style={{ fontSize: '7px', fontWeight: 'bold', color: '#000' }}>Real Time Chat WebSite, Epitech </span>
                                <span style={{ fontSize: '6.5px', fontStyle: 'italic', color: '#888' }}>(Projet d'etude)</span>
                                <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#aaa', marginTop: '1px', marginBottom: '2px' }}>01/2026 a 02/2026</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Developpement front-end avec HTML, React, Tailwind CSS et bibliotheque ShadCN.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Conception de l'interface et integration responsive.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Developpement back-end avec Rust, Axum, WebSocket avec SocketIO.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Gestion et requetes de base de donnees Postgres.</div>
                            </div>

                            <div style={{ marginBottom: '5px' }}>
                                <span style={{ fontSize: '7px', fontWeight: 'bold', color: '#000' }}>Silk and Steel, Studio Mercier </span>
                                <span style={{ fontSize: '6.5px', fontStyle: 'italic', color: '#888' }}>(Projet d'etude)</span>
                                <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#aaa', marginTop: '1px', marginBottom: '2px' }}>09/2023 a 08/2024</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Supervision de l'equipe de creation.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Modelisation, Rigging complet et animation.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Programmation avec C++ des mecaniques UI/UX.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Developpement des IA (behavior Trees, C++)</div>
                            </div>

                            <div style={{ marginBottom: '7px' }}>
                                <span style={{ fontSize: '7px', fontWeight: 'bold', color: '#000' }}>Developpeur Infographiste, Yakprod</span>
                                <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#aaa', marginTop: '1px', marginBottom: '2px' }}>05/2024 a 08/2024</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Developpement d'une IA complexe.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Scripting en Blueprint C++.</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>- Integration de fonctions C++ personnalisees pour un controle avance.</div>
                            </div>

                            <SectionTitle label="Education" />

                            <div style={{ marginBottom: '4px' }}>
                                <div style={{ fontSize: '7px', fontWeight: 'bold', color: '#000' }}>Epitech Lyon, Master of Science</div>
                                <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#aaa', marginTop: '1px' }}>09/2025 a 07/2028</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>Specialisation IA et Data Science</div>
                            </div>

                            <div>
                                <div style={{ fontSize: '7px', fontWeight: 'bold', color: '#000' }}>Studio Mercier Paris, Bachelor</div>
                                <div style={{ fontSize: '6px', fontStyle: 'italic', color: '#aaa', marginTop: '1px' }}>09/2021 a 07/2024</div>
                                <div style={{ fontSize: '6.5px', color: '#444' }}>Infographie 3D Generaliste</div>
                            </div>
                        </div>

                        <div style={{ width: '34%', padding: '8px 10px', flexShrink: 0 }}>

                            <SectionTitle label="Contact" />
                            <div style={{ fontSize: '6.5px', color: '#444', lineHeight: '1.7', marginBottom: '7px' }}>
                                <div>07 89 42 79 78</div>
                                <div>timotheeithier@gmail.com</div>
                                <div>linkedin.com/in/timothee-ithier</div>
                                <div>RQTH</div>
                                <div>16 rue Lamothe Lyon 07</div>
                            </div>

                            <SectionTitle label="Skills" />
                            <div style={{ fontSize: '6.5px', color: '#444', marginBottom: '7px' }}>
                                {displaySkills.map((s, i) => (
                                    <div key={i} style={{ marginBottom: '3px' }}>
                                        <span style={{ fontWeight: 'bold', color: '#000' }}>{s.category} : </span>
                                        <span>{s.content}</span>
                                    </div>
                                ))}
                            </div>

                            <SectionTitle label="Soft Skills" />
                            <div style={{ fontSize: '6.5px', color: '#444', lineHeight: '1.7', marginBottom: '7px' }}>
                                {["Gestion d'equipe", "Rigueur", "Responsabilite", "Organisation", "Presentation", "Ponctuel", "Autonomie"].map(s => (
                                    <div key={s}>• {s}</div>
                                ))}
                            </div>

                            <SectionTitle label="Hobbies" />
                            <div style={{ fontSize: '6.5px', color: '#444', lineHeight: '1.7' }}>
                                {["Piano", "Scoutisme", "Theatre", "Natation", "Jeux video"].map(h => (
                                    <div key={h}>• {h}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CVPreview
