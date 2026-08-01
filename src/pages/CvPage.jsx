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
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Resume</p>
                <h1 className="mt-4 text-4xl font-extrabold text-white">Oreoluwa Ogunneye</h1>
                <p className="mt-2 text-lg text-slate-300">Senior Software Engineer</p>
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
            <aside className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
              <div className="space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Contact</p>
                <div className="text-sm text-slate-300">
                  <p><span className="font-semibold text-white">Phone:</span> 07032273009</p>
                  <p><span className="font-semibold text-white">Email:</span> gifttee2004@gmail.com</p>
                  <p><span className="font-semibold text-white">Location:</span> Lagos, Nigeria</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Skills & Technical Expertise</p>
                <div className="grid gap-4 text-sm text-slate-300">
                  <div>
                    <p className="font-semibold text-white">Backend</p>
                    <p>TypeScript, Python</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Frontend</p>
                    <p>React, Vue</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Database</p>
                    <p>Postgres, MongoDB, Redis</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Cloud</p>
                    <p>AWS</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">CI/CD</p>
                    <p>GitHub Actions, GitLab CI, CircleCI</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Orchestration</p>
                    <p>Kubernetes</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Streaming</p>
                    <p>Kafka, Elastic Search</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Monitoring</p>
                    <p>Grafana</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Service Mesh</p>
                    <p>Professional</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Languages</p>
                    <p>English — Proficient</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Source Control</p>
                    <p>GitHub / GitLab</p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-10">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Summary</p>
                <p className="mt-4 text-slate-300 leading-7">
                  Backend Software Engineer with over 4+ years of experience designing, developing, and maintaining scalable, secure, and high-performance backend applications using Node.js, TypeScript, Express.js, and PostgreSQL. Experienced in building RESTful APIs, implementing authentication and authorization, designing relational databases, and delivering backend solutions for business-critical applications. Passionate about clean architecture, cloud technologies, and continuously expanding expertise in AWS, Docker, and DevOps.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Work Experience</p>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Senior Backend Engineer</h2>
                    <p className="text-sm text-slate-400">Enyata · April 2024 – Present · Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="mt-8 space-y-8 text-slate-300">
                  <div>
                    <p className="font-semibold text-white">EightMedical</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                      <li>Developed and maintained backend systems for a responsive emergency medical platform, managing booking flows, triage processes, and patient-centered data handling for ambulance and urgent care requests.</li>
                      <li>Ensured backend performance prioritized accessibility, speed, and reliability to effectively support critical medical scenarios.</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-400">Technologies: Node.js, TypeScript, Tailwind CSS, PostgreSQL.</p>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Paysmosmo Backend API</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                      <li>Designed and implemented a backend service for an e-commerce platform, managing product catalogs, order flows, and transactional data.</li>
                      <li>Improved maintainability through modular API design and clear service boundaries.</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-white">Rey360 (Septa Software)</p>
                    <p className="mt-2 text-sm text-slate-400">Senior Software Engineer · January 2020 – August 2022 · Lagos, Nigeria</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
                      <li>Built the backend for a travel itinerary platform, Rey360, using TypeScript and NestJS with a Domain-Driven Design architecture across multiple bounded contexts.</li>
                      <li>Implemented services for user management, trips, itinerary generation, payments, notifications, integrations, metrics, and IAM.</li>
                      <li>Designed a modern, scalable API service for travel planning, bookings, itinerary workflows, and third-party integrations.</li>
                    </ul>
                    <p className="mt-4 text-sm text-slate-400">Stack: TypeScript, NestJS 10, Node.js 18, TypeORM, PostgreSQL 15, Serverless Framework on AWS, AWS S3, AWS SQS, CloudWatch, Google OAuth 2.0, JWT, Stripe, Courier, Google Places API, Google Gemini / @ai-sdk/google, OpenWeatherMap, Intercom, Vitest, ESLint, Prettier, Yarn 4.</p>
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
