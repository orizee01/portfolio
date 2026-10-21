import React from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'
import { SITE } from '../config'

const sampleArticles = [
  {
    title: 'Building Resilient Backend Systems for Scale',
    link: '#'
  },
  {
    title: 'Platform Engineering Best Practices for Cloud Reliability',
    link: '#'
  },
  {
    title: 'API Design Patterns That Improve Developer Velocity',
    link: '#'
  }
]

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-12">
        <section className="py-24">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400 mb-4">Articles</p>
            <h1 className="theme-heading text-5xl md:text-6xl font-extrabold mb-6">Writing and stories on Medium</h1>
            <p className="theme-muted text-lg leading-8 mb-10">
              I write about backend engineering, web development, AI, and systems design on Medium.
              Explore the card titles below and click through to read the full articles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {sampleArticles.map(article => (
              <article key={article.title} className="theme-panel-solid rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-emerald-400">
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-3">Article</p>
                <h2 className="theme-heading text-xl font-semibold mb-4">{article.title}</h2>
                <a href={article.link} className="text-emerald-400 text-sm font-medium hover:text-emerald-300">
                  Read title →
                </a>
              </article>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={SITE.medium.startsWith('http') ? SITE.medium : `https://medium.com/${SITE.medium.startsWith('@') ? `@${SITE.medium}` : SITE.medium}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-emerald-400 text-black font-semibold hover:bg-emerald-300 transition-colors"
            >
              Visit my Medium profile
            </a>
            <a
              href="/"
              className="theme-button-ghost inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl transition-colors"
            >
              Back home
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
