import serverless from "serverless-http";
import app from "./index.js";

// AWS Lambda entry point (Function URL / API Gateway payloads).
export const handler = serverless(app);
