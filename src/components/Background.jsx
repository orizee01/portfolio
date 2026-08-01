import React from 'react'

export default function Background() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <style>{`
        .animated-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 20%, rgba(124,58,237,0.16), transparent 12%),
                      radial-gradient(circle at 80% 80%, rgba(236,72,153,0.12), transparent 12%),
                      radial-gradient(circle at 50% 50%, rgba(59,130,246,0.09), transparent 18%);
          animation: bgShift 24s ease-in-out infinite;
          transform-origin: center;
          filter: blur(72px);
          will-change: transform, opacity;
        }

        @keyframes bgShift {
          0% { transform: translate3d(0,0,0) scale(1); opacity: .85; }
          50% { transform: translate3d(-16px,-20px,0) scale(1.04); opacity: 1; }
          100% { transform: translate3d(0,0,0) scale(1); opacity: .85; }
        }

        .rotating-ring {
          transform-origin: 50% 50%;
          animation: spin 40s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .floating-dot { animation: floatAnim 6s ease-in-out infinite; }
        .floating-dot:nth-child(2) { animation-delay: 1.2s; }
        .floating-dot:nth-child(3) { animation-delay: 2.4s; }
        .floating-dot:nth-child(4) { animation-delay: 3.6s; }

        @keyframes floatAnim {
          0% { transform: translateY(0); opacity: .55 }
          50% { transform: translateY(-24px); opacity: 1 }
          100% { transform: translateY(0); opacity: .55 }
        }
      `}</style>

      <div className="animated-bg" />
      <svg className="absolute left-1/4 top-10 opacity-30 blur-3xl" width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="200" fill="url(#g1)" />
      </svg>
      {/* subtle rotating ring */}
      <svg className="absolute left-0 top-1/4 opacity-20 -z-10 rotating-ring" width="700" height="700" viewBox="0 0 700 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="ringGrad" cx="0.5" cy="0.5">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="350" cy="350" r="220" stroke="url(#ringGrad)" strokeWidth="18" fill="none" strokeLinecap="round" />
      </svg>
      <svg className="absolute right-10 bottom-[-80px] opacity-25 blur-3xl" width="500" height="500" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <rect x="50" y="50" width="500" height="500" rx="120" fill="url(#g2)" />
      </svg>

      {/* floating twinkle dots */}
      <svg className="absolute left-1/2 top-24 opacity-60 -z-10" width="380" height="200" viewBox="0 0 380 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g fill="#ffffff">
          <circle className="floating-dot" cx="40" cy="160" r="3" fillOpacity="0.25" />
          <circle className="floating-dot" cx="110" cy="140" r="4" fillOpacity="0.18" />
          <circle className="floating-dot" cx="200" cy="170" r="2.5" fillOpacity="0.22" />
          <circle className="floating-dot" cx="280" cy="150" r="3.5" fillOpacity="0.2" />
        </g>
      </svg>
    </div>
  )
}
