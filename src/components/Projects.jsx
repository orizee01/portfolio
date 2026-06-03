import React from 'react'
import Reveal from './Reveal'

const sampleProjects = [
  {
    title: 'Project One',
    desc: 'A short description of project one that highlights the tech and impact.',
    link: '#'
  },
  {
    title: 'Project Two',
    desc: 'A short description of project two with goals and outcomes.',
    link: '#'
  },
  {
    title: 'Project Three',
    desc: 'A short description of project three with interesting details.',
    link: '#'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-16">
      <Reveal>
        <h2 className="text-3xl font-bold mb-6 text-white">Projects</h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-6">
        {sampleProjects.map((p, i) => (
          <Reveal key={p.title} delay={i * 80} className="">
            <article className="card card-top-accent hover:scale-[1.03] transform transition-all duration-300">
              <div className="mb-3 text-sm text-gray-400">Web • React • Node</div>
              <h3 className="font-semibold text-white text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-gray-300 mb-4">{p.desc}</p>
              <a href={p.link} className="text-emerald-400 text-sm font-medium">View project →</a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
