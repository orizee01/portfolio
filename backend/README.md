# Portfolio backend

Express API for the portfolio. Self-contained project (own `package.json` and dependencies), a sibling of `frontend/`.

| Route | Description |
| --- | --- |
| `GET /api/health` | Liveness check |
| `POST /api/upload` | multipart field `image` (JPEG/PNG/GIF/WebP, ≤5MB), header `Authorization: Bearer $UPLOAD_TOKEN` → `{ url }`. Add `?folder=profile` to set the site's profile photo |
| `GET /api/profile-image` | Public. `{ url }` of the current profile photo (or `null`) |
| `DELETE /api/profile-image` | Bearer token. Removes the profile photo |
| `POST /api/contact` | `{ name, email, message }` → emails the owner via Resend |

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
set -a; . ./.env; . ./.env.aws; set +a     # RESEND_*, UPLOAD_TOKEN
ALLOWED_ORIGINS=https://your-site.com ./deploy/deploy.sh   # re-run to update code or settings
aws cloudformation delete-stack --stack-name portfolio-backend   # tear down (empty the bucket first)
```
The API URL is printed at the end. Set it as `VITE_API_URL` on the frontend.
