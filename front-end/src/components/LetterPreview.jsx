import { useRef, useEffect } from 'react'
function LetterPreview({ fields, templateContent, fontSize }) {
    const wrap = (val) => `<span class="dynamic-field">${val}</span>`
    const previewHTML = (templateContent || "")
      .replace(/\{\{field1\}\}/g, fields.field1 ? wrap(fields.field1) : "")
      .replace(/\{\{field2\}\}/g, fields.field2 ? wrap(fields.field2) : "")
      .replace(/\{\{field3\}\}/g, fields.field3 ? wrap(fields.field3) : "")
      .replace(/\{\{field4\}\}/g, fields.field4 ? wrap(fields.field4) : "")
      .replace(/\{\{field5\}\}/g, fields.field5 ? wrap(fields.field5) : "")
      .replace(/\{\{field6\}\}/g, fields.field6 ? wrap(fields.field6) : "")
      .replace(/\{\{field7\}\}/g, fields.field7 ? wrap(fields.field7) : "")
      .replace(/\n/g, "<br>")
    const bodyRef = useRef(null)                        
        useEffect(() => {                                   
        if (bodyRef.current) bodyRef.current.innerHTML = previewHTML }, [previewHTML])  
    return (
        <div className="bg-white p-4 rounded-2xl shadow-xl">
            <h2 className="text-gray-800 mb-5 text-xl font-bold">Apercu de la lettre</h2>

            <div id="letterPreview" className="bg-white border border-gray-300 rounded-lg relative flex max-w-[520px] mx-auto w-full">
                
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

                
                <div className="flex-1 order-1">
                    <div className="bg-[#296b3f] py-10 px-8 text-white">
                        <h3 className="text-white text-xl m-0 font-bold">TIMOTHEE ITHIER</h3>
                    </div>
                    <div id="editableBody" ref={bodyRef}
                        contentEditable={true}                              
                        suppressContentEditableWarning={true}
                        className="letter-body p-8 leading-relaxed          
                        text-gray-800" style={{ fontSize: (fontSize || 11) +
                        'px' }} /> 
                    </div>
            </div>
        </div>
    )
}

export default LetterPreview
