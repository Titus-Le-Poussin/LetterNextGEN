
const analyzeLetter = async (req, res) => {
    try {
      const { job_offer, prompt } = req.body

    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(prompt + "\n\n" + job_offer)
    const text = result.response.text()
    const parsed = JSON.parse(text)                                                          
    res.json(parsed)  

    } catch (erreurGemini) {
      try {
        const Anthropic = require('@anthropic-ai/sdk')
        const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })
        const message = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt + "\n\n" + job_offer }]
        })
        const parsed = JSON.parse(message.content[0].text)
        res.json(parsed)
        } catch (erreurClaude) {
        res.status(503).json({ error: 'Les deux APIs sont indisponibles' })
      }
    }
  }



const analyzeResume = async (req, res) => {
    try {
      const { job_offer, prompt } = req.body
      const SkillsModel = require('../models/skills.model')
      const skillsResult = await SkillsModel.getByUser(req.user.id)
      const skills = skillsResult.rows
      const fullPrompt = prompt + "\n\nSkills du candidat:\n" + JSON.stringify(skills) + "\n\nOffre d'emploi :\n" + job_offer

    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const result = await model.generateContent(fullPrompt)
    const text = result.response.text()
    const parsed = JSON.parse(text)
    res.json(parsed)

    } catch (erreurGemini) {
      try {
        const { job_offer, prompt } = req.body
        const SkillsModel = require('../models/skills.model')
        const skillsResult = await SkillsModel.getByUser(req.user.id)
        const skills = skillsResult.rows
        const fullPrompt = prompt + "\n\nSkills du candidat:\n" + JSON.stringify(skills) + "\n\nOffre d'emploi :\n" + job_offer
        const Anthropic = require('@anthropic-ai/sdk')
        const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })
        const message = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            messages: [{ role: "user", content: fullPrompt }]
        })
        const parsed = JSON.parse(message.content[0].text)
        res.json(parsed)
        } catch (erreurClaude) {
        res.status(503).json({ error: 'Les deux APIs sont indisponibles' })
      }
    }
  }

  module.exports = { analyzeLetter, analyzeResume }
