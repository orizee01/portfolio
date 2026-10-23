# Portfolio

```
frontend/   Vite + React site          (npm run dev → :5180)
backend/    Express API (contact form) (npm run dev → :4000)
```

Run both from the project root: `npm run install:all` once, then `npm run dev` (backend + frontend together).
Or run each from its own folder with `npm run dev`. The frontend proxies `/api` to the backend, so the backend must be running.
Deploy each as its own Vercel project, setting **Root Directory** to `frontend` or `backend`.
See `backend/README.md` for env vars.
