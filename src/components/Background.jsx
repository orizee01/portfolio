import React from 'react'

export default function Background() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="animated-bg" />
      <svg className="absolute left-1/4 top-10 opacity-30 blur-3xl" width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="200" fill="url(#g1)" />
      </svg>
      <svg className="absolute right-10 bottom-[-80px] opacity-25 blur-3xl" width="500" height="500" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect x="50" y="50" width="500" height="500" rx="120" fill="url(#g2)" />
      </svg>
    </div>
  )
}
