# Portfolio backend

Express API for the portfolio. Self-contained project (own `package.json` and dependencies), a sibling of `frontend/`.

| Route | Description |
| --- | --- |
| `GET /api/health` | Liveness check |
| `POST /api/auth/login` | `{ username, password }` → `{ token }` (7-day admin session). 10 attempts / 15 min per IP |
| `GET /api/auth/me` | `{ admin: true }` when the Bearer session is valid |
| `POST /api/upload` | multipart field `image` (JPEG/PNG/GIF/WebP, ≤5MB), admin session (`Authorization: Bearer <token from /api/auth/login>`) → `{ url }`. Add `?folder=profile` to set the site's profile photo, or `?project=<id>` to set a project's picture |
| `GET /api/profile-image` | Public. `{ url }` of the current profile photo (or `null`) |
| `DELETE /api/profile-image` | Admin. Removes the profile photo |
| `GET /api/project-images?ids=a,b` | Public. `{ images: { id: url } }` for projects with an uploaded picture |
| `DELETE /api/project-images/:id` | Admin. Removes a project's picture (back to the default) |
| `GET /api/messages` | Admin. Saved contact messages, newest first |
| `DELETE /api/messages/:id` | Admin. Deletes one message |
| `POST /api/contact` | `{ name, email, message }` → saves the message (S3 / `data/`) and emails the owner via Resend |

## Run locally
```
npm install
cp .env.example .env   # fill in the Resend values
npm run dev            # http://localhost:4000
```
The Vite dev server proxies `/api` to port 4000.

## Deploy
Deploy as its own Vercel project with **Root Directory** set to `backend`
(Vercel detects Express from `src/index.js`), then set the env vars from
`.env.example`. Set `VITE_API_URL` on the frontend project to the backend's URL.

## Deploy to AWS (Lambda + Function URL + S3)
One-time: run `./deploy/create-deployer.sh` with admin credentials. It creates the IAM user
`portfolio-deployer` (access limited to this stack) and the AWS CLI profile `portfolio`, which `deploy.sh` uses.

Stack `portfolio-backend` (us-east-1) is defined in `deploy/template.yaml`; images are stored in S3.
```
set -a; . ./.env; . ./.env.aws; set +a     # RESEND_*, ADMIN_PASSWORD, SESSION_SECRET
./deploy/deploy.sh   # re-run to update code or settings (production settings live in .env.aws)
aws cloudformation delete-stack --stack-name portfolio-backend   # tear down (empty the bucket first)
```
The API URL is printed at the end. Set it as `VITE_API_URL` on the frontend.

## Admin account
The site has one admin (`ADMIN_USERNAME`, default `admin`). Only the scrypt hash of the password is stored.
- Local: `ADMIN_PASSWORD_HASH` in `.env`. To change the password: `npm run hash-password -- '<new password>'`, paste the output into `.env` (in single quotes).
- Production: `ADMIN_PASSWORD` in `.env.aws`. `deploy.sh` hashes it, so only the hash reaches AWS. Edit it and redeploy to change it.
- Changing `SESSION_SECRET` logs the admin out everywhere.
