import { useState, useEffect, useContext, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { getLetter_template, createLetter_template, deleteLetter_template } from '../services/letter_template.service'
import { jsPDF } from 'jspdf'
import { createLetter_generated } from '../services/letter_generated.service'

const FIELDS = ['field1', 'field2', 'field3', 'field4', 'field5', 'field6', 'field7']

function GuestLetterEditor({ fields, onTemplateSelect, onFieldsChange, onFontSizeChange, templateContent, userInfo, onUserInfoChange }) {
    const { token } = useContext(AuthContext)
    const [templates, setTemplates] = useState([])
    const [fontSize, setFontSize] = useState(11)
    const [newTemplateName, setNewTemplateName] = useState("")
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const textareaRef = useRef(null)

    useEffect(() => {
        getLetter_template(token).then(data => {
            if (!data || !data.length) return
            setTemplates(data)
            setSelectedTemplate(data[0])
            onTemplateSelect(data[0].content)
        })
    }, [])

    const setInfo = (key) => (e) => onUserInfoChange({ ...userInfo, [key]: e.target.value })
    const cls = "w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10"

    function insertField(tag) {
        const ta = textareaRef.current
        const start = ta ? ta.selectionStart : templateContent.length
        const end = ta ? ta.selectionEnd : templateContent.length
        const newVal = templateContent.slice(0, start) + tag + templateContent.slice(end)
        onTemplateSelect(newVal)
        setTimeout(() => {
            if (ta) { ta.selectionStart = ta.selectionEnd = start + tag.length; ta.focus() }
        }, 0)
    }

    async function generatePDF() {
        const pdf = new jsPDF('p', 'mm', 'a4')
        const companyName = fields.field7 || "Entreprise"
        const jobName = fields.field6 || "Poste"
        const name = (userInfo?.name || 'CANDIDAT').toUpperCase()
        const email = userInfo?.email || ''
        const phone = userInfo?.phone || ''
        const address = userInfo?.address || ''

        pdf.setFillColor(41, 107, 63)
        pdf.rect(0, 0, 175, 50, 'F')
        pdf.setFillColor(44, 115, 72)
        pdf.rect(157, 0, 53, 297, 'F')

        pdf.setTextColor(255, 255, 255)
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(18)
        pdf.text(name, 15, 30)

        let sideY = 55
        if (email) {
            pdf.setFontSize(8); pdf.text('EMAIL', 165, sideY)
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); sideY += 4
            pdf.splitTextToSize(email, 40).forEach(l => { pdf.text(l, 165, sideY); sideY += 3 }); sideY += 3
        }
        if (phone) {
            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.text('TÉLÉPHONE', 165, sideY)
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); sideY += 4
            pdf.text(phone, 165, sideY); sideY += 8
        }
        if (address) {
            pdf.setFont('helvetica', 'bold'); pdf.setFontSize(8); pdf.text('ADRESSE', 165, sideY)
            pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7); sideY += 4
            pdf.splitTextToSize(address, 40).forEach(l => { pdf.text(l, 165, sideY); sideY += 3 })
        }

        pdf.setTextColor(0, 0, 0)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(fontSize)

        let y = 60
        const lineHeight = fontSize * 0.45
        const editableBody = document.getElementById('editableBody')
        const paragraphs = editableBody.innerText.split('\n\n').filter(p => p.trim())

        paragraphs.forEach((para, index) => {
            const isLast = index === paragraphs.length - 1
            const text = para.trim()
            if (text) {
                if (isLast) pdf.setFont('helvetica', 'bold')
                pdf.splitTextToSize(text, 135).forEach(line => {
                    if (y > 270) { pdf.addPage(); y = 20 }
                    pdf.text(line, 15, y); y += lineHeight
                })
                if (isLast) pdf.setFont('helvetica', 'normal')
                y += lineHeight * 0.8
            }
        })

        await createLetter_generated(token, companyName, jobName, "", editableBody.innerText)
        pdf.save(`Lettre_${name}_${companyName}_${jobName}.pdf`)
    }

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h1 className="text-gray-800 mb-6 text-2xl font-bold">Lettre de motivation</h1>
            <form id="letterForm">

                {/* ── Infos personnelles ── */}
                <h2 className="text-gray-800 mb-4 text-lg font-bold">Vos informations</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Nom complet</label>
                        <input type="text" value={userInfo?.name || ''} onChange={setInfo('name')} placeholder="Jean Dupont" className={cls} />
                    </div>
                    <div>
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Email</label>
                        <input type="email" value={userInfo?.email || ''} onChange={setInfo('email')} placeholder="jean@exemple.com" className={cls} />
                    </div>
                    <div>
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Téléphone</label>
                        <input type="text" value={userInfo?.phone || ''} onChange={setInfo('phone')} placeholder="+33 6 00 00 00 00" className={cls} />
                    </div>
                    <div>
                        <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Adresse</label>
                        <input type="text" value={userInfo?.address || ''} onChange={setInfo('address')} placeholder="12 rue de la Paix, Paris 75001" className={cls} />
                    </div>
                </div>

                <hr className="border-0 h-px bg-gray-200 my-6" />

                {/* ── Modèle ── */}
                <div className="mb-4">
                    <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Sélectionner un modèle :</label>
                    <select onChange={(e) => {
                        const s = templates.find(t => t.id === parseInt(e.target.value))
                        if (s) { setSelectedTemplate(s); onTemplateSelect(s.content) }
                    }} className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]">
                        {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                    {selectedTemplate && !selectedTemplate.is_default && (
                        <button type="button" onClick={() => {
                            deleteLetter_template(token, selectedTemplate.id).then(() => {
                                getLetter_template(token).then(data => {
                                    setTemplates(data); setSelectedTemplate(data[0])
                                    onTemplateSelect(data[0]?.content || "")
                                })
                            })
                        }} className="mt-2 px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer hover:bg-red-700 transition-all">
                            Supprimer
                        </button>
                    )}
                </div>

                {/* ── Éditeur de modèle ── */}
                <div className="mb-4">
                    <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Rédiger / modifier le modèle :</label>

                    {/* Boutons d'insertion */}
                    <div className="flex flex-wrap gap-2 mb-2">
                        {FIELDS.map(f => (
                            <button key={f} type="button" onClick={() => insertField(`{{${f}}}`)}
                                className="px-2 py-1 bg-[#e8f5e9] border border-[#005c1c] text-[#005c1c] rounded text-xs font-mono font-semibold hover:bg-[#c8e6c9] transition-colors cursor-pointer">
                                {`{{${f}}}`}
                            </button>
                        ))}
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={templateContent}
                        onChange={e => onTemplateSelect(e.target.value)}
                        rows={10}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-[#005c1c] focus:ring-2 focus:ring-[#005c1c]/10 resize-y"
                        placeholder="Rédigez votre modèle ici. Cliquez sur un bouton ci-dessus pour insérer un champ dynamique..."
                    />
                </div>

                {/* Sauvegarder modèle */}
                <div className="mb-6">
                    <div className="flex gap-2">
                        <input type="text" value={newTemplateName} onChange={e => setNewTemplateName(e.target.value)}
                            placeholder="Nom du modèle à sauvegarder" className="flex-1 p-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005c1c]" />
                        <button type="button" onClick={() => {
                            if (!newTemplateName.trim()) return
                            createLetter_template(token, newTemplateName, templateContent).then(() => {
                                getLetter_template(token).then(data => { setTemplates(data); setNewTemplateName("") })
                            })
                        }} className="px-4 py-2 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white rounded-lg text-sm font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all whitespace-nowrap">
                            Sauvegarder
                        </button>
                    </div>
                </div>

                <hr className="border-0 h-px bg-gray-200 my-6" />

                {/* ── Valeurs des champs ── */}
                <h2 className="text-gray-800 mb-3 text-lg font-bold">Valeurs des champs</h2>
                <p className="text-gray-400 text-xs mb-4">Remplissez la valeur que chaque champ doit prendre dans votre lettre.</p>

                {FIELDS.map(f => (
                    <div key={f} className="mb-4 flex items-center gap-3">
                        <code className="text-[#005c1c] font-mono font-bold text-sm whitespace-nowrap bg-[#e8f5e9] px-2 py-1 rounded">{`{{${f}}}`}</code>
                        <input type="text" value={fields[f]} onChange={e => onFieldsChange({ ...fields, [f]: e.target.value })}
                            placeholder={`Valeur de ${f}...`} className={cls} />
                    </div>
                ))}

                <hr className="border-0 h-px bg-gray-200 my-6" />

                {/* ── Taille + PDF ── */}
                <div className="mb-6">
                    <label className="block mb-2 text-[#005c1c] font-semibold text-sm">Taille du texte (PDF) :</label>
                    <div className="flex items-center gap-4 mt-2">
                        <button type="button" onClick={() => { if (fontSize > 8) { setFontSize(fontSize - 1); onFontSizeChange(fontSize - 1) } }}
                            className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">-</button>
                        <span className="text-lg font-bold text-gray-800 min-w-[30px] text-center">{fontSize}</span>
                        <button type="button" onClick={() => { if (fontSize < 14) { setFontSize(fontSize + 1); onFontSizeChange(fontSize + 1) } }}
                            className="w-10 h-10 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white rounded-lg text-xl font-bold cursor-pointer hover:scale-110 transition-transform">+</button>
                    </div>
                </div>

                <button type="button" onClick={generatePDF}
                    className="w-full p-4 bg-gradient-to-br from-[#0b2e00] to-[#006128] text-white border-none rounded-lg text-base font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-400/50 transition-all">
                    Télécharger en PDF
                </button>
            </form>
        </div>
    )
}

export default GuestLetterEditor
