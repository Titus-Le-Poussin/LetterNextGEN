import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { getLetter_generated, deleteLetter_generated } from "../services/letter_generated.service"

function LetterTemplate({ onLetterSelect }) {
    const { token } = useContext(AuthContext)
    const [letters, setLetters] = useState([])
    const [search, setSearch] = useState("")
    const [sortBy, setSortBy] = useState("created")

    function load() {
        getLetter_generated(token).then(data => setLetters(data))
    }

    useEffect(() => { load() }, [])

    async function handleDelete(id) {
        await deleteLetter_generated(token, id)
        load()
    }

    const filtered = letters.filter(l =>
        (l.company_name || "").toLowerCase().includes(search.toLowerCase()) ||
        (l.job_title || "").toLowerCase().includes(search.toLowerCase())
    )

    const sorted = [...filtered].sort((a, b) => {
        const key = sortBy === "created" ? "created_at" : "updated_at"
        return new Date(b[key]) - new Date(a[key])
    })

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-4 text-2xl font-bold">Lettres sauvegardées</h1>

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
                {sorted.map(letter => (
                    <div key={letter.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{letter.job_title} / {letter.company_name}</p>
                            <p className="text-xs text-gray-400">{new Date(letter.created_at).toLocaleDateString()}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => onLetterSelect(letter.letter_content)}
                            className="px-3 py-1 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 transition-all shrink-0"
                        >
                            Charger
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDelete(letter.id)}
                            className="px-2 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-all shrink-0"
                        >✕</button>
                    </div>
                ))}
                {sorted.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Aucune lettre sauvegardée</p>
                )}
            </div>
        </div>
    )
}

export default LetterTemplate
