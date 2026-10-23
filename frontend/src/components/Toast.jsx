import React, { useEffect } from 'react'

// A notification pinned to the top of the screen. Closes itself after `duration` ms.
// type: 'success' | 'error'
export default function Toast({ type = 'success', title, message, onClose, duration = 5000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const success = type === 'success'

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div
        role={success ? 'status' : 'alert'}
        aria-live={success ? 'polite' : 'assertive'}
        className={`toast-in pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-md ${
          success
            ? 'border-emerald-400/40 bg-emerald-950/90 text-emerald-50'
            : 'border-rose-400/40 bg-rose-950/90 text-rose-50'
        }`}
      >
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
            success ? 'bg-emerald-400 text-emerald-950' : 'bg-rose-400 text-rose-950'
          }`}
        >
          {success ? '✓' : '!'}
        </span>
        <div className="flex-1">
          <p className="font-semibold">{title}</p>
          {message && <p className="mt-0.5 text-sm opacity-80">{message}</p>}
        </div>
        <button type="button" onClick={onClose} aria-label="Close notification" className="text-lg leading-none opacity-70 hover:opacity-100">
          ×
        </button>
      </div>
    </div>
  )
}
