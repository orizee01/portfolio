import { useEffect, useState } from 'react'

// Admin session handling. The backend enforces every admin action; this only decides
// what the UI shows and attaches the session token to requests.
export const API_URL = import.meta.env.VITE_API_URL || ''

const KEY = 'adminToken'
const CHANGE_EVENT = 'admin-change'

function readToken() {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

function writeToken(token) {
  try {
    if (token) localStorage.setItem(KEY, token)
    else localStorage.removeItem(KEY)
  } catch {
    // storage blocked (private mode): the session just won't survive a reload
  }
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

export async function login(username, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(data.error || 'Login failed')
  writeToken(data.token)
  return data
}

export function logout() {
  writeToken(null)
}

// fetch() for admin-only endpoints. An expired or invalid session logs the admin out.
export async function adminFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${readToken()}` },
  })
  const data = await response.json().catch(() => ({}))
  if (response.status === 401) {
    logout()
    throw new Error('Your admin session has expired. Please log in again.')
  }
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

// { checking, admin, username }: whether the current visitor is a logged-in admin.
export function useAdmin() {
  const [state, setState] = useState(() => ({ checking: Boolean(readToken()), admin: false, username: null }))

  useEffect(() => {
    let cancelled = false

    async function check() {
      const token = readToken()
      if (!token) {
        setState({ checking: false, admin: false, username: null })
        return
      }
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        const data = await response.json().catch(() => ({}))
        if (cancelled) return
        if (response.ok && data.admin) {
          setState({ checking: false, admin: true, username: data.username })
        } else {
          if (response.status === 401) writeToken(null)
          setState({ checking: false, admin: false, username: null })
        }
      } catch {
        // backend unreachable: treat as logged out for now, keep the token
        if (!cancelled) setState({ checking: false, admin: false, username: null })
      }
    }

    check()
    // Re-check on login/logout in this tab (custom event) or another tab (storage event).
    window.addEventListener(CHANGE_EVENT, check)
    window.addEventListener('storage', check)
    return () => {
      cancelled = true
      window.removeEventListener(CHANGE_EVENT, check)
      window.removeEventListener('storage', check)
    }
  }, [])

  return state
}
