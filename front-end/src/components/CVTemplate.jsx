import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { getResume_generated, deleteResume_generated } from "../services/resume_generated.service"

function CVTemplate({ onCVSelect }) {
    const { token } = useContext(AuthContext)
    const [cvs, setCvs] = useState([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("created")

    function load() {
        getResume_generated(token).then(data => setCvs(data))
    }

    useEffect(() => { load() }, [])

    async function handleDelete(id) {
        await deleteResume_generated(token, id)
        load()
    }

    const filtered = cvs.filter(c =>
        (c.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (c.job_title || "").toLowerCase().includes(search.toLowerCase())
    )

    const sorted = [...filtered].sort((a, b) => {
        const key = sortBy === "created" ? "created_at" : "updated_at"
        return new Date(b[key]) - new Date(a[key])
    })

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-4 text-2xl font-bold">CV sauvegardés</h1>

            <div className="flex flex-wrap gap-3 mb-4">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-[140px] p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]"
                >
                    <option value="created">Date de création</option>
                    <option value="modified">Date de modification</option>
                </select>
            </div>

            <div className="flex flex-col gap-2">
                {sorted.map(cv => (
                    <div key={cv.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{cv.job_title} / {cv.company_name}</p>
                            <p className="text-xs text-gray-400">{new Date(cv.created_at).toLocaleDateString()}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onCVSelect && onCVSelect(cv)}
                            className="px-3 py-1 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 transition-all shrink-0"
                        >
                            Charger
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(cv.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shrink-0"
                        >✕</button>
                    </div>
                ))}
                {sorted.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Aucun CV sauvegardé</p>
                )}
            </div>
        </div>
    )
}

export default CVTemplate
