const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config()

const authRoutes = require('./routes/auth.routes')
const aiRoutes = require('./routes/ai.routes') 
const promptRoutes = require('./routes/prompts.routes')
const skillsRoutes = require('./routes/skills.routes')
const letterGenRoutes = require('./routes/letter_generated.routes')
const letterTemRoutes = require('./routes/letter_template.routes')
const resumeGenRoutes = require('./routes/resume_generated.routes')
const resumeTemRoutes = require('./routes/resume_template.routes')
const errorMiddleware = require('./middleware/error.middleware')

const app = express();

var corsOptions = {
  origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/prompts', promptRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/letter-generated', letterGenRoutes)
app.use('/api/letter-template', letterTemRoutes)
app.use('/api/resume-generated', resumeGenRoutes)
app.use('/api/resume-template', resumeTemRoutes)

app.get("/", (req, res) => {
  res.json({ message: "Hello from Backend" });
});

app.use(errorMiddleware)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
