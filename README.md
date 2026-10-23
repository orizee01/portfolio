# Portfolio

```
frontend/   Vite + React site          (npm run dev → :5180)
backend/    Express API (contact form) (npm run dev → :4000)
```

Run both from the project root: `npm run install:all` once, then `npm run dev` (backend + frontend together).
Or run each from its own folder with `npm run dev`. The frontend proxies `/api` to the backend, so the backend must be running.
Deploy each as its own Vercel project, setting **Root Directory** to `frontend` or `backend`.
See `backend/README.md` for env vars.

## CI/CD (GitHub Actions)
| Workflow | When | What |
| --- | --- | --- |
| `ci.yml` | Every pull request and push to `main` | Frontend build, backend tests (`npm test`), dependency audit, CloudFormation lint |
| `deploy-backend.yml` | Push to `main` that changes `backend/`, or run manually | Runs CI, then deploys the backend to AWS and health-checks the live API |

The frontend is deployed by Vercel on every push to `main`.

**One-time setup for backend deploys** (from `backend/`):
1. `./deploy/create-github-role.sh` with admin AWS credentials: creates the role GitHub assumes via OIDC (no AWS keys stored in GitHub).
2. `gh auth login`, then `./deploy/set-github-secrets.sh`: copies the production settings from `.env` / `.env.aws` into the repo's `production` environment.

