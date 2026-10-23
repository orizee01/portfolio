import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { SITE } from '../config'
import { API_URL, adminFetch, useAdmin } from '../lib/admin'

const PUBLIC_PROFILE_IMAGE = null
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_BYTES = 5 * 1024 * 1024

export default function Hero() {
  const [imageSrc, setImageSrc] = useState(PUBLIC_PROFILE_IMAGE)
  const [activeRole, setActiveRole] = useState(0)
  const [busy, setBusy] = useState('') // '' or a status label such as 'Uploading…'
  const [uploadError, setUploadError] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef(null)
  // Photo controls are shown only to a logged-in admin (the backend enforces it too).
  const { admin: isAdmin } = useAdmin()

  const roles = ['Backend Engineer', 'Platform Engineer']

  // The profile photo is served by the backend so every visitor sees it.
  useEffect(() => {
    fetch(`${API_URL}/api/profile-image`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data && data.url) setImageSrc(data.url)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole(prev => (prev + 1) % roles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (file) uploadFile(file)
  }

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files && e.dataTransfer.files[0]
    if (file && !busy) uploadFile(file)
  }

  async function uploadFile(file) {
    // Same rules as the backend, checked here so mistakes show up instantly.
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadError('Use a JPG, PNG, WebP or GIF image.')
      return
    }
    if (file.size > MAX_BYTES) {
      setUploadError('Image must be 5MB or smaller.')
      return
    }
    setBusy('Uploading…')
    setUploadError('')
    try {
      const body = new FormData()
      body.append('image', file)
      const data = await adminFetch('/api/upload?folder=profile', { method: 'POST', body })
      setImageSrc(data.url)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy('')
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function clearImage() {
    if (!window.confirm('Remove your profile photo?')) return
    setBusy('Removing…')
    setUploadError('')
    try {
      await adminFetch('/api/profile-image', { method: 'DELETE' })
      setImageSrc(PUBLIC_PROFILE_IMAGE)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <section id="hero" className="py-24 relative">
      <style>{`
        html { scroll-behavior: smooth; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(600px 400px at 10% 10%, rgba(124,58,237,0.16), transparent 10%), radial-gradient(500px 300px at 85% 80%, rgba(59,130,246,0.12), transparent 12%), linear-gradient(180deg, var(--hero-layer), transparent); pointer-events: none; z-index: -1; filter: blur(36px); }
        .cta-primary { background: linear-gradient(90deg,#34d399,#06b6d4 60%); color: #061226; box-shadow: 0 12px 36px rgba(6,182,212,0.16); }
        .cta-secondary { border: 1px solid var(--border-strong); backdrop-filter: blur(8px); background: var(--surface-strong); }
        .cta-ghost { border: 1px solid var(--border-strong); background: color-mix(in srgb, var(--surface-strong) 70%, transparent); color: var(--text-strong); }
        .photo-frame { transition: transform .6s cubic-bezier(.2,.9,.2,1), box-shadow .3s; }
        .photo-frame:hover { transform: translateY(-8px) rotate(-1deg); box-shadow: 0 40px 90px rgba(2,6,23,0.72); }
        .orb { animation: floatOrb 6s ease-in-out infinite; will-change: transform; }
        .orb.slow { animation-duration: 10s; }
        @keyframes floatOrb { 0% { transform: translateY(0) } 50% { transform: translateY(-18px) } 100% { transform: translateY(0) } }
        .accent-text { display: inline-block; animation: accentBounce 1.1s ease-out both; }
        @keyframes accentBounce { 0% { opacity: 0; transform: translateY(-12px) skewY(-3deg); }
          40% { opacity: 1; transform: translateY(2px) skewY(1deg); }
          70% { transform: translateY(-2px) skewY(-1deg); }
          100% { transform: translateY(0) skewY(0); } }
        .role-rotate { display: inline-block; min-width: min(380px, 100%); min-height: 1.2em; position: relative; overflow: hidden; }
        .role-rotate span { display: none; opacity: 0; position: absolute; left: 0; width: 100%; white-space: nowrap; animation: roleSlideOut 0.5s ease-in-out forwards; }
        .role-rotate span.active { display: inline-block; position: relative; animation: roleSlideIn 0.5s ease-in-out forwards; }
        @keyframes roleSlideIn { 
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes roleSlideOut { 
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); }
        }
      `}</style>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="hero-bg" />

        <div>
          <Reveal>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight">
              <span className="accent-text">Oreoluwa Ogunneye</span>
              <span className="theme-heading block text-4xl md:text-5xl lg:text-6xl mt-3">
                <span className="role-rotate">
                  <span className={activeRole === 0 ? 'active' : ''}>Backend Engineer</span>
                  <span className={activeRole === 1 ? 'active' : ''}>Platform Engineer</span>
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={80} className="mb-6 max-w-2xl">
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--hero-copy)' }}>
              Building resilient systems at the intersection of backend engineering, platform reliability, and cloud-native infrastructure.
            </p>
          </Reveal>

          <Reveal delay={120} className="mb-8 grid gap-3 sm:grid-cols-3 max-w-3xl">
            <div className="theme-panel rounded-2xl px-4 py-3">
              <p className="theme-heading text-2xl font-semibold">50%+</p>
              <p className="text-sm" style={{ color: 'var(--hero-stat)' }}>Response Time Reduction</p>
            </div>
            <div className="theme-panel rounded-2xl px-4 py-3">
              <p className="theme-heading text-2xl font-semibold">Millions</p>
              <p className="text-sm" style={{ color: 'var(--hero-stat)' }}>Users Served</p>
            </div>
            <div className="theme-panel rounded-2xl px-4 py-3">
              <p className="theme-heading text-2xl font-semibold">5 Years</p>
              <p className="text-sm" style={{ color: 'var(--hero-stat)' }}>Experience</p>
            </div>
          </Reveal>

          <Reveal delay={160} className="flex flex-wrap gap-4">
            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium shadow btn-animated cta-primary" href="#projects">View Work</a>
            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-animated cta-secondary" href="mailto:gifttee2004@gmail.com">Get In Touch</a>
            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-animated cta-ghost" href="/CV.pdf">Download CV</a>
          </Reveal>
        </div>

        <div className="flex justify-center">
          <Reveal delay={240} className="flex justify-center">
            <div className="relative">
              <svg className="absolute -left-8 -top-8 w-24 h-24 opacity-30 orb slow" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g1" x1="0" x2="1"><stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"/><stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#g1)" />
              </svg>

              <svg className="absolute -right-8 bottom-0 w-20 h-20 opacity-20 orb" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="g2" x1="0" x2="1"><stop offset="0%" stopColor="#06b6d4" stopOpacity="0.22"/><stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02"/></linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" fill="url(#g2)" />
              </svg>

              <div
                {...(isAdmin && {
                  onDragOver: e => { e.preventDefault(); setDragging(true) },
                  onDragLeave: () => setDragging(false),
                  onDrop: handleDrop,
                })}
                className="theme-panel-solid relative w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-[36px] shadow-[0_40px_120px_rgba(15,23,42,0.28)] overflow-hidden flex items-center justify-center photo-animate photo-frame border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/10" />
                {isAdmin && (
                  <input ref={fileRef} onChange={handleFile} accept={ACCEPTED_TYPES.join(',')} type="file" className="hidden" />
                )}

                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Oreoluwa Ogunneye"
                    className="object-cover w-full h-full"
                    onError={() => setImageSrc(null)}
                  />
                ) : isAdmin ? (
                  // Admin, no photo yet: the whole frame is the upload target.
                  <button
                    type="button"
                    onClick={() => fileRef.current && fileRef.current.click()}
                    disabled={!!busy}
                    className="absolute inset-3 flex flex-col items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-emerald-400/40 px-6 text-center transition hover:border-emerald-400/80 hover:bg-emerald-400/5"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20">
                      <UploadIcon className="h-7 w-7" />
                    </span>
                    <span className="theme-heading text-xl font-semibold">Upload a profile photo</span>
                    <span className="theme-muted text-sm">Click or drag an image here</span>
                    <span className="theme-soft text-xs">JPG, PNG, WebP or GIF · up to 5MB</span>
                  </button>
                ) : (
                  // Visitors, no photo yet: a neutral monogram instead of upload instructions.
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="accent-text select-none text-8xl font-extrabold tracking-tight opacity-90">OO</span>
                  </div>
                )}

                {isAdmin && dragging && (
                  <div className="pointer-events-none absolute inset-3 flex items-center justify-center rounded-[28px] border-2 border-dashed border-emerald-400 bg-slate-950/70 text-lg font-semibold text-white backdrop-blur-sm">
                    Drop to upload
                  </div>
                )}

                {busy && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/60 text-white backdrop-blur-sm" role="status">
                    <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-emerald-400" />
                    <span className="text-sm font-medium">{busy}</span>
                  </div>
                )}

                {isAdmin && uploadError && (
                  <div className="absolute inset-x-4 top-4 flex items-start gap-2 rounded-2xl bg-rose-500/90 px-4 py-2.5 text-sm text-white shadow-lg" role="alert">
                    <span className="flex-1">{uploadError}</span>
                    <button type="button" onClick={() => setUploadError('')} aria-label="Dismiss error" className="font-bold leading-none opacity-80 hover:opacity-100">×</button>
                  </div>
                )}

                {isAdmin && imageSrc && !busy && (
                  <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2 px-4">
                    <button
                      type="button"
                      onClick={() => fileRef.current && fileRef.current.click()}
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 shadow-lg transition hover:bg-emerald-300"
                    >
                      <UploadIcon className="h-4 w-4" />
                      Change photo
                    </button>
                    <button
                      type="button"
                      onClick={clearImage}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-slate-950/80"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function UploadIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 16V4m0 0l-4 4m4-4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
