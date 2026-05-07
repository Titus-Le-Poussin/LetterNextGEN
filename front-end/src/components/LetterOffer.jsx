import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { analyzeLetter } from '../services/ai.service'
import { getPrompts, createPrompt, deletePrompt } from '../services/prompt.service'


function LetterOffer({ onResult }) {
    const { token } = useContext(AuthContext)
    const [jobOffer, setJobOffer] = useState("")
    const [prompts, setPrompts] = useState([])
    const [selectedPrompt, setSelectedPrompt] = useState(null)                                      
    const [promptContent, setPromptContent] = useState("")                                        
    const [newPromptName, setNewPromptName] = useState("")              
    useEffect(() => {    
        getPrompts(token).then(data => {
            setPrompts(data)            
            if (data.length > 0) {                      
                setSelectedPrompt(data[0])
                setPromptContent(data[0].content)       
            }                                           
        })               
    }, [])      
    async function handleAnalyze() {
      const result = await analyzeLetter(token, jobOffer, promptContent) 
      onResult(result)
    }
    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-8 text-2xl font-bold">Offre</h1>

            <div className="mb-6">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Offre d'emplois</label>
                <textarea id="jobOffer" value={jobOffer} onChange={(e) => setJobOffer(e.target.value)} placeholder="Collez l'offre d'emploi ici..." className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm h-52 resize-none focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10"></textarea>
            </div>

            <hr className="border-0 h-px bg-gray-200 my-8" />

            <h2 className="text-gray-800 mb-5 text-xl font-bold">Prompt IA</h2>

            <div className="mb-6">
                <div className="mb-6">
                    <label htmlFor="promptTemplateSelect" className="block mb-2 text-[#005c1c] font-semibold text-sm">Modele du Prompt</label>
                    <select onChange={(e) => { const selected = prompts.find(p => p.id === parseInt(e.target.value)); if (selected) {          
                        setSelectedPrompt(selected);         
                        setPromptContent(selected.content) }}}              
                        id="promptTemplateSelect" className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10">
                        {prompts.map(p => (                   
                            <option key={p.id} value={p.id}>{p.name}</option>                      
                        ))}                       
                    </select>
                    {selectedPrompt && !selectedPrompt.is_default && (  
                    <button type="button" onClick={() => {        
                        deletePrompt(token, selectedPrompt.id).then(() => { 
                        getPrompts(token).then(data => { setPrompts(data);  
                        setSelectedPrompt(data[0]);
                        setPromptContent(data[0].content) }) }) }}          
                        className="mt-2 px-3 py-1 bg-red-600 text-white
                        rounded-lg text-xs font-semibold cursor-pointer
                        hover:bg-red-700 transition-all">Supprimer</button>
                    )}
                </div>

                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Instructions pour l'IA</label>
                <textarea id="aiPrompt" value={promptContent} onChange={(e) => setPromptContent(e.target.value)} placeholder="Prompt pour l'IA..." className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm h-52 resize-none focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10"></textarea>
            </div>

            <div className="mb-6">
                <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Enregistrer le prompt</label>
                <div className="flex flex-row">
                    <input type="text" value={newPromptName} onChange={(e) => setNewPromptName(e.target.value)} id="fieldNamePrompt" placeholder="Nom du prompt" className="w-1/2 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    <button type="button" id="RegisterPromptBtn" onClick={() => { createPrompt(token, newPromptName, promptContent).then(() => { getPrompts(token).then(data => { setPrompts(data) ; setNewPromptName("") })})}} className="w-[20%] p-2 ml-auto bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Save Prompt</button>
                </div>
            </div>

            <button type="button" id="generateBtn" onClick={handleAnalyze} className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Remplir Automatiquement avec l'IA</button>

            <div id="loadingMessage" style={{display: 'none'}} className="mt-4 text-[#005c1c] font-semibold text-center">
                Analyse en cours...
            </div>
            <div id="errorMessage" style={{display: 'none'}} className="mt-4 text-red-600 font-semibold text-center"></div>
        </div>
    )
}

export default LetterOffer
