#!/usr/bin/env bash
# One-time setup for CD: copies the production settings into the GitHub repo's "production"
# environment, reading the same .env / .env.aws files deploy.sh uses. Needs the GitHub CLI
# logged in (gh auth login). Re-run after changing any of these values.
# Run from the backend folder:  ./deploy/set-github-secrets.sh
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="orizee01/portfolio"
ENVIRONMENT="production"
set -a; . ./.env; . ./.env.aws; set +a
: "${ADMIN_PASSWORD:?missing in .env.aws}" "${SESSION_SECRET:?missing in .env.aws}"
: "${RESEND_API_KEY:?missing in .env}" "${RESEND_TO_EMAIL:?missing in .env}"

ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
gh api --method PUT "repos/${REPO}/environments/${ENVIRONMENT}" >/dev/null

# Not secret: visible in logs is fine.
gh variable set AWS_DEPLOY_ROLE_ARN --repo "$REPO" --env "$ENVIRONMENT" --body "arn:aws:iam::${ACCOUNT}:role/portfolio-github-deploy"
gh variable set ALLOWED_ORIGINS --repo "$REPO" --env "$ENVIRONMENT" --body "$ALLOWED_ORIGINS"
gh variable set RESEND_TO_EMAIL --repo "$REPO" --env "$ENVIRONMENT" --body "$RESEND_TO_EMAIL"
gh variable set RESEND_FROM_EMAIL --repo "$REPO" --env "$ENVIRONMENT" --body "${RESEND_FROM_EMAIL:-onboarding@resend.dev}"

# Secret: encrypted by GitHub, masked in logs. Values are piped, never put on the command line.
printf %s "$RESEND_API_KEY" | gh secret set RESEND_API_KEY --repo "$REPO" --env "$ENVIRONMENT"
printf %s "$ADMIN_PASSWORD" | gh secret set ADMIN_PASSWORD --repo "$REPO" --env "$ENVIRONMENT"
printf %s "$SESSION_SECRET" | gh secret set SESSION_SECRET --repo "$REPO" --env "$ENVIRONMENT"

echo "GitHub environment '${ENVIRONMENT}' is configured for ${REPO}."
