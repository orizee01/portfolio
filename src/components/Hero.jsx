import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { SITE } from '../config'

const PUBLIC_PROFILE_IMAGE = '/preview.jpg'

export default function Hero() {
  const [imageSrc, setImageSrc] = useState(PUBLIC_PROFILE_IMAGE)
  const [activeRole, setActiveRole] = useState(0)
  const fileRef = useRef(null)

  const roles = ['Backend Engineer', 'Platform Engineer']

  useEffect(() => {
    try {
      const saved = localStorage.getItem('profileImage')
      if (saved) setImageSrc(saved)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRole(prev => (prev + 1) % roles.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setImageSrc(reader.result)
      try { localStorage.setItem('profileImage', reader.result) } catch (err) {}
    }
    reader.readAsDataURL(file)
  }

  function clearImage() {
    setImageSrc(PUBLIC_PROFILE_IMAGE)
    try { localStorage.removeItem('profileImage') } catch (e) {}
    if (fileRef.current) fileRef.current.value = ''
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
            <a className="inline-flex items-center gap-2 px-5 py-3 rounded-xl btn-animated cta-ghost" href="/Oreoluwa_Ogunneye_-_Senior_Software_Engineer__Typescript__Node.Js__SQL__MongoDB__Nest.JS__React.pdf">Download CV</a>
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

              <div className="theme-panel-solid w-72 h-72 rounded-2xl shadow-2xl overflow-hidden relative flex items-center justify-center photo-animate card-top-accent photo-frame">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt="Profile"
                    className="object-cover w-full h-full"
                    onError={() => setImageSrc(null)}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-pink-600 to-rose-500 flex items-center justify-center text-white font-bold">Your Photo</div>
                )}

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  <input ref={fileRef} onChange={handleFile} accept="image/*" type="file" className="hidden" />
                  <button onClick={() => fileRef.current && fileRef.current.click()} className="bg-gradient-to-r from-indigo-600 via-pink-600 to-rose-500 text-white text-sm px-3 py-2 rounded-md hover:scale-105 transform transition">Upload</button>
                  {imageSrc && (
                    <button onClick={clearImage} className="bg-red-600 text-sm text-white px-3 py-2 rounded-md hover:bg-red-700">Remove</button>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
