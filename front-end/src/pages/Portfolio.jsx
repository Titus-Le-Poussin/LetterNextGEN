import { useState, useEffect, useContext, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import * as ps from '../services/portfolio.service'

// ─── Utility ────────────────────────────────────────────────────────────────

function toArray(val) {
  if (!val) return []
  if (Array.isArray(val)) return val
  return String(val).split(',').map(s => s.trim()).filter(Boolean)
}

// ─── Modal wrapper ───────────────────────────────────────────────────────────

function Modal({ title, onClose, onSave, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-2xl leading-none">×</button>
        </div>
        {children}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors">Annuler</button>
          <button onClick={onSave} className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors">Sauvegarder</button>
        </div>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, type = 'text', rows }) {
  const cls = "w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-green-500 text-sm"
  return (
    <div className="flex flex-col gap-1">
      <label className="text-zinc-400 text-xs font-medium">{label}</label>
      {rows
        ? <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className={cls} />
        : type === 'checkbox'
          ? <input type="checkbox" checked={value} onChange={e => onChange(e.target.checked)} className="w-4 h-4 accent-green-500" />
          : <input type={type} value={value} onChange={e => onChange(e.target.value)} className={cls} />
      }
    </div>
  )
}

// ─── Project form ────────────────────────────────────────────────────────────

function ProjectModal({ initial, onClose, onSaved, token }) {
  const blank = { title: '', short_desc: '', description: '', tech_stack: '', media_url: '', media_type: 'image', github_url: '', demo_url: '', order_index: 0, visible: true }
  const [f, setF] = useState(initial ? { ...initial, tech_stack: toArray(initial.tech_stack).join(', ') } : blank)
  const set = k => v => setF(p => ({ ...p, [k]: v }))

  const save = async () => {
    const payload = { ...f, tech_stack: toArray(f.tech_stack), order_index: Number(f.order_index) }
    let result
    if (f.id) result = await ps.updateProject(f.id, payload, token)
    else result = await ps.createProject(payload, token)
    onSaved(result)
    onClose()
  }

  return (
    <Modal title={f.id ? 'Modifier le projet' : 'Nouveau projet'} onClose={onClose} onSave={save}>
      <div className="grid grid-cols-1 gap-4">
        <Field label="Titre *" value={f.title} onChange={set('title')} />
        <Field label="Description courte" value={f.short_desc} onChange={set('short_desc')} rows={2} />
        <Field label="Description complète" value={f.description} onChange={set('description')} rows={4} />
        <Field label="Technologies (séparées par des virgules)" value={f.tech_stack} onChange={set('tech_stack')} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="URL média (image ou vidéo)" value={f.media_url} onChange={set('media_url')} />
          <div className="flex flex-col gap-1">
            <label className="text-zinc-400 text-xs font-medium">Type de média</label>
            <select value={f.media_type} onChange={e => set('media_type')(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500">
              <option value="image">Image</option>
              <option value="video">Vidéo</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Lien GitHub" value={f.github_url} onChange={set('github_url')} />
          <Field label="Lien demo / doc" value={f.demo_url} onChange={set('demo_url')} />
        </div>
        <div className="grid grid-cols-2 gap-4 items-end">
          <Field label="Ordre d'affichage" value={f.order_index} onChange={set('order_index')} type="number" />
          <div className="flex items-center gap-2 pb-1">
            <Field label="Visible" value={f.visible} onChange={set('visible')} type="checkbox" />
            <span className="text-zinc-400 text-sm">Visible publiquement</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// ─── Experience form ─────────────────────────────────────────────────────────

function ExpModal({ initial, onClose, onSaved, token }) {
  const blank = { company: '', role: '', period: '', description: '', tech_stack: '', is_current: false, order_index: 0 }
  const [f, setF] = useState(initial ? { ...initial, tech_stack: toArray(initial.tech_stack).join(', ') } : blank)
  const set = k => v => setF(p => ({ ...p, [k]: v }))

  const save = async () => {
    const payload = { ...f, tech_stack: toArray(f.tech_stack), order_index: Number(f.order_index) }
    let result
    if (f.id) result = await ps.updateExperience(f.id, payload, token)
    else result = await ps.createExperience(payload, token)
    onSaved(result)
    onClose()
  }

  return (
    <Modal title={f.id ? "Modifier l'expérience" : 'Nouvelle expérience'} onClose={onClose} onSave={save}>
      <div className="grid grid-cols-1 gap-4">
        <Field label="Entreprise / École *" value={f.company} onChange={set('company')} />
        <Field label="Rôle / Titre" value={f.role} onChange={set('role')} />
        <Field label="Période (ex: Sept. 2023 → 2026)" value={f.period} onChange={set('period')} />
        <Field label="Description" value={f.description} onChange={set('description')} rows={3} />
        <Field label="Compétences (séparées par des virgules)" value={f.tech_stack} onChange={set('tech_stack')} />
        <div className="flex items-center gap-3">
          <Field label="En cours" value={f.is_current} onChange={set('is_current')} type="checkbox" />
          <span className="text-zinc-400 text-sm">Poste actuel</span>
        </div>
        <Field label="Ordre d'affichage" value={f.order_index} onChange={set('order_index')} type="number" />
      </div>
    </Modal>
  )
}

// ─── About form ──────────────────────────────────────────────────────────────

function AboutModal({ initial, onClose, onSaved, token }) {
  const [f, setF] = useState(initial || { bio: '', title: '', phone: '', email: '', age: '', languages: '' })
  const set = k => v => setF(p => ({ ...p, [k]: v }))

  const save = async () => {
    const result = await ps.updateAbout(f, token)
    onSaved(result)
    onClose()
  }

  return (
    <Modal title="Modifier les infos" onClose={onClose} onSave={save}>
      <div className="grid grid-cols-1 gap-4">
        <Field label="Bio" value={f.bio} onChange={set('bio')} rows={3} />
        <Field label="Titre affiché" value={f.title} onChange={set('title')} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Téléphone" value={f.phone} onChange={set('phone')} />
          <Field label="Email" value={f.email} onChange={set('email')} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Âge" value={f.age} onChange={set('age')} type="number" />
          <Field label="Langues" value={f.languages} onChange={set('languages')} />
        </div>
      </div>
    </Modal>
  )
}

// ─── Admin button ── deux états seulement ────────────────────────────────────

function AdminFAB({ editMode, onLogout, onGoLogin }) {
  if (editMode) {
    return (
      <button onClick={onLogout}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-xl text-sm bg-green-500 text-white ring-2 ring-green-300/50 transition-all">
        <span>✏</span>
        <span>Quitter l'édition</span>
      </button>
    )
  }
  return (
    <button onClick={onGoLogin}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full font-semibold shadow-xl text-sm bg-zinc-900 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-zinc-700/50 transition-all">
      <span>🔐</span>
      <span>Admin</span>
    </button>
  )
}

function EditBtn({ onClick }) {
  return (
    <button onClick={onClick}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-700/80 hover:bg-green-600 text-zinc-200 hover:text-white text-xs font-medium transition-colors border border-zinc-600 hover:border-green-500">
      ✏ Modifier
    </button>
  )
}

function DeleteBtn({ onClick }) {
  return (
    <button onClick={e => { e.stopPropagation(); if (window.confirm('Supprimer ?')) onClick() }}
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-700/80 hover:bg-red-600 text-zinc-200 hover:text-white text-xs font-medium transition-colors border border-zinc-600 hover:border-red-500">
      🗑 Supprimer
    </button>
  )
}

function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-green-600 text-green-400 hover:bg-green-600/10 text-sm font-medium transition-colors mt-4">
      + {label}
    </button>
  )
}

// ─── Category color map ──────────────────────────────────────────────────────

const categoryColor = {
  'Développement': 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  'Data & IA': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  'Outils': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
  'Autres Compétences': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  'En apprentissage': 'bg-green-500/10 text-green-400 border-green-500/20',
}
const defaultCategoryColor = 'bg-zinc-600/20 text-zinc-300 border-zinc-600/30'

// ─── Main component ──────────────────────────────────────────────────────────

function Portfolio() {
  const { token, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const isAdmin = !!token

  const [about, setAbout] = useState(null)
  const [projects, setProjects] = useState([])
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState({})
  const [loading, setLoading] = useState(true)

  // editMode s'active automatiquement si on revient du login avec le flag
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (location.state?.editMode && token) {
      setEditMode(true)
    }
  }, [])
  const [projectModal, setProjectModal] = useState(null)
  const [expModal, setExpModal] = useState(null)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('')
  const sectionsRef = useRef({})

  useEffect(() => {
    load()
  }, [token])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
    }, { threshold: 0.4 })
    Object.values(sectionsRef.current).forEach(el => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [loading])

  async function load() {
    try {
      const [aboutData, projectsData, expsData, skillsData] = await Promise.all([
        ps.getAbout(),
        isAdmin ? ps.getProjectsAdmin(token) : ps.getProjects(),
        ps.getExperiences(),
        ps.getSkills()
      ])
      setAbout(aboutData)
      setProjects(Array.isArray(projectsData) ? projectsData : [])
      setExperiences(Array.isArray(expsData) ? expsData : [])
      setSkills(skillsData || {})
    } finally {
      setLoading(false)
    }
  }

  const handleProjectSaved = (saved) => {
    if (!saved || saved.error || !saved.id) return
    setProjects(prev => {
      const exists = prev.find(p => p.id === saved.id)
      if (exists) return prev.map(p => p.id === saved.id ? saved : p)
      return [...prev, saved].sort((a, b) => a.order_index - b.order_index)
    })
  }

  const handleProjectDeleted = async (id) => {
    await ps.deleteProject(id, token)
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  const handleExpSaved = (saved) => {
    if (!saved || saved.error || !saved.id) return
    setExperiences(prev => {
      const exists = prev.find(e => e.id === saved.id)
      if (exists) return prev.map(e => e.id === saved.id ? saved : e)
      return [...prev, saved].sort((a, b) => a.order_index - b.order_index)
    })
  }

  const handleExpDeleted = async (id) => {
    await ps.deleteExperience(id, token)
    setExperiences(prev => prev.filter(e => e.id !== id))
  }

  const handleAdminLogout = async () => {
    await handleLogout()
    setEditMode(false)
  }

  // Admin FAB redirige TOUJOURS vers login — pas d'activation directe sans auth
  const goToLogin = () => {
    navigate('/login', { state: { returnTo: '/portfolio', editMode: true } })
  }

  const handleAboutSaved = (saved) => setAbout(saved)

  const navLinks = [
    { href: '#projets', label: 'Projets' },
    { href: '#competences', label: 'Compétences' },
    { href: '#experiences', label: 'Expériences' },
    { href: '#contact', label: 'Contact' },
  ]

  const section = (id, children) => (
    <section id={id} ref={el => sectionsRef.current[id] = el}>
      {children}
    </section>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="bg-zinc-950 text-zinc-100 min-h-screen font-sans antialiased">

      {/* ── NAV ──────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-white tracking-tight text-lg">
            Timothée <span className="text-green-400">Ithier</span>
          </span>
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map(l => (
              <li key={l.href}>
                <a href={l.href}
                  className="text-zinc-400 hover:text-white transition-colors font-medium">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <a href="/picture/CV_TimotheITHIER_2026.pdf" download
              className="text-xs px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors">
              CV
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.06)_0%,_transparent_70%)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-green-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Disponible pour une alternance 2026
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-white leading-none tracking-tight mb-4">
            Timothée<br /><span className="text-green-400">Ithier</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-8">
            {about?.title || 'Développeur Full Stack · Data & IA · Infographie 3D'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="#projets" className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors shadow-lg shadow-green-500/20">
              Voir mes projets
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold transition-colors">
              Me contacter
            </a>
            <a href="https://linkedin.com/in/timothée-ithier-570149224" target="_blank" rel="noreferrer"
              className="px-4 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/Titus-Le-Poussin" target="_blank" rel="noreferrer"
              className="px-4 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white transition-colors">
              GitHub
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 flex flex-col items-center gap-1 text-zinc-600 text-xs animate-bounce">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 bg-zinc-900 rounded-2xl p-8 border border-zinc-800">
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-white font-bold text-xl">À propos</h2>
              {editMode && <EditBtn onClick={() => setAboutModalOpen(true)} />}
            </div>
            <p className="text-zinc-300 leading-relaxed text-base">
              {about?.bio || ''}
            </p>
          </div>
          <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 space-y-4">
            {[
              { label: 'Téléphone', value: about?.phone },
              { label: 'Email', value: about?.email },
              { label: 'Âge', value: about?.age ? `${about.age} ans` : null },
              { label: 'Langues', value: about?.languages },
            ].map(({ label, value }) => value ? (
              <div key={label}>
                <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-0.5">{label}</div>
                <div className="text-zinc-200 text-sm">{value}</div>
              </div>
            ) : null)}
            <div className="pt-2">
              <a href="https://linktr.ee/timothee_ithier" target="_blank" rel="noreferrer"
                className="text-green-400 hover:text-green-300 text-sm transition-colors">
                Linktree →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROJECTS ─────────────────────────────────────────────────── */}
      {section('projets',
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-1">Portfolio</p>
              <h2 className="text-white font-black text-4xl">Mes projets</h2>
            </div>
            {editMode && <AddBtn label="Ajouter un projet" onClick={() => setProjectModal({})} />}
          </div>
          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <div key={project.id}
                className={`group bg-zinc-900 rounded-2xl border overflow-hidden transition-all
                  ${project.visible === false ? 'border-yellow-600/40 opacity-60' : 'border-zinc-800 hover:border-zinc-700'}`}>
                <div className="flex flex-col lg:flex-row">
                  {/* Media */}
                  {project.media_url && (
                    <div className={`lg:w-2/5 shrink-0 bg-zinc-800 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                      {project.media_type === 'video'
                        ? <video controls className="w-full h-full object-cover max-h-64 lg:max-h-full">
                            <source src={project.media_url} type="video/mp4" />
                          </video>
                        : <img src={project.media_url} alt={project.title}
                            className="w-full h-full object-cover max-h-64 lg:max-h-full" />
                      }
                    </div>
                  )}
                  {/* Content */}
                  <div className="flex-1 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-white font-bold text-2xl group-hover:text-green-400 transition-colors">
                          {project.title}
                          {project.visible === false && <span className="ml-2 text-xs text-yellow-400 font-normal border border-yellow-600/40 px-2 py-0.5 rounded">Masqué</span>}
                        </h3>
                        {editMode && (
                          <div className="flex gap-2 shrink-0">
                            <EditBtn onClick={() => setProjectModal(project)} />
                            <DeleteBtn onClick={() => handleProjectDeleted(project.id)} />
                          </div>
                        )}
                      </div>
                      {project.short_desc && (
                        <p className="text-zinc-300 mb-4 leading-relaxed">{project.short_desc}</p>
                      )}
                      {project.description && (
                        <p className="text-zinc-400 text-sm mb-5 leading-relaxed">{project.description}</p>
                      )}
                      {toArray(project.tech_stack).length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-5">
                          {toArray(project.tech_stack).map(tag => (
                            <span key={tag} className="px-2.5 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {project.github_url && (
                        <a href={project.github_url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.74-1.33-1.74-1.08-.74.08-.73.08-.73 1.2.09 1.83 1.23 1.83 1.23 1.06 1.82 2.79 1.3 3.47.99.1-.77.41-1.3.75-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z"/>
                          </svg>
                          GitHub
                        </a>
                      )}
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1.5 text-sm bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg transition-colors font-medium">
                          Voir le projet →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── SKILLS ───────────────────────────────────────────────────── */}
      {section('competences',
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-1">Stack</p>
            <h2 className="text-white font-black text-4xl">Compétences</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
                <h3 className="text-white font-semibold text-sm mb-3">{category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(skill => (
                    <span key={skill}
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${categoryColor[category] || defaultCategoryColor}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── EXPERIENCES ──────────────────────────────────────────────── */}
      {section('experiences',
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-1">Parcours</p>
              <h2 className="text-white font-black text-4xl">Expériences</h2>
            </div>
            {editMode && <AddBtn label="Ajouter" onClick={() => setExpModal({})} />}
          </div>
          <div className="relative ml-4">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-800" />
            <div className="flex flex-col gap-8">
              {experiences.map(exp => (
                <div key={exp.id} className="relative pl-8">
                  <div className={`absolute left-0 top-1.5 w-2 h-2 rounded-full -translate-x-[3px] border-2 border-zinc-950
                    ${exp.is_current ? 'bg-green-400' : 'bg-zinc-500'}`} />
                  <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div>
                        <p className="text-zinc-500 text-xs font-medium mb-0.5">{exp.period}</p>
                        <h3 className="text-white font-bold text-lg">{exp.company}</h3>
                        <p className="text-green-400 text-sm font-medium">{exp.role}</p>
                      </div>
                      {editMode && (
                        <div className="flex gap-2 shrink-0">
                          <EditBtn onClick={() => setExpModal(exp)} />
                          <DeleteBtn onClick={() => handleExpDeleted(exp.id)} />
                        </div>
                      )}
                    </div>
                    {exp.description && (
                      <p className="text-zinc-400 text-sm mt-3 leading-relaxed">{exp.description}</p>
                    )}
                    {toArray(exp.tech_stack).length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {toArray(exp.tech_stack).map(tag => (
                          <span key={tag} className="px-2.5 py-0.5 rounded-full bg-zinc-700/60 border border-zinc-600/50 text-zinc-300 text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.is_current && (
                      <span className="inline-block mt-3 text-xs px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                        En cours
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT ──────────────────────────────────────────────────── */}
      {section('contact',
        <footer className="border-t border-zinc-800 mt-12">
          <div className="max-w-6xl mx-auto px-6 py-16 text-center">
            <p className="text-green-400 text-sm font-semibold uppercase tracking-widest mb-2">Contact</p>
            <h2 className="text-white font-black text-4xl mb-4">Travaillons ensemble</h2>
            <p className="text-zinc-400 mb-8 max-w-md mx-auto">
              Je suis disponible pour une alternance sur Lyon et agglomération à partir de 2026.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <a href={`mailto:${about?.email || 'timotheeithier@gmail.com'}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold transition-colors shadow-lg shadow-green-500/20">
                ✉ {about?.email || 'timotheeithier@gmail.com'}
              </a>
              {about?.phone && (
                <a href={`tel:${about.phone}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold transition-colors">
                  📞 {about.phone}
                </a>
              )}
            </div>
            <div className="flex justify-center gap-4 mb-12">
              {[
                { href: 'https://linkedin.com/in/timothée-ithier-570149224', label: 'LinkedIn' },
                { href: 'https://github.com/Titus-Le-Poussin', label: 'GitHub' },
                { href: 'https://linktr.ee/timothee_ithier', label: 'Linktree' },
              ].map(link => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer"
                  className="text-sm text-zinc-500 hover:text-green-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-zinc-700 text-xs">
              © {new Date().getFullYear()} Timothée Ithier
            </p>
          </div>
        </footer>
      )}

      {/* ── ADMIN FAB ─── deux états : spectateur / édition ─────────── */}
      <AdminFAB
        editMode={editMode}
        onLogout={handleAdminLogout}
        onGoLogin={goToLogin}
      />

      {/* ── MODALS ───────────────────────────────────────────────────── */}
      {projectModal !== null && (
        <ProjectModal
          initial={projectModal.id ? projectModal : null}
          onClose={() => setProjectModal(null)}
          onSaved={handleProjectSaved}
          token={token}
        />
      )}
      {expModal !== null && (
        <ExpModal
          initial={expModal.id ? expModal : null}
          onClose={() => setExpModal(null)}
          onSaved={handleExpSaved}
          token={token}
        />
      )}
      {aboutModalOpen && about && (
        <AboutModal
          initial={about}
          onClose={() => setAboutModalOpen(false)}
          onSaved={handleAboutSaved}
          token={token}
        />
      )}
    </div>
  )
}

export default Portfolio
