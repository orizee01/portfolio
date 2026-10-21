import React from 'react'
import Header from '../components/Header'
import Background from '../components/Background'
import Footer from '../components/Footer'

export default function CvPage() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Background />
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-28 pb-16">
        <section className="space-y-10">
          <div className="theme-panel rounded-3xl p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Resume</p>
                <h1 className="theme-heading mt-4 text-4xl font-extrabold">Oreoluwa Ogunneye</h1>
                <p className="theme-muted mt-2 text-lg">Senior Software Engineer</p>
              </div>
              <a
                href="/CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-emerald-300"
              >
                Download PDF
              </a>
            </div>
          </div>

          <div className="grid gap-10 xl:grid-cols-[360px_1fr]">
            <aside className="theme-panel space-y-8 rounded-3xl p-8">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Contact</p>
                <div className="theme-muted text-sm">
                  <p><span className="theme-heading font-semibold">Phone:</span> 07032273009</p>
                  <p><span className="theme-heading font-semibold">Email:</span> gifttee2004@gmail.com</p>
                  <p><span className="theme-heading font-semibold">Location:</span> Lagos, Nigeria</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Skills & Technical Expertise</p>
                <div className="theme-muted grid gap-4 text-sm">
                  <div>
                    <p className="theme-heading font-semibold">Backend</p>
                    <p>TypeScript, Python</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Frontend</p>
                    <p>React, Vue</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Database</p>
                    <p>Postgres, MongoDB, Redis</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Cloud</p>
                    <p>AWS</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">CI/CD</p>
                    <p>GitHub Actions, GitLab CI, CircleCI</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Orchestration</p>
                    <p>Kubernetes</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Streaming</p>
                    <p>Kafka, Elastic Search</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Monitoring</p>
                    <p>Grafana</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Service Mesh</p>
                    <p>Professional</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Languages</p>
                    <p>English — Proficient</p>
                  </div>
                  <div>
                    <p className="theme-heading font-semibold">Source Control</p>
                    <p>GitHub / GitLab</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-10">
              <div className="theme-panel rounded-3xl p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Summary</p>
                <p className="theme-muted mt-4 leading-7">
                  Backend Software Engineer with over 4+ years of experience designing, developing, and maintaining scalable, secure, and high-performance backend applications using Node.js, TypeScript, Express.js, and PostgreSQL. Experienced in building RESTful APIs, implementing authentication and authorization, designing relational databases, and delivering backend solutions for business-critical applications. Passionate about clean architecture, cloud technologies, and continuously expanding expertise in AWS, Docker, and DevOps.
                </p>
              </div>

              <div className="theme-panel rounded-3xl p-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Work Experience</p>
                    <h2 className="theme-heading mt-4 text-2xl font-semibold">Senior Backend Engineer</h2>
                    <p className="theme-soft text-sm">Enyata · April 2024 – Present · Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="theme-muted mt-8 space-y-8">
                  <div>
                    <p className="theme-heading font-semibold">EightMedical</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      <li>Developed and maintained backend systems for a responsive emergency medical platform, managing booking flows, triage processes, and patient-centered data handling for ambulance and urgent care requests.</li>
                      <li>Ensured backend performance prioritized accessibility, speed, and reliability to effectively support critical medical scenarios.</li>
                    </ul>
                    <p className="theme-soft mt-4 text-sm">Technologies: Node.js, TypeScript, Tailwind CSS, PostgreSQL.</p>
                  </div>

                  <div>
                    <p className="theme-heading font-semibold">Paysmosmo Backend API</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      <li>Designed and implemented a backend service for an e-commerce platform, managing product catalogs, order flows, and transactional data.</li>
                      <li>Improved maintainability through modular API design and clear service boundaries.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="theme-heading font-semibold">Rey360 (Septa Software)</p>
                    <p className="theme-soft mt-2 text-sm">Senior Software Engineer · January 2020 – August 2022 · Lagos, Nigeria</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      <li>Built the backend for a travel itinerary platform, Rey360, using TypeScript and NestJS with a Domain-Driven Design architecture across multiple bounded contexts.</li>
                      <li>Implemented services for user management, trips, itinerary generation, payments, notifications, integrations, metrics, and IAM.</li>
                      <li>Designed a modern, scalable API service for travel planning, bookings, itinerary workflows, and third-party integrations.</li>
                    </ul>
                    <p className="theme-soft mt-4 text-sm">Stack: TypeScript, NestJS 10, Node.js 18, TypeORM, PostgreSQL 15, Serverless Framework on AWS, AWS S3, AWS SQS, CloudWatch, Google OAuth 2.0, JWT, Stripe, Courier, Google Places API, Google Gemini / @ai-sdk/google, OpenWeatherMap, Intercom, Vitest, ESLint, Prettier, Yarn 4.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
