import React from 'react'
import Header from './components/Header'
import { SITE } from './config'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Background from './components/Background'
import Footer from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-12">
        <Hero />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
