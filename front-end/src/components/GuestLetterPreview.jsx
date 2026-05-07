import { useRef, useEffect } from 'react'

function GuestLetterPreview({ fields, templateContent, fontSize, userInfo }) {
    const wrap = (val) => `<span class="dynamic-field">${val}</span>`
    const previewHTML = (templateContent || "")
        .replace(/\{\{field1\}\}/g, fields.field1 ? wrap(fields.field1) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field2\}\}/g, fields.field2 ? wrap(fields.field2) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field3\}\}/g, fields.field3 ? wrap(fields.field3) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field4\}\}/g, fields.field4 ? wrap(fields.field4) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field5\}\}/g, fields.field5 ? wrap(fields.field5) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field6\}\}/g, fields.field6 ? wrap(fields.field6) : '<span style="color:#aaa">___</span>')
        .replace(/\{\{field7\}\}/g, fields.field7 ? wrap(fields.field7) : '<span style="color:#aaa">___</span>')
        .replace(/\n/g, "<br>")

    const bodyRef = useRef(null)
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.innerHTML = previewHTML
    }, [previewHTML])

    const name = (userInfo?.name || 'VOTRE NOM').toUpperCase()
    const email = userInfo?.email || 'votre@email.com'
    const phone = userInfo?.phone || '+33 X XX XX XX XX'
    const address = userInfo?.address || 'Votre adresse'

    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h2 className="text-gray-800 mb-5 text-xl font-bold">Aperçu de la lettre</h2>

            <div id="letterPreview" className="bg-white border border-gray-300 rounded-lg relative flex max-w-[520px] mx-auto w-full">

                <div className="w-[150px] bg-[#2c7348] pt-20 px-2 pb-5 shrink-0 order-2">
                    <div className="flex flex-col gap-6">
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">EMAIL</strong>
                            <p className="text-[8px] leading-tight break-words">{email}</p>
                        </div>
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">TÉLÉPHONE</strong>
                            <p className="text-[8px] leading-tight">{phone}</p>
                        </div>
                        <div className="text-white">
                            <strong className="block text-[9px] mb-1 font-bold">ADRESSE</strong>
                            <p className="text-[8px] leading-tight">{address}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 order-1">
                    <div className="bg-[#296b3f] py-10 px-8 text-white">
                        <h3 className="text-white text-xl m-0 font-bold">{name}</h3>
                    </div>
                    {!templateContent && (
                        <p className="p-8 text-gray-400 text-sm italic">
                            Rédigez votre modèle dans l'éditeur pour voir l'aperçu ici.
                        </p>
                    )}
                    <div id="editableBody" ref={bodyRef}
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        className="letter-body p-8 leading-relaxed text-gray-800"
                        style={{ fontSize: (fontSize || 11) + 'px', display: templateContent ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default GuestLetterPreview
