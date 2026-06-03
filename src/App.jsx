import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Background from './components/Background'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-12">
        <Hero />
        <Projects />
        <Contact />
      </main>
      <footer className="text-center py-6 text-sm text-gray-400">© {new Date().getFullYear()} — Built with React + Tailwind</footer>
    </div>
  )
}
