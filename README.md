# Portfolio

```
frontend/   Vite + React site          (npm run dev → :5173)
backend/    Express API (contact form) (npm run dev → :4000)
```

Run each from its own folder: `npm install && npm run dev`. The frontend proxies `/api` to the backend in dev.
Deploy each as its own Vercel project, setting **Root Directory** to `frontend` or `backend`.
See `backend/README.md` for env vars.
