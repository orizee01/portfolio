import React from 'react'
import Reveal from './Reveal'

const sampleProjects = [
  {
    title: 'EightMedical',
    desc: 'Delivered the backend for an emergency care platform, improving booking accuracy, reducing triage time, and enabling real-time patient updates for ambulance and urgent care requests.',
    stack: 'TypeScript • Node.js • PostgreSQL • AWS',
    link: '#',
    img: '/Screenshot 2026-07-21 at 10.42.27 AM.png'
  },
  {
    title: 'AI Directory',
    desc: 'Built the backend infrastructure for an AI tools marketplace with secure accounts, content workflows, Stripe payments, and scalable background processing.',
    stack: 'Node.js • PostgreSQL • Stripe • Redis',
    link: '#',
    img: '/Coming%20soon.png'
  },
  {
    title: 'Paysmosmo Backend API',
    desc: 'Implemented a scalable e-commerce backend API with authentication, order orchestration, payment handling, and reliable data sync across services.',
    stack: 'TypeScript • Node.js • PostgreSQL • TypeORM',
    link: '#',
    img: '/case.avif'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <Reveal>
        <h2 className="theme-heading text-3xl font-bold mb-6">Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {sampleProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="">
            <article className="card card-top-accent hover:scale-[1.03] transform transition-all duration-300">
              {p.img ? (
                <div className="h-40 rounded-lg mb-4 overflow-hidden relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 text-white font-semibold bg-black/20 px-3 py-1">{p.title}</div>
                </div>
              ) : (
                <div className="h-40 rounded-lg mb-4 overflow-hidden bg-gradient-to-tr from-indigo-600 via-pink-600 to-rose-500 flex items-end p-4">
                  <div className="text-white font-semibold bg-black/20 px-3 py-1 rounded">{p.title}</div>
                </div>
              )}
              <div className="theme-soft mb-3 text-sm">{p.stack}</div>
              <p className="theme-muted text-sm mb-4">{p.desc}</p>
              <a href={p.link} className="text-emerald-400 text-sm font-medium">View project →</a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
