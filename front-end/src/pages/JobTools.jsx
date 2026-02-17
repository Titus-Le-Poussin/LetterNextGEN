import { useState } from 'react'
import Header from '../components/Header'
import OfferSection from '../components/OfferSection'
import EditorSection from '../components/EditorSection'
import PreviewSection from '../components/PreviewSection'


function JobTools(){
    const [showOffer, setShowOffer] = useState(true)
    const [showEditor, setShowEditor] = useState(true)
    const [showPreview, setShowPreview] = useState(true)

    return(
        <div className="font-sans bg-gradient-to-br from-[#288653] to-[#3b6b49] min-h-screen p-5">
            <div className="container mx-auto">
                <Header
                    showOffer={showOffer}
                    showEditor={showEditor}
                    showPreview={showPreview}
                    setShowOffer={setShowOffer}
                    setShowEditor={setShowEditor}
                    setShowPreview={setShowPreview}
                />
                <div className="flex flex-wrap gap-8 w-full p-2 max-lg:flex-col">
                    <div className={`flex-1 min-w-[400px] max-lg:min-w-0 max-lg:w-[90%] max-lg:mx-auto ${showOffer ? '' : 'hidden'}`}><OfferSection /></div>
                    <div className={`flex-1 min-w-[400px] max-lg:min-w-0 max-lg:w-[90%] max-lg:mx-auto ${showEditor ? '' : 'hidden'}`}><EditorSection /></div>
                    <div className={`flex-1 min-w-[400px] max-lg:min-w-0 max-lg:w-[90%] max-lg:mx-auto ${showPreview ? '' : 'hidden'}`}><PreviewSection /></div>
                </div>
            </div>
        </div>
    )
}

export default JobTools
