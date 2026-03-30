import { useState } from 'react'
import Header from '../components/Header'
import LetterOffer from '../components/LetterOffer'
import LetterEditor from '../components/LetterEditor'
import LetterPreview from '../components/LetterPreview'
import LetterTemplate from '../components/LetterTemplate'
import CVTemplate from '../components/CVTemplate'
import CVPreview from '../components/CVPreview'


function JobTools(){
    const [showLetterTemplate, setShowLetterTemplate] = useState(true)
    const [showLetterOffer, setShowLetterOffer] = useState(true)
    const [showLetterEditor, setShowLetterEditor] = useState(true)
    const [showCVTemplate, setShowCVTemplate] = useState(true)
    const [showCVEditor, setShowCVEditor] = useState(true)
    const [showLetterPreview, setShowLetterPreview] = useState(true)
    const [showCVPreview, setShowCVPreview] = useState(true)
    const [templateContent, setTemplateContent] = useState("")
    const [fontSize, setFontSize] = useState(11)
    const [fields, setFields] = useState({ field1: "",  field2: "", field3: "", field4: "", field5: "", field6: "", field7: "" })  

    return(
        <div className="font-sans bg-gradient-to-br from-[#288653] to-[#3b6b49] min-h-screen p-5">
            <div className="container mx-auto">
                <Header
                    showLetterTemplate={showLetterTemplate}
                    setShowLetterTemplate={setShowLetterTemplate}
                    showLetterOffer={showLetterOffer}
                    setShowLetterOffer={setShowLetterOffer}
                    showLetterEditor={showLetterEditor}
                    setShowLetterEditor={setShowLetterEditor}
                    showCVTemplate={showCVTemplate}
                    setShowCVTemplate={setShowCVTemplate}
                    showCVEditor={showCVEditor}
                    setShowCVEditor={setShowCVEditor}
                    showLetterPreview={showLetterPreview}
                    setShowLetterPreview={setShowLetterPreview}
                    showCVPreview={showCVPreview}
                    setShowCVPreview={setShowCVPreview}
                    
                    
                />
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-start-1 flex flex-col gap-5">
                        {showLetterTemplate && <LetterTemplate />}
                        {showLetterOffer && <LetterOffer onResult={setFields} />}
                        {showLetterEditor && <LetterEditor 
                        fields={fields} 
                        templateContent={templateContent} 
                        onTemplateSelect={setTemplateContent} 
                        onFieldsChange={setFields} 
                        onFontSizeChange={setFontSize} />}
                        {showCVTemplate && <CVTemplate />}
                        {showCVEditor && <div>CVEditor (à créer)</div>}
                    </div>
                    <div className="col-start-2 flex flex-col gap-5">
                        {showLetterPreview && <LetterPreview 
                        fields={fields} 
                        templateContent={templateContent} 
                        fontSize={fontSize} />}
                        {showCVPreview && <CVPreview />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobTools
