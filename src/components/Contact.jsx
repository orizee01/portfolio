import React from 'react'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <Reveal>
        <h2 className="theme-heading text-3xl font-bold mb-4">Contact</h2>
      </Reveal>
      <Reveal delay={60} className="mb-6">
        <p className="theme-muted">I'm available for freelance or full-time backend work. Reach out and let's build something great.</p>
        <p className="theme-soft mt-2">Prefer direct email? <a href="mailto:gifttee2004@gmail.com" className="text-emerald-400 hover:text-emerald-300">gifttee2004@gmail.com</a></p>
      </Reveal>
      <Reveal delay={120}>
        <form className="max-w-md space-y-4 glass p-6">
          <div>
            <label className="theme-muted block text-sm font-medium">Name</label>
            <input placeholder="Your name" className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" />
          </div>
          <div>
            <label className="theme-muted block text-sm font-medium">Email</label>
            <input placeholder="you@domain.com" className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" />
          </div>
          <div>
            <label className="theme-muted block text-sm font-medium">Message</label>
            <textarea placeholder="Tell me about your project..." className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" rows="4" />
          </div>
          <div>
            <button className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-3 rounded-xl font-medium hover:scale-105 btn-animated">Send message</button>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
