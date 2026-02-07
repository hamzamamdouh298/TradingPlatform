# GitHub Pages Deployment

## Branch strategy

| Branch     | Purpose                    | Contents                    |
|-----------|----------------------------|-----------------------------|
| **main**  | Development / source code  | Source only (no `dist`)     |
| **gh-pages** | Production site         | Build output only (`dist`) |

- **Do not** merge `gh-pages` into `main`.
- **Do not** open PRs from `gh-pages` to `main`.
- GitHub Pages must use the **gh-pages** branch as the source.

## Live site

**https://hamzamamdouh298.github.io/TradingPlatform**

## Deploy steps (local)

1. **Ensure you're on `main`** and have the latest source:
   ```bash
   git checkout main
   git pull origin main
   ```

2. **Install dependencies** (if needed):
   ```bash
   npm install
   ```

3. **Build and deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```
   This runs `predeploy` (builds into `dist`) then pushes **only** the contents of `dist` to the `gh-pages` branch.

## GitHub repository settings

1. **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` / `/(root)`
4. Save

## Notes

- `dist` is in `.gitignore` and must **not** be committed to `main`.
- The app uses `base: '/TradingPlatform/'` in Vite so it works under the project path on GitHub Pages.
