import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getSkills, createSkill, deleteSkill } from '../services/skills.service'

function SkillsManager({ onUpdate }) {
    const { token } = useContext(AuthContext)
    const [skills, setSkills] = useState([])
    const [newSkillName, setNewSkillName] = useState("")
    const [newSkillCategory, setNewSkillCategory] = useState("")
    const [customCategory, setCustomCategory] = useState("")
    const [isNewCat, setIsNewCat] = useState(false)

    function load() {
        getSkills(token).then(data => {
            setSkills(data)
            if (data.length > 0 && !newSkillCategory) {
                setNewSkillCategory(data[0].category_name)
            }
        })
    }

    useEffect(() => { load() }, [])

    const [openCats, setOpenCats] = useState([])

    const categories = [...new Set(skills.map(s => s.category_name))]

    function toggleCat(cat) {
        setOpenCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat])
    }

    async function handleAdd() {
        const cat = isNewCat ? customCategory.trim() : newSkillCategory
        if (!newSkillName.trim() || !cat) return
        await createSkill(token, newSkillName.trim(), cat)
        setNewSkillName("")
        setCustomCategory("")
        load()
        if (onUpdate) onUpdate()
    }

    async function handleDeleteSkill(id) {
        await deleteSkill(token, id)
        load()
        if (onUpdate) onUpdate()
    }

    async function handleDeleteCategory(cat) {
        const toDelete = skills.filter(s => s.category_name === cat)
        for (const s of toDelete) await deleteSkill(token, s.id)
        load()
        if (onUpdate) onUpdate()
    }

    async function handleMoveSkill(skill, newCat) {
        await deleteSkill(token, skill.id)
        await createSkill(token, skill.skill_name, newCat)
        load()
        if (onUpdate) onUpdate()
    }

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-6 text-2xl font-bold">Mes Skills</h1>

            <div className="flex flex-col gap-2 mb-6">
                {categories.map(cat => {
                    const isOpen = openCats.includes(cat)
                    const catSkills = skills.filter(s => s.category_name === cat)
                    return (
                        <div key={cat} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div
                                className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all"
                                onClick={() => toggleCat(cat)}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-[#005c1c] uppercase tracking-wide">{cat}</span>
                                    <span className="text-xs text-gray-400">({catSkills.length})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); handleDeleteCategory(cat) }}
                                        className="px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-semibold hover:bg-red-200 transition-all"
                                    >
                                        Supprimer
                                    </button>
                                    <span className="text-gray-400 text-sm">{isOpen ? '▲' : '▼'}</span>
                                </div>
                            </div>

                            {isOpen && (
                                <div className="px-4 pb-3 flex flex-col gap-1.5 border-t border-gray-100">
                                    {catSkills.map(skill => (
                                        <div key={skill.id} className="flex items-center gap-2 pt-1.5">
                                            <span className="flex-1 text-sm text-gray-700">{skill.skill_name}</span>
                                            <select
                                                value={skill.category_name}
                                                onChange={(e) => handleMoveSkill(skill, e.target.value)}
                                                className="p-1.5 border border-gray-200 rounded text-xs focus:outline-none focus:border-[#005c1c]"
                                            >
                                                {categories.map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                className="px-2 py-1.5 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-700 transition-all"
                                            >✕</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>

            <hr className="border-0 h-px bg-gray-200 mb-4" />
            <h2 className="text-gray-800 mb-3 text-lg font-bold">Ajouter un skill</h2>

            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Nom du skill (ex: Python)"
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10"
                />

                <div className="flex items-center gap-2">
                    {!isNewCat ? (
                        <select
                            value={newSkillCategory}
                            onChange={(e) => setNewSkillCategory(e.target.value)}
                            className="flex-1 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]"
                        >
                            {categories.map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            placeholder="Nom de la nouvelle catégorie"
                            className="flex-1 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]"
                        />
                    )}
                    <button
                        type="button"
                        onClick={() => setIsNewCat(!isNewCat)}
                        className="px-3 py-3 border-2 border-[#005c1c] text-[#005c1c] rounded-lg text-xs font-semibold hover:bg-green-50 transition-all shrink-0"
                    >
                        {isNewCat ? "Catégorie existante" : "Nouvelle catégorie"}
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleAdd}
                    className="w-full p-3 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all"
                >
                    Ajouter
                </button>
            </div>
        </div>
    )
}

export default SkillsManager
