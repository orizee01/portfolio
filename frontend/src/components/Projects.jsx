import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { API_URL, IMAGE_TYPES, adminFetch, imageProblem, useAdmin } from '../lib/admin'

// `id` names the project's picture on the backend; keep it stable once pictures are uploaded.
// `img` is the default picture, shown until the admin uploads one.
const sampleProjects = [
  {
    id: 'eightmedical',
    title: 'EightMedical',
    desc: 'Delivered the backend for an emergency care platform, improving booking accuracy, reducing triage time, and enabling real-time patient updates for ambulance and urgent care requests.',
    stack: 'TypeScript • Node.js • PostgreSQL • AWS',
    link: '#',
    img: '/Screenshot%202026-07-21%20at%2010.42.27%E2%80%AFAM.png'
  },
  {
    id: 'ai-directory',
    title: 'AI Directory',
    desc: 'Built the backend infrastructure for an AI tools marketplace with secure accounts, content workflows, Stripe payments, and scalable background processing.',
    stack: 'Node.js • PostgreSQL • Stripe • Redis',
    link: '#',
    img: '/Coming%20soon.png'
  },
  {
    id: 'paysmosmo',
    title: 'Paysmosmo Backend API',
    desc: 'Implemented a scalable e-commerce backend API with authentication, order orchestration, payment handling, and reliable data sync across services.',
    stack: 'TypeScript • Node.js • PostgreSQL • TypeORM',
    link: '#',
    img: '/case.avif'
  }
]

function ProjectCard({ project, uploadedImg, isAdmin, onChange }) {
  const [busy, setBusy] = useState('') // '' or a status label
  const [error, setError] = useState('')
  const fileRef = useRef(null)
  const img = uploadedImg || project.img

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (fileRef.current) fileRef.current.value = ''
    if (!file) return
    const problem = imageProblem(file)
    if (problem) return setError(problem)

    setBusy('Uploading…')
    setError('')
    try {
      const body = new FormData()
      body.append('image', file)
      const data = await adminFetch(`/api/upload?project=${project.id}`, { method: 'POST', body })
      onChange(project.id, data.url)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  async function useDefault() {
    if (!window.confirm(`Go back to the default picture for ${project.title}?`)) return
    setBusy('Removing…')
    setError('')
    try {
      await adminFetch(`/api/project-images/${project.id}`, { method: 'DELETE' })
      onChange(project.id, null)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <article className="card card-top-accent hover:scale-[1.03] transform transition-all duration-300">
      <div className="h-40 rounded-lg mb-4 overflow-hidden relative">
        {img ? (
          <img src={img} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="h-full bg-gradient-to-tr from-indigo-600 via-pink-600 to-rose-500" />
        )}
        <div className="absolute inset-x-0 bottom-0 text-white font-semibold bg-black/20 px-3 py-1">{project.title}</div>

        {isAdmin && (
          <>
            <input ref={fileRef} type="file" accept={IMAGE_TYPES.join(',')} onChange={handleFile} className="hidden" />
            {!busy && (
              <div className="absolute right-2 top-2 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => fileRef.current && fileRef.current.click()}
                  className="rounded-full bg-emerald-400 px-3 py-1.5 text-xs font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-300"
                >
                  Change picture
                </button>
                {uploadedImg && (
                  <button
                    type="button"
                    onClick={useDefault}
                    className="rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md transition hover:bg-slate-950/80"
                  >
                    Use default
                  </button>
                )}
              </div>
            )}
            {busy && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-slate-950/60 text-sm font-medium text-white backdrop-blur-sm" role="status">
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-emerald-400" />
                {busy}
              </div>
            )}
          </>
        )}
      </div>
      {isAdmin && error && (
        <p className="mb-3 flex items-start gap-2 rounded-lg bg-rose-500/90 px-3 py-2 text-xs text-white" role="alert">
          <span className="flex-1">{error}</span>
          <button type="button" onClick={() => setError('')} aria-label="Dismiss error" className="font-bold leading-none">×</button>
        </p>
      )}
      <div className="theme-soft mb-3 text-sm">{project.stack}</div>
      <p className="theme-muted text-sm mb-4">{project.desc}</p>
      <a href={project.link} className="text-emerald-400 text-sm font-medium">View project →</a>
    </article>
  )
}

export default function Projects() {
  const { admin: isAdmin } = useAdmin()
  // Pictures uploaded by the admin, by project id; projects without one use their default `img`.
  const [uploaded, setUploaded] = useState({})

  useEffect(() => {
    const ids = sampleProjects.map(p => p.id).join(',')
    fetch(`${API_URL}/api/project-images?ids=${ids}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.images) setUploaded(data.images)
      })
      .catch(() => {})
  }, [])

  function handleChange(id, url) {
    setUploaded(prev => {
      const next = { ...prev }
      if (url) next[id] = url
      else delete next[id]
      return next
    })
  }

  return (
    <section id="projects" className="py-16">
      <Reveal>
        <h2 className="theme-heading text-3xl font-bold mb-6">Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {sampleProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 80} className="">
            <ProjectCard project={p} uploadedImg={uploaded[p.id]} isAdmin={isAdmin} onChange={handleChange} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
