import React from 'react'
import Reveal from './Reveal'

const tools = [
  {
    name: 'Claude Code',
    model: 'Fable 5.1',
    role: 'Agentic coding',
    desc: 'Works across the codebase from the terminal: multi-file refactors, writing and running tests, and reviewing changes before a pull request.'
  },
  {
    name: 'ChatGPT',
    model: 'GPT-5.5',
    role: 'Thinking partner',
    desc: 'Breaking down requirements, comparing design options, explaining unfamiliar concepts, and drafting documentation.'
  },
  {
    name: 'Cursor',
    model: 'AI editor',
    role: 'In-editor help',
    desc: 'Inline edits, quick refactors, and questions about the file I am working in, without leaving the editor.'
  },
  {
    name: 'GitHub Copilot',
    model: 'Autocomplete',
    role: 'Typing speed',
    desc: 'Completes boilerplate and repetitive code so I can focus on the logic that matters.'
  }
]

const principles = [
  {
    title: 'I own every decision',
    desc: 'AI suggests; I decide. Architecture, implementation, and trade-offs remain my responsibility.'
  },
  {
    title: 'Nothing ships unverified',
    desc: 'Every suggestion is read, tested, and adapted before it becomes part of a production-ready solution.'
  },
  {
    title: 'Security first',
    desc: 'Secrets, credentials, and private data stay out of prompts, and generated code is reviewed for vulnerabilities.'
  }
]

const workflow = [
  {
    phase: 'Plan',
    focus: ['Requirements and edge cases', 'REST API and service design', 'PostgreSQL schema, constraints, and indexes', 'Auth and error-handling strategy'],
    ai: 'Pressure-test requirements and compare architecture options before writing code.',
    tools: ['ChatGPT']
  },
  {
    phase: 'Build',
    focus: ['Node.js, TypeScript, Express.js', 'PostgreSQL and Redis', 'JWT authentication', 'Clean, readable code'],
    ai: 'Explore implementation options, refactor, and speed up repetitive work.',
    tools: ['Claude Code', 'Cursor', 'GitHub Copilot']
  },
  {
    phase: 'Test',
    focus: ['Unit and integration tests', 'API endpoint tests', 'Auth and validation tests', 'Edge cases'],
    ai: 'Generate test ideas and edge cases I might have missed.',
    tools: ['Claude Code', 'Mocha', 'Chai']
  },
  {
    phase: 'Debug',
    focus: ['Application logs and stack traces', 'SQL analysis', 'Runtime debugging'],
    ai: 'Speed up root-cause analysis by reasoning through logs and traces.',
    tools: ['VS Code Debugger', 'ChatGPT']
  },
  {
    phase: 'Review',
    focus: ['Security', 'Performance', 'Maintainability and readability', 'Scalability and best practices'],
    ai: 'A second pair of eyes on every change before opening a pull request.',
    tools: ['Claude Code', 'ChatGPT']
  },
  {
    phase: 'Optimize & Document',
    focus: ['SQL query performance and indexing', 'API response time and caching', 'API docs and technical decisions', 'Setup guides and architecture diagrams'],
    ai: 'Find slow queries and keep documentation clear and up to date.',
    tools: ['ChatGPT']
  }
]

const stack = [
  { label: 'Backend', items: ['Node.js', 'TypeScript', 'Express.js', 'PostgreSQL', 'Redis', 'JWT Authentication'] },
  { label: 'Testing', items: ['Mocha', 'Chai'] },
  { label: 'DevOps & Tools', items: ['Git', 'GitHub', 'Docker', 'SonarCloud'] }
]

function Chip({ children }) {
  return (
    <span className="theme-soft inline-block rounded-full px-3 py-1 text-xs font-medium" style={{ border: '1px solid var(--border-soft)' }}>
      {children}
    </span>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-6">
      <h3 className="theme-heading text-2xl font-semibold">{children}</h3>
      {sub && <p className="theme-muted mt-1">{sub}</p>}
    </div>
  )
}

export default function AI() {
  return (
    <section id="ai" className="py-16">
      <div className="container mx-auto px-6">
        <Reveal>
          <h2 className="theme-heading text-3xl font-semibold mb-4">AI-Assisted Engineering</h2>
          <p className="theme-muted max-w-3xl">
            As a backend engineer, I use AI to move faster and raise code quality, but it does not replace engineering judgment.
            Here are the tools I use, the rules I follow, and where AI fits into my workflow.
          </p>
        </Reveal>

        <div className="mt-12">
          <SectionTitle sub="Each tool has a specific job.">My AI Toolkit</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((t, i) => (
              <Reveal key={t.name} delay={i * 80} className="h-full">
                <div className="theme-panel h-full rounded-3xl p-6">
                  <p className="theme-soft text-xs font-semibold uppercase tracking-wider">{t.role}</p>
                  <h4 className="theme-heading mt-2 text-lg font-semibold">{t.name}</h4>
                  <p className="theme-soft text-sm">{t.model}</p>
                  <p className="theme-muted mt-3 text-sm">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle>How I Work With AI</SectionTitle>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={i * 80} className="h-full">
                <div className="theme-panel h-full rounded-3xl p-6">
                  <h4 className="theme-heading font-semibold">{p.title}</h4>
                  <p className="theme-muted mt-2 text-sm">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle sub="A structured process for secure, scalable, and maintainable applications.">My Engineering Workflow</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflow.map((step, i) => (
              <Reveal key={step.phase} delay={(i % 3) * 80} className="h-full">
                <div className="theme-panel flex h-full flex-col rounded-3xl p-6">
                  <div className="flex items-baseline gap-3">
                    <span className="theme-soft text-sm font-semibold">{String(i + 1).padStart(2, '0')}</span>
                    <h4 className="theme-heading text-lg font-semibold">{step.phase}</h4>
                  </div>
                  <ul className="theme-muted mt-3 list-disc list-inside space-y-1 text-sm">
                    {step.focus.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <p className="theme-muted mt-4 text-sm"><strong className="theme-heading">AI's role:</strong> {step.ai}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-4">
                    {step.tools.map((tool) => <Chip key={tool}>{tool}</Chip>)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="theme-soft mt-6 text-sm max-w-3xl">
            I keep learning backend architecture, distributed systems, cloud services, and security best practices. AI helps me learn faster by explaining complex topics, comparing approaches, and summarizing documentation.
          </p>
        </div>

        <Reveal>
          <div className="theme-panel mt-12 rounded-3xl p-8">
            <SectionTitle>My Development Stack</SectionTitle>
            <div className="grid gap-6 md:grid-cols-3">
              {stack.map((group) => (
                <div key={group.label}>
                  <p className="theme-heading font-semibold mb-3">{group.label}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => <Chip key={item}>{item}</Chip>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
