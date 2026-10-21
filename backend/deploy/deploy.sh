#!/usr/bin/env bash
# Deploys the backend to AWS (stack: portfolio-backend). Run from the backend folder:
#   UPLOAD_TOKEN=... RESEND_API_KEY=... RESEND_TO_EMAIL=... ALLOWED_ORIGINS=https://site.com ./deploy/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

: "${UPLOAD_TOKEN:?set UPLOAD_TOKEN}" "${RESEND_API_KEY:?set RESEND_API_KEY}" "${RESEND_TO_EMAIL:?set RESEND_TO_EMAIL}"
STACK=portfolio-backend
export AWS_REGION="${AWS_REGION:-us-east-1}"
# Deploy with the dedicated, least-privilege user (see create-deployer.sh), not an admin profile.
export AWS_PROFILE="${AWS_PROFILE:-portfolio}"

aws cloudformation deploy \
  --stack-name "$STACK" \
  --template-file deploy/template.yaml \
  --capabilities CAPABILITY_NAMED_IAM \
  --tags project=portfolio \
  --no-fail-on-empty-changeset \
  --parameter-overrides \
    "AllowedOrigins=${ALLOWED_ORIGINS:-http://localhost:5173}" \
    "UploadToken=$UPLOAD_TOKEN" \
    "ResendApiKey=$RESEND_API_KEY" \
    "ResendToEmail=$RESEND_TO_EMAIL" \
    "ResendFromEmail=${RESEND_FROM_EMAIL:-onboarding@resend.dev}"

BUILD=$(mktemp -d)
trap 'rm -rf "$BUILD"' EXIT
cp -R src package.json package-lock.json "$BUILD"/
(cd "$BUILD" && npm ci --omit=dev --silent && zip -qr function.zip src node_modules package.json)

aws lambda update-function-code --function-name portfolio-backend --zip-file "fileb://$BUILD/function.zip" >/dev/null
aws lambda wait function-updated --function-name portfolio-backend

aws cloudformation describe-stacks --stack-name "$STACK" --query "Stacks[0].Outputs" --output table
