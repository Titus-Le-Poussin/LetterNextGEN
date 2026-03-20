function Header({
    showLetterTemplate, setShowLetterTemplate,
    showLetterOffer, setShowLetterOffer,
    showLetterEditor, setShowLetterEditor,
    showCVTemplate, setShowCVTemplate,
    showCVEditor, setShowCVEditor,
    showLetterPreview, setShowLetterPreview,
    showCVPreview, setShowCVPreview
}) {
    const btn = (active) =>
        `px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            active
                ? 'bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white'
                : 'bg-gray-200 text-gray-500'
        }`

    return (
        <header className="bg-white rounded-2xl shadow-xl p-4 mb-8 flex flex-wrap items-center gap-3">
            <h1 className="text-gray-800 text-xl font-bold mr-auto">Job Tools</h1>

            <span className="text-xs text-gray-400 font-semibold uppercase">Lettre</span>
            <button type="button" onClick={() => setShowLetterTemplate(!showLetterTemplate)} className={btn(showLetterTemplate)}>Template</button>
            <button type="button" onClick={() => setShowLetterOffer(!showLetterOffer)} className={btn(showLetterOffer)}>Offer</button>
            <button type="button" onClick={() => setShowLetterEditor(!showLetterEditor)} className={btn(showLetterEditor)}>Editor</button>
            <button type="button" onClick={() => setShowLetterPreview(!showLetterPreview)} className={btn(showLetterPreview)}>Preview</button>

            <span className="text-xs text-gray-400 font-semibold uppercase ml-4">CV</span>
            <button type="button" onClick={() => setShowCVTemplate(!showCVTemplate)} className={btn(showCVTemplate)}>Template</button>
            <button type="button" onClick={() => setShowCVEditor(!showCVEditor)} className={btn(showCVEditor)}>Editor</button>
            <button type="button" onClick={() => setShowCVPreview(!showCVPreview)} className={btn(showCVPreview)}>Preview</button>
        </header>
    )
}

export default Header
