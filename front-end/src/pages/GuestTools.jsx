import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import GuestHeader from '../components/GuestHeader'
import LetterOffer from '../components/LetterOffer'
import GuestLetterEditor from '../components/GuestLetterEditor'
import GuestLetterPreview from '../components/GuestLetterPreview'
import LetterTemplate from '../components/LetterTemplate'
import SkillsManager from '../components/SkillsManager'
import { getSkills, createSkill } from '../services/skills.service'
import { getLetter_template, createLetter_template } from '../services/letter_template.service'

const GUEST_SKILLS = [
    { skill_name: 'Python', category_name: 'Data & IA' },
    { skill_name: 'SQL', category_name: 'Data & IA' },
    { skill_name: 'Machine Learning', category_name: 'Data & IA' },
    { skill_name: 'JavaScript', category_name: 'Développement' },
    { skill_name: 'React', category_name: 'Développement' },
    { skill_name: 'Node.js', category_name: 'Développement' },
    { skill_name: 'TypeScript', category_name: 'Développement' },
    { skill_name: 'HTML', category_name: 'Développement' },
    { skill_name: 'CSS', category_name: 'Développement' },
    { skill_name: 'Java', category_name: 'Développement' },
    { skill_name: 'Git', category_name: 'Outils' },
    { skill_name: 'GitHub', category_name: 'Outils' },
    { skill_name: 'Docker', category_name: 'Outils' },
    { skill_name: 'Linux', category_name: 'Outils' },
    { skill_name: 'Agile/Scrum', category_name: 'Outils' },
]

const GUEST_TEMPLATE_CONTENT = `Bonjour Madame, Monsieur,

Je souhaite vous proposer ma candidature pour le poste de {{field6}} au sein de {{field7}}.

Votre entreprise se démarque à mes yeux grâce à son rôle dans {{field1}}, ce qui motive clairement ma candidature.

Je suis convaincu que vos projets, notamment {{field2}}, correspondent parfaitement à mes aspirations professionnelles.

Je développe actuellement mes compétences en {{field3}}. J'ai déjà travaillé sur des projets académiques et personnels {{field4}}. Ces projets m'ont permis de développer une approche autonome, méthodique et orientée résultats.

Les projets que j'ai réalisés {{field5}} me donnent une expérience concrète proche de vos activités, ce qui facilitera notre collaboration.

Je serais ravi d'échanger avec vous pour vous montrer plus en détail mes compétences et ma motivation.

Je vous remercie pour votre temps et votre considération.

Cordialement`

function GuestTools() {
    const { token } = useContext(AuthContext)
    const [ready, setReady] = useState(false)
    const [showLetterTemplate, setShowLetterTemplate] = useState(true)
    const [showLetterOffer, setShowLetterOffer] = useState(true)
    const [showLetterEditor, setShowLetterEditor] = useState(true)
    const [showLetterPreview, setShowLetterPreview] = useState(true)
    const [showSkillsManager, setShowSkillsManager] = useState(false)
    const [templateContent, setTemplateContent] = useState("")
    const [fontSize, setFontSize] = useState(11)
    const [fields, setFields] = useState({ field1: "", field2: "", field3: "", field4: "", field5: "", field6: "", field7: "" })
    const [skillsRefreshKey, setSkillsRefreshKey] = useState(0)
    const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '', address: '' })

    useEffect(() => {
        if (!token) return
        async function seedIfEmpty() {
            try {
                const skills = await getSkills(token)
                if (!skills || skills.length === 0) {
                    for (const s of GUEST_SKILLS) {
                        await createSkill(token, s.skill_name, s.category_name)
                    }
                    setSkillsRefreshKey(k => k + 1)
                }
                let templates = await getLetter_template(token)
                if (!templates || templates.length === 0) {
                    await createLetter_template(token, 'Modèle par défaut', GUEST_TEMPLATE_CONTENT)
                    templates = await getLetter_template(token)
                }
                // Pré-charger le template AVANT de monter les composants pour éviter l'aperçu vide
                if (templates && templates.length > 0) {
                    setTemplateContent(templates[0].content)
                }
            } catch (e) {
                console.error('Guest seeding error:', e)
            } finally {
                setReady(true)
            }
        }
        seedIfEmpty()
    }, [token])

    if (!ready) return (
        <div className="font-sans bg-gradient-to-br from-[#288653] to-[#3b6b49] min-h-screen flex items-center justify-center">
            <p className="text-white text-xl font-semibold">Préparation de votre espace...</p>
        </div>
    )

    return (
        <div className="font-sans bg-gradient-to-br from-[#288653] to-[#3b6b49] min-h-screen p-5">
            <div className="container mx-auto">
                <GuestHeader
                    showLetterTemplate={showLetterTemplate}
                    setShowLetterTemplate={setShowLetterTemplate}
                    showLetterOffer={showLetterOffer}
                    setShowLetterOffer={setShowLetterOffer}
                    showLetterEditor={showLetterEditor}
                    setShowLetterEditor={setShowLetterEditor}
                    showLetterPreview={showLetterPreview}
                    setShowLetterPreview={setShowLetterPreview}
                    showSkillsManager={showSkillsManager}
                    setShowSkillsManager={setShowSkillsManager}
                />
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-start-1 flex flex-col gap-5">
                        {showLetterTemplate && <LetterTemplate onLetterSelect={setTemplateContent} />}
                        {showLetterOffer && <LetterOffer onResult={setFields} />}
                        {showLetterEditor && <GuestLetterEditor
                            fields={fields}
                            templateContent={templateContent}
                            onTemplateSelect={setTemplateContent}
                            onFieldsChange={setFields}
                            onFontSizeChange={setFontSize}
                            userInfo={userInfo}
                            onUserInfoChange={setUserInfo} />}
                        {showSkillsManager && <SkillsManager onUpdate={() => setSkillsRefreshKey(k => k + 1)} />}
                    </div>
                    <div className="col-start-2 flex flex-col gap-5">
                        {showLetterPreview && <GuestLetterPreview
                            fields={fields}
                            templateContent={templateContent}
                            fontSize={fontSize}
                            userInfo={userInfo} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GuestTools
