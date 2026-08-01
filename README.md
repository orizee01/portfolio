# portfolio

Configuration
-
If you use AI features in this project, create a `.env` file (not checked into git) with your OpenAI API key and preferred model. Example variables are provided in `.env.example`.

Recommended values:
- `OPENAI_MODEL=gpt-5-mini` (safe default chat model)
- `OPENAI_API_KEY=your_api_key_here`

Note: ChatGPT-only accounts cannot use Codex-only models such as `gpt-5.5-codex`. Use a supported chat or code-capable model tied to your API key.
## Deploying to Vercel

This project is configured for Vercel static deployment using `dist` as the output directory.

1. Install the Vercel CLI if you do not have it already:

```bash
npm install -g vercel
```

2. Build the project:

```bash
npm run build
```

3. Deploy to Vercel:

```bash
vercel
```

4. When prompted for project settings, use:
- Framework: `Other`
- Output directory: `dist`

If you prefer, you can also deploy from the Vercel dashboard by importing this repository and setting the build command to `npm run build` and the output directory to `dist`.
