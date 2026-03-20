function LetterOffer() {
    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-8 text-2xl font-bold">Offre</h1>

            <div className="mb-6">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Offre d'emplois</label>
                <textarea id="jobOffer" placeholder="Collez l'offre d'emploi ici..." className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm h-52 resize-none focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10"></textarea>
            </div>

            <hr className="border-0 h-px bg-gray-200 my-8" />

            <h2 className="text-gray-800 mb-5 text-xl font-bold">Prompt IA</h2>

            <div className="mb-6">
                <div className="mb-6">
                    <label htmlFor="promptTemplateSelect" className="block mb-2 text-[#005c1c] font-semibold text-sm">Modele du Prompt</label>
                    <select id="promptTemplateSelect" className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10">
                        <option value="default">Modele Standard (Alternance)</option>
                    </select>
                </div>

                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Instructions pour l'IA</label>
                <textarea id="aiPrompt" placeholder="Prompt pour l'IA..." className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm h-52 resize-none focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" defaultValue={`Tu es un assistant qui analyse des offres d'emploi pour remplir automatiquement les champs d'une lettre de motivation.

A partir de l'offre d'emploi fournie, extrais les informations suivantes au format JSON :

{
  "field1": "Domaine de l'entreprise (ex: la mobilite et l'innovation ferroviaire)",
  "field2": "Type de projet, produit ou mission de l'entreprise (ex: digitalisation des services, optimisation des systemes)",
  "field3": "Langages, frameworks, outils recherches (ex: programmation full stack, Python, React)",
  "field4": "Technologies de l'entreprise / type de projet (ex: developpement d'applications web)",
  "field5": "Type de projet / technologie a mettre en avant par le candidat (ex: developpement web et informatique)",
  "field6": "Nom de l'entreprise",
  "field7": "Intitule exact du poste"
}

Regles importantes :
- Pour field1 : identifie le SECTEUR d'activite principal
- Pour field2 : liste les MISSIONS ou PROJETS concrets
- Pour field3 : extrais les COMPETENCES TECHNIQUES demandees
- Pour field4 : identifie les TECHNOLOGIES ou TYPES DE PROJETS de l'entreprise
- Pour field5 : suggere des projets pertinents que le candidat pourrait mettre en avant
- Reponds UNIQUEMENT avec le JSON, sans texte supplementaire`} />
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Enregistrer le prompt</label>
                <div className="flex flex-row">
                    <input type="text" id="fieldNamePrompt" placeholder="Nom du prompt" className="w-1/2 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    <button type="button" id="RegisterPromptBtn" onClick={() => {}} className="w-[20%] p-2 ml-auto bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Save Prompt</button>
                </div>
            </div>

            <button type="button" id="generateBtn" onClick={() => {}} className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Remplir Automatiquement avec l'IA</button>

            <div id="loadingMessage" style={{display: 'none'}} className="mt-4 text-[#005c1c] font-semibold text-center">
                Analyse en cours...
            </div>
            <div id="errorMessage" style={{display: 'none'}} className="mt-4 text-red-600 font-semibold text-center"></div>
        </div>
    )
}

export default LetterOffer
