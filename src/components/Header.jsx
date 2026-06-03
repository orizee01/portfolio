import React from 'react'

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 py-4">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="text-lg font-semibold reveal reveal--visible"><span className="accent-text">Orizee</span>-style Portfolio</div>
        <nav className="space-x-6 text-sm">
          <a href="#projects" className="text-gray-300 hover:text-white">Projects</a>
          <a href="#contact" className="text-gray-300 hover:text-white">Contact</a>
          <a href="/CV.pdf" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white">Resume</a>
        </nav>
      </div>
    </header>
  )
}
