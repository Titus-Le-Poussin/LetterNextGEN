
const analyzeLetter = async (req, res) => {
  const { job_offer, prompt_content } = req.body
    try {
    const prompt = prompt_content
    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" })
    const result = await model.generateContent(prompt + "\n\n" + job_offer)
    const text = result.response.text().replace(/```json\n?/g, '').replace(/```/g, '').trim()
    const parsed = JSON.parse(text)
    res.json(parsed)

    } catch (erreurGemini) {
      console.error('Gemini error:', erreurGemini)
      try {
        const prompt = prompt_content
        const Anthropic = require('@anthropic-ai/sdk')
        const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY })
        const message = await client.messages.create({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            messages: [{ role: "user", content: prompt + "\n\n" + job_offer }]
        })
        const parsed = JSON.parse(message.content[0].text.replace(/```json\n?/g, '').replace(/```/g, '').trim())
        res.json(parsed)
        } catch (erreurClaude) {
        console.error('Claude error:', erreurClaude)
        res.status(503).json({ error: 'Les deux APIs sont indisponibles' })
      }
    }
  }



const analyzeResume = async (req, res) => {
  const { job_offer, prompt_id } = req.body
    try {
      const PromptModel = require('../models/prompt.model')
      const promptResult = await PromptModel.getById(prompt_id)
      const prompt = promptResult.rows[0].content

      
      const SkillsModel = require('../models/skills.model')
      const skillsResult = await SkillsModel.getByUser(req.user.id)
      const skills = skillsResult.rows
      const fullPrompt = prompt + "\n\nSkills du candidat:\n" + JSON.stringify(skills) + "\n\nOffre d'emploi :\n" + job_offer

    const { GoogleGenerativeAI } = require('@google/generative-ai')
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" })
    const result = await model.generateContent(fullPrompt)
    const text = result.response.text().replace(/```json\n?/g, '').replace(/```/g, '').trim()
    const parsed = JSON.parse(text)
    res.json(parsed)

    } catch (erreurGemini) {
      try {
        const PromptModel = require('../models/prompt.model')
        const promptResult = await PromptModel.getById(prompt_id)
        const prompt = promptResult.rows[0].content

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
        const parsed = JSON.parse(message.content[0].text.replace(/```json\n?/g, '').replace(/```/g, '').trim())
        res.json(parsed)
        } catch (erreurClaude) {
        res.status(503).json({ error: 'Les deux APIs sont indisponibles' })
      }
    }
  }

  module.exports = { analyzeLetter, analyzeResume }
