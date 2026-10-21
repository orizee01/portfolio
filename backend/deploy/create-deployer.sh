#!/usr/bin/env bash
# One-time setup: creates the IAM user "portfolio-deployer" (permissions limited to the
# portfolio-backend stack, see deployer-policy.json) and saves its keys as the AWS CLI
# profile "portfolio". Run it with your admin credentials, from the backend folder.
set -euo pipefail
cd "$(dirname "$0")"

aws iam create-user --user-name portfolio-deployer --tags Key=project,Value=portfolio >/dev/null
aws iam put-user-policy --user-name portfolio-deployer \
  --policy-name portfolio-backend-deploy --policy-document file://deployer-policy.json

read -r KEY_ID SECRET < <(aws iam create-access-key --user-name portfolio-deployer \
  --query "AccessKey.[AccessKeyId,SecretAccessKey]" --output text)
aws configure set aws_access_key_id "$KEY_ID" --profile portfolio
aws configure set aws_secret_access_key "$SECRET" --profile portfolio
aws configure set region us-east-1 --profile portfolio

echo "Created portfolio-deployer; keys saved to AWS CLI profile 'portfolio'."
