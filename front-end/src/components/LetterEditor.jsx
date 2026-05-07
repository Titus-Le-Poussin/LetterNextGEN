import {useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getLetter_template, createLetter_template, deleteLetter_template } from '../services/letter_template.service'
import { jsPDF } from 'jspdf'
import { createLetter_generated } from '../services/letter_generated.service'  

function LetterEditor({ fields, onTemplateSelect, onFieldsChange, onFontSizeChange, templateContent }) {
    const { token } = useContext(AuthContext)
    const [templates, setTemplates] = useState([])
    const [fontSize, setFontSize] = useState(11)
    const [newTemplateName, setNewTemplateName] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState(null)

    useEffect(() => {
      getLetter_template(token).then(data => {
        setTemplates(data)                          
        if (data.length > 0) { 
            setSelectedTemplate(data[0]);
            onTemplateSelect(data[0].content) }                   
      })          
  }, [])

    async function generatePDF() {
        const pdf = new jsPDF('p', 'mm', 'a4')
        const companyName = fields.field7 || "Entreprise"
        const jobName = fields.field6 || "Poste"

        pdf.setFillColor(41, 107, 63)
        pdf.rect(0, 0, 175, 50, 'F')
        pdf.setFillColor(44, 115, 72)
        pdf.rect(157, 0, 53, 297, 'F')

        pdf.setTextColor(255, 255, 255)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(18)
        pdf.text('TIMOTHEE ITHIER', 15, 30)

        let emailY = 60
        pdf.setFontSize(8)
        pdf.text('EMAIL', 165, 55)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.splitTextToSize('timotheeithier@gmail.com', 18).forEach(line => { pdf.text(line, 165, emailY); emailY += 3 })

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.text('TELEPHONE', 165, emailY + 5)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.text('+33 7 89 42 79 78', 165, emailY + 9)

        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(8)
        pdf.text('ADRESSE', 165, emailY + 17)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(7)
        pdf.text('16 rue Lamothe', 165, emailY + 21)
        pdf.text('Lyon 69007', 165, emailY + 24)
        pdf.text('France', 165, emailY + 27)

        pdf.setTextColor(0, 0, 0)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(fontSize)

        let y = 60
        const lineHeight = fontSize * 0.45
        const maxWidth = 135

        const editableBody = document.getElementById('editableBody')
        const paragraphs = editableBody.innerText.split('\n\n').filter(p => p.trim())

        paragraphs.forEach((para, index) => {
            const isLast = index === paragraphs.length - 1
            const text = para.trim()
            if (text) {
                if (isLast) pdf.setFont('helvetica', 'bold')
                const lines = pdf.splitTextToSize(text, maxWidth)
                lines.forEach(line => {
                    if (y > 270) { pdf.addPage(); y = 20 }
                    pdf.text(line, 15, y)
                    y += lineHeight
                })
                if (isLast) pdf.setFont('helvetica', 'normal')
                y += lineHeight * 0.8
            }
        })                            
        await createLetter_generated(token, companyName, jobName, "", editableBody.innerText)
        pdf.save('Lettre_Motivation_Timothee_ITHIER_' + companyName + '_' + jobName + '.pdf')
    }

      return (
           <div className="bg-white p-4 rounded-2xl shadow-xl">
                <h1 className="text-gray-800 mb-8 text-2xl font-bold">Lettre de motivation</h1>

                <form id="letterForm">
                    <div className="mb-6">
                        <label htmlFor="templateSelect" className="block mb-2 text-[#005c1c] font-semibold text-sm">Selectionner un modele :</label>
                        <select onChange={(e) => {const selected = templates.find(t => t.id === parseInt(e.target.value)); 
                            if (selected) { setSelectedTemplate(selected); onTemplateSelect(selected.content) }}} 
                            id="templateSelect" 
                            className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10">
                            {templates.map(t => (               
                            <option key={t.id} value={t.id}>{t.name}</option>
                            ))}
                        </select>
                        {selectedTemplate && !selectedTemplate.is_default && (                                                  
                            <button type="button" onClick={() => {
                                deleteLetter_template(token,
                                selectedTemplate.id).then(() => {                   
                                getLetter_template(token).then(data => {
                                setTemplates(data); setSelectedTemplate(data[0]);   
                                onTemplateSelect(data[0].content) }) }) }}
                                className="mt-2 px-3 py-1 bg-red-600 text-white
                                rounded-lg text-xs font-semibold cursor-pointer
                                hover:bg-red-700 transition-all">Supprimer</button>
                            )}
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Enregistrer le modele de lettre</label>
                        <div className="flex flex-row">
                            <input type="text" id="fieldNameModelLetter" value={newTemplateName} onChange={(e) => setNewTemplateName(e.target.value)} placeholder="Nom du Modele de lettre" className="w-1/2 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                            <button type="button" id="RegisterModelBtn" onClick={() => {createLetter_template(token, newTemplateName, templateContent).then(() => {getLetter_template(token).then(data => {setTemplates(data); setNewTemplateName("")})})}} className="w-[20%] p-2 ml-auto bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xs font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Save Modele</button>
                        </div>
                    </div>

                    <hr className="border-0 h-px bg-gray-200 my-8" />

                    <h2 className="text-gray-800 mb-5 text-xl font-bold">Champs a personnaliser</h2>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Domaine de l'entreprise:</label>
                        <input type="text" id="field1" onChange={(e) => onFieldsChange({ ...fields, field1: e.target.value })}  value={fields.field1} placeholder="mobilite et l'innovation ferroviaire" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Type de projet, produit ou mission de l'entreprise:</label>
                        <input type="text" id="field2" onChange={(e) => onFieldsChange({ ...fields, field2: e.target.value })} value={fields.field2} placeholder="digitalisation des services, l'optimisation des systemes de transport ou la gestion des infrastructures" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Langages, frameworks, outils du candidat:</label>
                        <input type="text" id="field3" onChange={(e) => onFieldsChange({ ...fields, field3: e.target.value })} value={fields.field3} placeholder="programmation full stack, developpement web et outils numeriques" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Technologies de l'entreprise / type de projet de l'entreprise:</label>
                        <input type="text" id="field4" onChange={(e) => onFieldsChange({ ...fields, field4: e.target.value })} value={fields.field4} placeholder="developpement d'applications et d'outils interactifs" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Type de projet / technologie effectue par le candidat :</label>
                        <input type="text" id="field5" onChange={(e) => onFieldsChange({ ...fields, field5: e.target.value })} value={fields.field5} placeholder="developpement web et informatique" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Intitule du poste</label>
                        <input type="text" id="field7" onChange={(e) => onFieldsChange({ ...fields, field6: e.target.value })} value={fields.field6} placeholder="Developpeur Web" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <hr className="border-0 h-px bg-gray-200 my-8" />

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Nom de l'Entreprise:</label>
                        <input type="text" id="field6" value={fields.field7} onChange={(e) => onFieldsChange({ ...fields, field7: e.target.value })}  placeholder="SNCF" required className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10" />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Taille du texte (PDF) :</label>
                        <div className="flex items-center gap-4 mt-2">
                            <button type="button" onClick={() => { if (fontSize > 8) { setFontSize(fontSize - 1); onFontSizeChange(fontSize - 1) } }} className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">-</button>
                            <span id="sizeDisplay" className="text-lg font-bold text-gray-800 min-w-[30px] text-center">{fontSize}</span>
                            <button type="button" onClick={() => { if (fontSize < 14) { setFontSize(fontSize + 1); onFontSizeChange(fontSize + 1) } }} className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">+</button>
                        </div>
                    </div>

                    <button type="button" onClick={generatePDF} className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">Telecharger en PDF</button>
                </form>
            </div>
      )
  }

export default LetterEditor
