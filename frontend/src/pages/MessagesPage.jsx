import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { adminFetch, useAdmin } from '../lib/admin'
import { AdminLoginRequired } from './AdminPage'

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export default function MessagesPage() {
  const { checking, admin } = useAdmin()
  const [messages, setMessages] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    setError('')
    try {
      const data = await adminFetch('/api/messages')
      setMessages(data.messages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function remove(id) {
    if (!window.confirm('Delete this message?')) return
    try {
      await adminFetch(`/api/messages/${id}`, { method: 'DELETE' })
      setMessages(prev => prev.filter(m => m.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    if (admin) load()
  }, [admin])

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-16">
        <section className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="theme-heading text-3xl font-bold">Messages</h1>
              <p className="theme-muted mt-2">Everything sent through the contact form, newest first.</p>
            </div>
            {admin && (
              <button
                type="button"
                onClick={load}
                disabled={loading}
                className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-2.5 rounded-xl font-medium transition disabled:opacity-60"
              >
                {loading ? 'Loading…' : 'Refresh'}
              </button>
            )}
          </div>

          {checking && <p className="theme-muted mt-6">Checking your session…</p>}
          {!checking && !admin && <AdminLoginRequired />}

          {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

          {admin && messages && messages.length === 0 && (
            <p className="theme-muted mt-8">No messages yet.</p>
          )}

          {admin && messages && messages.length > 0 && (
            <ul className="mt-8 space-y-4">
              {messages.map(m => (
                <li key={m.id} className="theme-panel rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="theme-heading font-semibold">{m.name}</p>
                      <a href={`mailto:${m.email}`} className="text-sm text-emerald-400 hover:text-emerald-300">{m.email}</a>
                    </div>
                    <p className="theme-soft text-sm">{formatDate(m.createdAt)}</p>
                  </div>
                  <p className="theme-muted mt-4 whitespace-pre-wrap break-words">{m.message}</p>
                  <div className="mt-4 flex gap-4 text-sm">
                    <a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: your message')}`} className="theme-nav-link">Reply</a>
                    <button type="button" onClick={() => remove(m.id)} className="text-rose-400 hover:text-rose-300">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
