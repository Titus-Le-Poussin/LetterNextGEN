function PreviewSection() {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h2 className="text-gray-800 mb-5 text-xl font-bold">Apercu de la lettre</h2>

            <div id="letterPreview" className="bg-white border border-gray-300 rounded-lg overflow-hidden relative aspect-[210/297] flex">
                {/* Sidebar */}
                <div className="w-[150px] bg-[#2c7348] pt-20 px-2 pb-5 shrink-0 order-2">
                    <div className="flex flex-col gap-6">
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">EMAIL</strong>
                            <p className="text-[8px] leading-tight break-words">timotheeithier@gmail.com</p>
                        </div>
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">TELEPHONE</strong>
                            <p className="text-[8px] leading-tight">+33 7 89 42 79 78</p>
                        </div>
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">ADRESSE</strong>
                            <p className="text-[8px] leading-tight">16 rue Lamothe<br />Lyon 69007, France</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 order-1">
                    <div className="bg-[#296b3f] py-10 px-8 text-white">
                        <h3 className="text-white text-xl m-0 font-bold">TIMOTHEE ITHIER</h3>
                    </div>
                    <div className="letter-body p-8 text-xs leading-relaxed text-gray-800" contentEditable="true" id="editableBody">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewSection
