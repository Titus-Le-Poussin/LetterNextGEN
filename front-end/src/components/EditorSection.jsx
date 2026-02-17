function EditorSection() {
      return (
           <div className="bg-white p-4 rounded-2xl shadow-xl">
                <h1 className="text-gray-800 mb-8 text-2xl font-bold">Lettre de motivation</h1>

                <form id="letterForm">
                    <div className="mb-6">
                        <label htmlFor="templateSelect" className="block mb-2 text-[#005c1c] font-semibold text-sm">Selectionner un modele :</label>
                        <select id="templateSelect" className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10">
                            <option value="default">Modele Standard (Alternance)</option>
                            <option value="2">Modele 2</option>
                            <option value="3">Modele 3</option>
                            <option value="4">Modele 4</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Enregistrer le modele de lettre</label>
                        <div className="flex flex-row">
                            <input type="text" id="fieldNameModelLetter" placeholder="Nom du Modele de lettre" className="w-1/2 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                            <button type="button" id="RegisterModelBtn" onClick={() => {}} className="w-[20%] p-2 ml-auto bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Save Modele</button>
                        </div>
                    </div>

                    <hr className="border-0 h-px bg-gray-200 my-8" />

                    <h2 className="text-gray-800 mb-5 text-xl font-bold">Champs a personnaliser</h2>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Domaine de l'entreprise:</label>
                        <input type="text" id="field1" placeholder="mobilite et l'innovation ferroviaire" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Type de projet, produit ou mission de l'entreprise:</label>
                        <input type="text" id="field2" placeholder="digitalisation des services, l'optimisation des systemes de transport ou la gestion des infrastructures" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Langages, frameworks, outils du candidat:</label>
                        <input type="text" id="field3" placeholder="programmation full stack, developpement web et outils numeriques" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Technologies de l'entreprise / type de projet de l'entreprise:</label>
                        <input type="text" id="field4" placeholder="developpement d'applications et d'outils interactifs" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Type de projet / technologie effectue par le candidat :</label>
                        <input type="text" id="field5" placeholder="developpement web et informatique" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Intitule du poste</label>
                        <input type="text" id="field7" placeholder="Developpeur Web" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <hr className="border-0 h-px bg-gray-200 my-8" />

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Nom de l'Entreprise:</label>
                        <input type="text" id="field6" placeholder="SNCF" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Taille du texte (PDF) :</label>
                        <div className="flex items-center gap-4 mt-2">
                            <button type="button" onClick={() => {}} className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">-</button>
                            <span id="sizeDisplay" className="text-lg font-bold text-gray-800 min-w-[30px] text-center">11</span>
                            <button type="button" onClick={() => {}} className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">+</button>
                        </div>
                    </div>

                    <button type="button" onClick={() => {}} className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Telecharger en PDF</button>
                </form>
            </div>
      )
  }

export default EditorSection
