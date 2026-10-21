import React from 'react'

export default function AI() {
  return (
    <section id="ai" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="theme-heading text-3xl font-semibold mb-4">My Engineering Workflow</h2>
        <p className="theme-muted max-w-3xl mb-8">
          As a backend engineer, I follow a structured development process to deliver secure, scalable, and maintainable applications. AI is one of the tools I use to improve productivity and code quality, but every architectural decision, implementation, and review remains my responsibility.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">1. Requirements Analysis</h3>
            <p className="theme-muted mb-2">Before writing code, I analyze business requirements to understand:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Functional requirements</li>
              <li>Edge cases</li>
              <li>Validation rules</li>
              <li>Security considerations</li>
              <li>Performance expectations</li>
              <li>Possible implementation approaches</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">2. System Design</h3>
            <p className="theme-muted mb-2">I design solutions before implementation by planning:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>REST API endpoints</li>
              <li>Database schema</li>
              <li>Service architecture</li>
              <li>Authentication and authorization</li>
              <li>Data relationships</li>
              <li>Error handling strategy</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">3. Database Design</h3>
            <p className="theme-muted mb-2">For PostgreSQL-based applications, I focus on:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Table design</li>
              <li>Relationships</li>
              <li>Constraints</li>
              <li>Indexes</li>
              <li>Query optimization</li>
              <li>Transaction management</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> PostgreSQL, ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">4. Backend Development</h3>
            <p className="theme-muted mb-2">I implement backend services using:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Node.js</li>
              <li>TypeScript</li>
              <li>Express.js</li>
              <li>PostgreSQL</li>
              <li>JWT Authentication</li>
              <li>Redis (where applicable)</li>
            </ul>
            <p className="theme-muted mt-2">During development I use AI to:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Explain unfamiliar concepts</li>
              <li>Explore implementation options</li>
              <li>Refactor code</li>
              <li>Improve readability</li>
              <li>Validate design decisions</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> Cursor, ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">5. Testing</h3>
            <p className="theme-muted mb-2">I prioritize testing to ensure software quality by writing:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Unit tests</li>
              <li>Integration tests</li>
              <li>API endpoint tests</li>
              <li>Authentication tests</li>
              <li>Validation tests</li>
              <li>Edge case tests</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> Mocha, Chai, ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">6. Debugging</h3>
            <p className="theme-muted mb-2">When issues occur, I investigate using:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Application logs</li>
              <li>Stack traces</li>
              <li>SQL analysis</li>
              <li>Runtime debugging</li>
              <li>AI-assisted root cause analysis</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> VS Code Debugger, ChatGPT (GPT-5.5)</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">7. Code Review</h3>
            <p className="theme-muted mb-2">Before opening a pull request, I review my code for:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Security</li>
              <li>Performance</li>
              <li>Maintainability</li>
              <li>Readability</li>
              <li>Scalability</li>
              <li>Best practices</li>
            </ul>
            <p className="theme-soft text-sm mt-2"><strong>Tools:</strong> ChatGPT (GPT-5.5), Claude Opus</p>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">8. Performance Optimization</h3>
            <p className="theme-muted">I continually look for opportunities to improve:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>SQL query performance</li>
              <li>API response time</li>
              <li>Memory usage</li>
              <li>Database indexing</li>
              <li>Efficient algorithms</li>
              <li>Caching strategies</li>
            </ul>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">9. Documentation</h3>
            <p className="theme-muted">I document:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>API endpoints</li>
              <li>Database models</li>
              <li>Technical decisions</li>
              <li>Setup instructions</li>
              <li>Architecture diagrams</li>
              <li>Project documentation</li>
            </ul>
          </div>

          <div>
            <h3 className="theme-heading text-xl font-semibold mb-2">10. Continuous Learning</h3>
            <p className="theme-muted">Technology evolves quickly, so I regularly study:</p>
            <ul className="theme-muted list-disc list-inside space-y-1">
              <li>Backend architecture</li>
              <li>Distributed systems</li>
              <li>Cloud services</li>
              <li>Database optimization</li>
              <li>Software design patterns</li>
              <li>Security best practices</li>
            </ul>
            <p className="theme-soft text-sm mt-2">AI helps me learn faster by explaining complex topics, comparing approaches, and summarizing documentation.</p>
          </div>
        </div>

        <div className="theme-panel mt-12 rounded-3xl p-8">
          <h3 className="theme-heading text-2xl font-semibold mb-4">AI-Assisted Engineering</h3>
          <p className="theme-muted mb-4">AI is an important part of my workflow, but it does not replace engineering judgment. I use it to:</p>
          <ul className="theme-muted list-disc list-inside space-y-2">
            <li>Analyze requirements</li>
            <li>Explore architecture options</li>
            <li>Review code</li>
            <li>Generate test ideas</li>
            <li>Debug issues</li>
            <li>Optimize SQL queries</li>
            <li>Explain unfamiliar technologies</li>
            <li>Improve documentation</li>
          </ul>
          <p className="theme-soft mt-4">Every suggestion is reviewed, tested, and adapted before becoming part of a production-ready solution.</p>
        </div>

        <div className="theme-panel mt-12 rounded-3xl p-8">
          <h3 className="theme-heading text-2xl font-semibold mb-4">My Development Stack</h3>
          <div className="theme-muted grid gap-6 md:grid-cols-2">
            <div>
              <p className="theme-heading font-semibold mb-2">Backend</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Node.js</li>
                <li>TypeScript</li>
                <li>Express.js</li>
                <li>PostgreSQL</li>
                <li>Redis</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
            <div>
              <p className="theme-heading font-semibold mb-2">Testing</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Mocha</li>
                <li>Chai</li>
              </ul>
            </div>
            <div>
              <p className="theme-heading font-semibold mb-2">DevOps & Tools</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Git</li>
                <li>GitHub</li>
                <li>Docker</li>
                <li>SonarCloud</li>
              </ul>
            </div>
            <div>
              <p className="theme-heading font-semibold mb-2">AI Tools</p>
              <ul className="list-disc list-inside space-y-1">
                <li>ChatGPT (GPT-5.5)</li>
                <li>Claude Opus</li>
                <li>Cursor</li>
                <li>GitHub Copilot</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
