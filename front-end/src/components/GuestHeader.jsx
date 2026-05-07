function GuestHeader({
    showLetterTemplate, setShowLetterTemplate,
    showLetterOffer, setShowLetterOffer,
    showLetterEditor, setShowLetterEditor,
    showLetterPreview, setShowLetterPreview,
    showSkillsManager, setShowSkillsManager
}) {
    const btn = (active) =>
        `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            active
                ? 'bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white'
                : 'bg-gray-200 text-gray-500'
        }`

    return (
        <header className="bg-white rounded-2xl shadow-xl p-4 mb-8 flex flex-wrap items-center gap-3">
            <h1 className="text-gray-800 text-xl font-bold mr-auto">LetterNextGEN</h1>

            <span className="text-xs text-gray-400 font-semibold uppercase">Lettre</span>
            <button type="button" onClick={() => setShowLetterTemplate(!showLetterTemplate)} className={btn(showLetterTemplate)}>Template</button>
            <button type="button" onClick={() => setShowLetterOffer(!showLetterOffer)} className={btn(showLetterOffer)}>Offre</button>
            <button type="button" onClick={() => setShowLetterEditor(!showLetterEditor)} className={btn(showLetterEditor)}>Éditeur</button>
            <button type="button" onClick={() => setShowLetterPreview(!showLetterPreview)} className={btn(showLetterPreview)}>Aperçu</button>

            <span className="text-xs text-gray-400 font-semibold uppercase ml-4">Compétences</span>
            <button type="button" onClick={() => setShowSkillsManager(!showSkillsManager)} className={btn(showSkillsManager)}>Gérer</button>
        </header>
    )
}

export default GuestHeader
