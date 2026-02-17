function Header({ showOffer, showEditor, showPreview, setShowOffer, setShowEditor, setShowPreview }) {
    return (
        <header className="bg-white rounded-2xl shadow-xl p-4 mb-8 flex items-center gap-4">
            <h1 className="text-gray-800 text-xl font-bold mr-auto">Job Tools</h1>
            <button
                type="button"
                onClick={() => setShowOffer(!showOffer)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    showOffer
                        ? 'bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white'
                        : 'bg-gray-200 text-gray-500'
                }`}
            >
                Offre
            </button>
            <button
                type="button"
                onClick={() => setShowEditor(!showEditor)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    showEditor
                        ? 'bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white'
                        : 'bg-gray-200 text-gray-500'
                }`}
            >
                Editor
            </button>
            <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    showPreview
                        ? 'bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white'
                        : 'bg-gray-200 text-gray-500'
                }`}
            >
                Preview
            </button>
        </header>
    )
}

export default Header
