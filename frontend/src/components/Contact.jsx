import React, { useCallback, useState } from 'react'
import Reveal from './Reveal'
import Toast from './Toast'

export default function Contact() {
  const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [toast, setToast] = useState(null)
  const closeToast = useCallback(() => setToast(null), [])

  const buttonLabel =
    status === 'sending'
      ? 'Sending…'
      : status === 'success'
      ? 'Sent ✓'
      : status === 'error'
      ? 'Try again'
      : 'Send message'

  const buttonClasses = `bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-3 rounded-xl font-medium transition-all duration-300 ease-out btn-animated ${
    status === 'sending'
      ? 'animate-pulse shadow-[0_0_0_12px_rgba(34,197,94,0.18)]'
      : status === 'success'
      ? 'shadow-[0_0_0_14px_rgba(34,197,94,0.22)] scale-[1.02]'
      : status === 'error'
      ? 'bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-500 text-white shadow-[0_0_0_14px_rgba(244,63,94,0.18)]'
      : 'hover:scale-105'
  }`

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    const form = event.target
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      website: formData.get('website'),
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setStatus('success')
        form.reset()
        setToast({ type: 'success', title: 'Message sent successfully', message: "Thanks for reaching out. I'll get back to you soon." })
      } else {
        const errorBody = await response.json().catch(() => ({}))
        setErrorMessage(errorBody.error || 'Unable to send message')
        setStatus('error')
      }
    } catch (error) {
      setErrorMessage(error.message || 'Unable to send message')
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-16">
      {toast && <Toast {...toast} onClose={closeToast} />}
      <Reveal>
        <h2 className="theme-heading text-3xl font-bold mb-4">Contact</h2>
      </Reveal>
      <Reveal delay={60} className="mb-6">
        <p className="theme-muted">I'm available for freelance or full-time backend work. Reach out and let's build something great.</p>
        <p className="theme-soft mt-2">Prefer direct email? <a href="mailto:gifttee2004@gmail.com" className="text-emerald-400 hover:text-emerald-300">gifttee2004@gmail.com</a></p>
      </Reveal>
      <Reveal delay={120}>
        <form onSubmit={handleSubmit} className="max-w-md space-y-4 glass p-6">
          <input name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" className="hidden" />
          <div>
            <label className="theme-muted block text-sm font-medium">Name</label>
            <input name="name" maxLength={100} placeholder="Your name" className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" required />
          </div>
          <div>
            <label className="theme-muted block text-sm font-medium">Email</label>
            <input name="email" type="email" placeholder="you@domain.com" className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" required />
          </div>
          <div>
            <label className="theme-muted block text-sm font-medium">Message</label>
            <textarea name="message" maxLength={5000} placeholder="Tell me about your project..." className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus" rows="4" required />
          </div>
          <div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={buttonClasses}
            >
              {buttonLabel}
            </button>
          </div>
          {status === 'success' && (
            <p className="text-sm text-emerald-400">Thanks! Your message has been sent.</p>
          )}
          {status === 'error' && (
            <p className="text-sm text-rose-400">{errorMessage || 'Oops! Something went wrong. Please try again.'}</p>
          )}
        </form>
      </Reveal>
    </section>
  )
}
