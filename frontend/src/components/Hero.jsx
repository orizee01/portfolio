import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { SITE } from '../config'

const PUBLIC_PROFILE_IMAGE = null
const API_URL = import.meta.env.VITE_API_URL || ''
// Upload controls are for the site owner: open the page with ?edit in the URL.
const IS_OWNER = new URLSearchParams(window.location.search).has('edit')

export default function Hero() {
  const [imageSrc, setImageSrc] = useState(PUBLIC_PROFILE_IMAGE)
  const [activeRole, setActiveRole] = useState(0)
  const [busy, setBusy] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const fileRef = useRef(null)

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

  function getToken() {
    let token = sessionStorage.getItem('uploadToken')
    if (!token) {
      token = window.prompt('Upload token')
      if (token) sessionStorage.setItem('uploadToken', token)
    }
    return token
  }

  async function callApi(path, options) {
    const token = getToken()
    if (!token) return null
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (response.status === 401) sessionStorage.removeItem('uploadToken')
      throw new Error(data.error || 'Request failed')
    }
    return data
  }

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    setBusy(true)
    setUploadError('')
    try {
      const body = new FormData()
      body.append('image', file)
      const data = await callApi('/api/upload?folder=profile', { method: 'POST', body })
      if (data) setImageSrc(data.url)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function clearImage() {
    setBusy(true)
    setUploadError('')
    try {
      const data = await callApi('/api/profile-image', { method: 'DELETE' })
      if (data) setImageSrc(PUBLIC_PROFILE_IMAGE)
    } catch (err) {
      setUploadError(err.message)
    } finally {
      setBusy(false)
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
        .role-rotate { display: inline-block; min-width: 380px; min-height: 1.2em; position: relative; overflow: hidden; }
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

              <div className="theme-panel-solid relative w-72 h-72 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] rounded-[36px] shadow-[0_40px_120px_rgba(15,23,42,0.28)] overflow-hidden flex items-center justify-center photo-animate photo-frame border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.12),transparent_30%)]">
                <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/10" />
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    onError={() => setImageSrc(null)}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-[36px] bg-slate-950/90 px-6 text-center text-white">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 shadow-xl shadow-slate-950/40">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90">
                        <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="text-2xl font-semibold">Profile preview</div>
                    <p className="text-base text-white/70 max-w-[18rem]">Upload a picture to make this hero section more personal.</p>
                  </div>
                )}

                {IS_OWNER && (
                <div className="absolute inset-x-0 bottom-4 px-4">
                  {uploadError && <p className="mb-2 text-center text-sm text-rose-300">{uploadError}</p>}
                  <div className="mx-auto flex w-full max-w-[22rem] items-center justify-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-2 backdrop-blur-lg shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
                    <input ref={fileRef} onChange={handleFile} accept="image/*" type="file" className="hidden" />
                    <button
                      onClick={() => fileRef.current && fileRef.current.click()}
                      disabled={busy}
                      aria-label="Upload profile image"
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400 text-slate-950 transition hover:scale-[1.02]"
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                        <path d="M12 3v10m0 0l-4-4m4 4l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 17h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                    {imageSrc && (
                      <button
                        onClick={clearImage}
                        disabled={busy}
                        aria-label="Remove profile image"
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                          <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
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
