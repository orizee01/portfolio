import React from 'react'
import { SITE } from '../config'

function IconGitHub() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.287-.01-1.047-.016-2.055-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.334-1.757-1.334-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.98-.399 3-.405 1.02.006 2.043.14 3 .405 2.29-1.552 3.296-1.23 3.296-1.23.656 1.653.244 2.873.12 3.176.77.84 1.236 1.911 1.236 3.221 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.102.823 2.222 0 1.606-.015 2.904-.015 3.298 0 .322.216.699.825.58C20.565 21.795 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.039-1.852-3.039-1.853 0-2.136 1.445-2.136 2.939v5.669H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.268 2.37 4.268 5.456v6.287zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM6.993 20.452H3.679V9h3.314v11.452z" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h10zM12 7.5a4.5 4.5 0 1 0 .001 9.001A4.5 4.5 0 0 0 12 7.5zm0 2a2.5 2.5 0 1 1 0 5.001A2.5 2.5 0 0 1 12 9.5zM18.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="text-lg font-semibold reveal reveal--visible hover:text-white transition-colors">
          <span className="accent-text">{SITE.title}</span>-style Portfolio
        </a>
        <nav className="flex items-center gap-4 text-sm">
          <a href="/ai" className="text-gray-300 hover:text-white">AI</a>
          <a href="/articles" className="text-gray-300 hover:text-white">Articles</a>
          <a href="/medium" className="text-gray-300 hover:text-white">Medium</a>
          <a href="/cv" className="text-gray-300 hover:text-white">CV</a>
          <a href="/#projects" className="text-gray-300 hover:text-white">Projects</a>
          <a href="/#contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/CV.pdf" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">Resume</a>
          {SITE.email && (
            <a href={`mailto:${SITE.email}`} title="Email" className="text-gray-300 hover:text-emerald-400 transition-colors" aria-label="Email">
              <IconMail />
            </a>
          )}
          {SITE.linkedin && (
            <a
              href={SITE.linkedin.startsWith('http') ? SITE.linkedin : `https://www.linkedin.com/${SITE.linkedin}`}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              className="text-gray-300 hover:text-emerald-400 transition-colors"
              aria-label="LinkedIn"
            >
              <IconLinkedIn />
            </a>
          )}
          {SITE.instagram && (
            <a
              href={SITE.instagram.startsWith('http') ? SITE.instagram : `https://instagram.com/${SITE.instagram}`}
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              className="text-gray-300 hover:text-emerald-400 transition-colors"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
          )}
          {SITE.github && (
            <a href={SITE.github} target="_blank" rel="noreferrer" title="GitHub" className="text-gray-300 hover:text-emerald-400 transition-colors" aria-label="GitHub">
              <IconGitHub />
            </a>
          )}
        </nav>
      </div>
    </header>
  )
}
