import React, { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

export default function Hero() {
  const [imageSrc, setImageSrc] = useState(null)
  const fileRef = useRef(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('profileImage')
      if (saved) setImageSrc(saved)
    } catch (e) {
      // ignore
    }
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
    setImageSrc(null)
    try { localStorage.removeItem('profileImage') } catch (e) {}
    if (fileRef.current) fileRef.current.value = ''
  }

  return (
    <section className="py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <h1 className="text-5xl font-extrabold mb-4"><span className="accent-text">Hi, I'm Orizee</span> — a Backend Developer</h1>
          </Reveal>
          <Reveal delay={80} className="mb-6 max-w-xl">
            <p className="text-gray-300 mb-4">I build scalable, reliable, and delightful web applications. Here's a quick snapshot of what I do:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">💻</span>
                <span className="text-gray-200">Fullstack Engineer building scalable web applications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">🔧</span>
                <span className="text-gray-200">Backend Engineer focused on APIs, microservices, and system architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">🎨</span>
                <span className="text-gray-200">Frontend developer creating responsive and interactive user interfaces</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">🤖</span>
                <span className="text-gray-200">Building AI automation systems and intelligent workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">☁️</span>
                <span className="text-gray-200">Interested in DevOps, cloud infrastructure, and CI/CD pipelines</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">🧠</span>
                <span className="text-gray-200">Learning advanced system design and cloud-native architecture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">📈</span>
                <span className="text-gray-200">Passionate about automation, optimization, and backend performance</span>
              </li>
            </ul>
          </Reveal>
          <Reveal delay={160} className="flex gap-4">
            <a className="inline-flex items-center gap-2 bg-emerald-500 text-black px-5 py-3 rounded-xl font-medium shadow btn-animated" href="#projects">View projects</a>
            <a className="inline-flex items-center gap-2 border border-neutral-800 px-5 py-3 rounded-xl text-gray-200 btn-animated hover:bg-neutral-900/60" href="#contact">Get in touch</a>
          </Reveal>
        </div>
        <div className="flex justify-center">
          <Reveal delay={240} className="flex justify-center">
            <div className="w-72 h-72 rounded-2xl shadow-2xl ring-1 ring-white/10 overflow-hidden relative bg-neutral-800 flex items-center justify-center photo-animate card-top-accent">
              {imageSrc ? (
                <img src={imageSrc} alt="Profile" className="object-cover w-full h-full" />
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}
