import React from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { SITE } from '../config'

export default function MediumPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-12">
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4">Medium</p>
            <h1 className="theme-heading text-5xl md:text-6xl font-extrabold mb-6">My Medium writing</h1>
            <p className="theme-muted text-lg leading-8 mb-10">
              Explore my latest Medium posts on software engineering, backend systems, AI, and developer productivity.
              Click below to visit my Medium profile and read the full articles.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={SITE.medium.startsWith('http') ? SITE.medium : `https://medium.com/${SITE.medium.startsWith('@') ? SITE.medium : `@${SITE.medium}`}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
              >
                View my Medium profile
              </a>
              <a
                href="/"
                className="theme-button-ghost inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl transition-colors"
              >
                Back home
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
