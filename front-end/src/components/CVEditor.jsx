import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { analyzeResume } from '../services/ai.service'
import { getSkills } from '../services/skills.service'
import { createResume_generated } from '../services/resume_generated.service'
import { jsPDF } from 'jspdf'

function CVEditor({ onJobTitleChange, onSkillsChange, refreshKey, loadedCV }) {
    const { token } = useContext(AuthContext)
    const [jobTitle, setJobTitle] = useState("Alternant Data/IA")
    const [jobOffer, setJobOffer] = useState("")
    const [categories, setCategories] = useState([])
    const [skillsMap, setSkillsMap] = useState({})
    const [cvSkills, setCvSkills] = useState([])

    useEffect(() => {
        getSkills(token).then(data => {
            const distinct = [...new Set(data.map(s => s.category_name))]
            setCategories(distinct)
            const map = {}
            distinct.forEach(cat => {
                map[cat] = data.filter(s => s.category_name === cat).map(s => s.skill_name).join(", ")
            })
            setSkillsMap(map)
        })
    }, [refreshKey])

    useEffect(() => {
        if (!loadedCV) return
        setJobTitle(loadedCV.jobTitle)
        setCvSkills(loadedCV.skills)
    }, [loadedCV])

    function handleJobTitleChange(val) {
        setJobTitle(val)
        if (onJobTitleChange) onJobTitleChange(val)
    }

    function handleSkillsChange(newSkills) {
        setCvSkills(newSkills)
        if (onSkillsChange) onSkillsChange(newSkills)
    }

    function addSkillRow() {
        handleSkillsChange([...cvSkills, { category: categories[0] || "", content: skillsMap[categories[0]] || "" }])
    }

    function removeSkillRow(index) {
        handleSkillsChange(cvSkills.filter((_, i) => i !== index))
    }

    function updateSkillCategory(index, cat) {
        const updated = cvSkills.map((s, i) => i === index ? { category: cat, content: skillsMap[cat] || "" } : s)
        handleSkillsChange(updated)
    }

    function updateSkillContent(index, content) {
        const updated = cvSkills.map((s, i) => i === index ? { ...s, content } : s)
        handleSkillsChange(updated)
    }

    async function handleAnalyze() {
        try {
            const result = await analyzeResume(token, jobOffer, "")
            if (result.job_title) handleJobTitleChange(result.job_title)
            if (result.skills && Array.isArray(result.skills)) handleSkillsChange(result.skills)
        } catch (e) {
            console.error("Erreur analyzeResume:", e)
        }
    }

    async function generateCV() {
        const pdf = new jsPDF('p', 'mm', 'a4')

        const lx = 10,  lw = 115
        const rx = 133, rw = 67
        const divX = 129

        function section(label, x, y, w) {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(9)
            pdf.setTextColor(0, 0, 0)
            pdf.text(label, x, y)
            pdf.setDrawColor(0, 0, 0)
            pdf.setLineWidth(0.3)
            pdf.line(x, y + 1.2, x + w, y + 1.2)
            return y + 6
        }

        pdf.setFillColor(209, 213, 219)
        pdf.rect(10, 8, 15, 18, 'F')

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(20)
        pdf.setTextColor(0, 0, 0)
        pdf.text('TIMOTHEE ITHIER', 112, 15, { align: 'center' })

        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(11)
        pdf.setTextColor(60, 60, 60)
        pdf.text(jobTitle, 112, 22, { align: 'center' })

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(12)
        pdf.setTextColor(0, 80, 180)
        pdf.text('{EPITECH}', 112, 30, { align: 'center' })

        pdf.setDrawColor(180, 180, 180)
        pdf.setLineWidth(0.4)
        pdf.line(lx, 35, 200, 35)
        pdf.line(divX, 38, divX, 284)

        let ly = 42

        ly = section('PROFIL', lx, ly, lw)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(60, 60, 60)
        const profilLines = pdf.splitTextToSize(
            "Etudiant a Epitech, je recherche une alternance (2 semaines a Epitech, 4 semaines en entreprise) disponible des maintenant sur Lyon et son agglomeration. Creatif et rigoureux, je fais preuve d'un solide sens de l'organisation et de competences averees en informatique.",
            lw
        )
        pdf.text(profilLines, lx, ly)
        ly += profilLines.length * 3.5 + 6

        ly = section('EXPERIENCES', lx, ly, lw)

        const exps = [
            {
                title: "Real Time Chat WebSite, Epitech (Projet d'etude)",
                dates: "01/2026 a 02/2026",
                bullets: [
                    "Developpement front-end avec HTML, React, Javascript, Tailwind CSS et bibliotheque ShadCN.",
                    "Conception de l'interface et integration responsive.",
                    "Developpement back-end avec Rust, Axum, WebSocket avec SocketIO.",
                    "Gestion et requetes de base de donnees Postgres."
                ]
            },
            {
                title: "Silk and Steel, Studio Mercier (Projet d'etude)",
                dates: "09/2023 a 08/2024",
                bullets: [
                    "Supervision de l'equipe de creation.",
                    "Modelisation, Rigging complet et animation.",
                    "Programmation avec C++ des mecaniques UI/UX.",
                    "Developpement des IA (behavior Trees, C++)"
                ]
            },
            {
                title: "Developpeur Infographiste, Yakprod",
                dates: "05/2024 a 08/2024",
                bullets: [
                    "Developpement d'une IA complexe.",
                    "Scripting en Blueprint C++.",
                    "Integration de fonctions C++ personnalisees pour un controle avance."
                ]
            }
        ]

        exps.forEach(exp => {
            const titleLines = pdf.splitTextToSize(exp.title, lw)
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(8.5)
            pdf.setTextColor(0, 0, 0)
            pdf.text(titleLines, lx, ly)
            ly += titleLines.length * 3.7

            pdf.setFont('helvetica', 'italic')
            pdf.setFontSize(7.5)
            pdf.setTextColor(130, 130, 130)
            pdf.text(exp.dates, lx, ly)
            ly += 4

            exp.bullets.forEach(b => {
                pdf.setFont('helvetica', 'normal')
                pdf.setFontSize(8)
                pdf.setTextColor(60, 60, 60)
                const bLines = pdf.splitTextToSize(b, lw - 4)
                pdf.text('-', lx, ly)
                pdf.text(bLines, lx + 3, ly)
                ly += bLines.length * 3.5
            })
            ly += 3
        })

        ly = section('EDUCATION', lx, ly, lw)

        const edus = [
            { school: "Epitech Lyon, Master of Science",  dates: "09/2025 a 07/2028", detail: "Specialisation Intelligence Artificielle et Data Science" },
            { school: "Studio Mercier Paris, Bachelor",   dates: "09/2021 a 07/2024", detail: "Infographie 3D Generaliste" }
        ]

        edus.forEach(edu => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(8.5)
            pdf.setTextColor(0, 0, 0)
            pdf.text(edu.school, lx, ly)
            ly += 4
            pdf.setFont('helvetica', 'italic')
            pdf.setFontSize(7.5)
            pdf.setTextColor(130, 130, 130)
            pdf.text(edu.dates, lx, ly)
            ly += 3.5
            pdf.setFont('helvetica', 'normal')
            pdf.setFontSize(8)
            pdf.setTextColor(60, 60, 60)
            const dl = pdf.splitTextToSize(edu.detail, lw)
            pdf.text(dl, lx, ly)
            ly += dl.length * 3.5 + 4
        })

        let ry = 42

        ry = section('CONTACT', rx, ry, rw)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(60, 60, 60)
        ;["07 89 42 79 78", "timotheeithier@gmail.com", "linkedin.com/in/timothee-ithier", "RQTH", "16 rue Lamothe Lyon 07"].forEach(c => {
            const cl = pdf.splitTextToSize(c, rw)
            pdf.text(cl, rx, ry)
            ry += cl.length * 3.5 + 1
        })
        ry += 5

        ry = section('SKILLS', rx, ry, rw)
        cvSkills.forEach(s => {
            pdf.setFont('helvetica', 'bold')
            pdf.setFontSize(8)
            pdf.setTextColor(0, 0, 0)
            const catLabel = s.category + ' : '
            const catW = pdf.getTextWidth(catLabel)
            pdf.text(catLabel, rx, ry)
            pdf.setFont('helvetica', 'normal')
            pdf.setTextColor(60, 60, 60)
            const firstLineW = Math.max(rw - catW, 20)
            const firstChunk = pdf.splitTextToSize(s.content, firstLineW)
            pdf.text(firstChunk[0] || '', rx + catW, ry)
            if (firstChunk.length > 1) {
                const rest = pdf.splitTextToSize(firstChunk.slice(1).join(' '), rw)
                ry += 3.5
                pdf.text(rest, rx, ry)
                ry += rest.length * 3.5
            } else {
                ry += 3.5
            }
            ry += 2
        })
        ry += 4

        ry = section('SOFT SKILLS', rx, ry, rw)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(60, 60, 60)
        ;["Gestion d'equipe", "Rigueur", "Responsabilite", "Organisation", "Presentation", "Ponctuel", "Autonomie"].forEach(s => {
            pdf.text('• ' + s, rx, ry)
            ry += 3.5
        })
        ry += 5

        ry = section('HOBBIES', rx, ry, rw)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(60, 60, 60)
        ;["Piano", "Scoutisme", "Theatre", "Natation", "Jeux video"].forEach(h => {
            pdf.text('• ' + h, rx, ry)
            ry += 3.5
        })

        await createResume_generated(token, jobTitle, JSON.stringify(cvSkills))
        pdf.save('CV_TimotheeITHIER_' + jobTitle.replace(/ /g, '_') + '.pdf')
    }

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-4 text-2xl font-bold">CV</h1>

            <div className="mb-4">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Titre du poste</label>
                <input type="text" value={jobTitle} onChange={(e) => handleJobTitleChange(e.target.value)} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
            </div>

            <div className="mb-4">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Offre d'emploi (pour l'IA)</label>
                <textarea value={jobOffer} onChange={(e) => setJobOffer(e.target.value)} placeholder="Collez l'offre d'emploi ici..." className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm h-32 resize-none focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
            </div>

            <hr className="border-0 h-px bg-gray-200 my-4" />
            <h2 className="text-gray-800 mb-3 text-lg font-bold">Skills</h2>

            <div className="flex flex-col gap-3 mb-4">
                {cvSkills.map((s, i) => (
                    <div key={i} className="flex gap-2 items-center w-full overflow-hidden">
                        <select
                            value={s.category}
                            onChange={(e) => updateSkillCategory(i, e.target.value)}
                            className="w-[35%] min-w-0 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] shrink-0"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={s.content}
                            onChange={(e) => updateSkillContent(i, e.target.value)}
                            className="flex-1 min-w-0 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]"
                        />
                        <button type="button" onClick={() => removeSkillRow(i)} className="px-3 py-3 bg-red-600 text-white rounded-lg text-sm font-bold cursor-pointer hover:bg-red-700 transition-all shrink-0">✕</button>
                    </div>
                ))}
            </div>

            <button type="button" onClick={addSkillRow} className="w-full p-3 mb-4 border-2 border-dashed border-[#005c1c] text-[#005c1c] rounded-lg text-sm font-semibold cursor-pointer hover:bg-green-50 transition-all">
                + Ajouter une categorie
            </button>

            <button type="button" onClick={handleAnalyze} className="w-full p-3 mb-3 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Optimiser avec l'IA</button>
            <button type="button" onClick={generateCV} className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Telecharger CV en PDF</button>
        </div>
    )
}

export default CVEditor
