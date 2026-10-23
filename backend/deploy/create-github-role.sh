#!/usr/bin/env bash
# One-time setup for CD: lets GitHub Actions deploy the backend without stored AWS keys.
# Creates (if missing) GitHub's OIDC identity provider and the IAM role "portfolio-github-deploy",
# which only the "production" environment of github.com/orizee01/portfolio can assume, with the
# same limited permissions as portfolio-deployer (deployer-policy.json).
# Run once with admin credentials, from the backend folder:  ./deploy/create-github-role.sh
set -euo pipefail
cd "$(dirname "$0")"

REPO="orizee01/portfolio"
ROLE="portfolio-github-deploy"
ACCOUNT=$(aws sts get-caller-identity --query Account --output text)
PROVIDER_ARN="arn:aws:iam::${ACCOUNT}:oidc-provider/token.actions.githubusercontent.com"

if ! aws iam get-open-id-connect-provider --open-id-connect-provider-arn "$PROVIDER_ARN" >/dev/null 2>&1; then
  aws iam create-open-id-connect-provider \
    --url https://token.actions.githubusercontent.com \
    --client-id-list sts.amazonaws.com \
    --tags Key=project,Value=portfolio >/dev/null
  echo "Created GitHub OIDC provider."
fi

TRUST=$(cat <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "${PROVIDER_ARN}" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:${REPO}:environment:production"
      }
    }
  }]
}
EOF
)

if aws iam get-role --role-name "$ROLE" >/dev/null 2>&1; then
  aws iam update-assume-role-policy --role-name "$ROLE" --policy-document "$TRUST"
else
  aws iam create-role --role-name "$ROLE" --assume-role-policy-document "$TRUST" \
    --max-session-duration 3600 --tags Key=project,Value=portfolio >/dev/null
fi
aws iam put-role-policy --role-name "$ROLE" \
  --policy-name portfolio-backend-deploy --policy-document file://deployer-policy.json

echo "Role ready: arn:aws:iam::${ACCOUNT}:role/${ROLE}"
