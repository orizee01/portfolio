import React, { useState } from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { login, logout, useAdmin } from '../lib/admin'

const TOOLS = [
  { href: '/', title: 'Profile photo', text: 'Change or remove the photo on the home page.' },
  { href: '/messages', title: 'Messages', text: 'Read and reply to contact form messages.' },
  { href: '/upload', title: 'Upload images', text: 'Upload an image and copy its link.' },
]

export function AdminLoginRequired() {
  return (
    <div className="glass mt-6 max-w-md p-6">
      <p className="theme-heading font-semibold">Admin login required</p>
      <p className="theme-muted mt-1 text-sm">This page is only for the site admin.</p>
      <a href="/admin" className="mt-4 inline-block rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 px-5 py-2.5 font-medium text-black">
        Log in
      </a>
    </div>
  )
}

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setError('')
    try {
      // Pasted credentials often carry stray spaces; phones capitalise the first letter.
      await login(username.trim().toLowerCase(), password.trim())
    } catch (err) {
      setError(err.message)
      setStatus('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass mt-6 max-w-md space-y-4 p-6">
      <div>
        <label htmlFor="username" className="theme-muted block text-sm font-medium">Username</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="theme-muted block text-sm font-medium">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus"
          required
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-3 rounded-xl font-medium transition disabled:opacity-60"
      >
        {status === 'loading' ? 'Logging in…' : 'Log in'}
      </button>
      {error && <p className="text-sm text-rose-400" role="alert">{error}</p>}
    </form>
  )
}

export default function AdminPage() {
  const { checking, admin, username } = useAdmin()

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-16">
        <section className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin</p>
          <h1 className="theme-heading mt-4 text-3xl font-bold">{admin ? `Welcome back, ${username}` : 'Admin login'}</h1>

          {checking && <p className="theme-muted mt-6">Checking your session…</p>}

          {!checking && !admin && <LoginForm />}

          {!checking && admin && (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {TOOLS.map(tool => (
                  <a key={tool.href} href={tool.href} className="theme-panel rounded-2xl p-5 transition hover:-translate-y-0.5">
                    <p className="theme-heading font-semibold">{tool.title}</p>
                    <p className="theme-muted mt-1 text-sm">{tool.text}</p>
                  </a>
                ))}
              </div>
              <button type="button" onClick={logout} className="mt-8 text-sm text-rose-400 hover:text-rose-300">
                Log out
              </button>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  )
}
