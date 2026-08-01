import React from 'react'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <Reveal>
        <h2 className="text-3xl font-bold mb-4 text-white">Contact</h2>
      </Reveal>
      <Reveal delay={60} className="mb-6">
        <p className="text-gray-300">I'm available for freelance or full-time backend work. Reach out and let's build something great.</p>
        <p className="text-gray-400 mt-2">Prefer direct email? <a href="mailto:gifttee2004@gmail.com" className="text-emerald-400 hover:text-emerald-300">gifttee2004@gmail.com</a></p>
      </Reveal>
      <Reveal delay={120}>
        <form className="max-w-md space-y-4 glass p-6">
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input placeholder="Your name" className="mt-1 block w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-gray-200 placeholder-gray-500 input-focus" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input placeholder="you@domain.com" className="mt-1 block w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-gray-200 placeholder-gray-500 input-focus" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Message</label>
            <textarea placeholder="Tell me about your project..." className="mt-1 block w-full bg-neutral-900 border border-neutral-800 rounded px-3 py-2 text-gray-200 placeholder-gray-500 input-focus" rows="4" />
          </div>
          <div>
            <button className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-3 rounded-xl font-medium hover:scale-105 btn-animated">Send message</button>
          </div>
        </form>
      </Reveal>
    </section>
  )
}
