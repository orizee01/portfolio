import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'

const MAX_BYTES = 5 * 1024 * 1024
const ACCEPT = 'image/jpeg,image/png,image/gif,image/webp'

export default function UploadPage() {
  const [token, setToken] = useState('')
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!file) return setPreview('')
    const objectUrl = URL.createObjectURL(file)
    setPreview(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  function handleFile(event) {
    const picked = event.target.files[0] || null
    setUrl('')
    setStatus('')
    setCopied(false)
    if (picked && picked.size > MAX_BYTES) {
      setFile(null)
      setError('Image must be 5MB or smaller.')
      return
    }
    setError('')
    setFile(picked)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (!file) return setError('Choose an image first.')

    setStatus('uploading')
    setError('')
    setUrl('')

    const body = new FormData()
    body.append('image', file)

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body,
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || 'Upload failed')
      setUrl(data.url)
      setStatus('success')
    } catch (err) {
      setError(err.message || 'Upload failed')
      setStatus('error')
    }
  }

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-16">
        <section className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Admin</p>
          <h1 className="theme-heading mt-4 text-3xl font-bold">Upload an image</h1>
          <p className="theme-muted mt-2">JPEG, PNG, GIF or WebP, up to 5MB.</p>

          <form onSubmit={handleSubmit} className="glass mt-6 space-y-4 p-6">
            <div>
              <label htmlFor="token" className="theme-muted block text-sm font-medium">Upload token</label>
              <input
                id="token"
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                autoComplete="off"
                className="theme-input mt-1 block w-full rounded px-3 py-2 input-focus"
                required
              />
            </div>
            <div>
              <label htmlFor="image" className="theme-muted block text-sm font-medium">Image</label>
              <input
                id="image"
                type="file"
                accept={ACCEPT}
                onChange={handleFile}
                className="theme-muted mt-1 block w-full text-sm"
                required
              />
            </div>

            {preview && (
              <img src={preview} alt="Selected preview" className="max-h-64 rounded-xl border border-white/10 object-contain" />
            )}

            <button
              type="submit"
              disabled={status === 'uploading' || !file}
              className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-black px-5 py-3 rounded-xl font-medium transition disabled:opacity-60"
            >
              {status === 'uploading' ? 'Uploading…' : 'Upload'}
            </button>

            {error && <p className="text-sm text-rose-400">{error}</p>}

            {url && (
              <div className="space-y-2">
                <p className="text-sm text-emerald-400">Uploaded ✓</p>
                <div className="flex items-center gap-2">
                  <input readOnly value={url} onFocus={(e) => e.target.select()} className="theme-input block w-full rounded px-3 py-2 text-sm" />
                  <button type="button" onClick={copyUrl} className="theme-nav-link whitespace-nowrap text-sm">
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}
