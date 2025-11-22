# Player Match Search

A React application for searching and viewing player matches using Supabase.

## Features

- Search players by nickname or discriminator
- View player match history
- Responsive design with Tailwind CSS
- Optimized rendering with React.memo
- GitHub Pages deployment

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Run development server:
```bash
npm run dev
```

## GitHub Pages Deployment

The project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup Instructions:

1. **Enable GitHub Pages (IMPORTANT - Do this first!):**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (in the left sidebar)
   - Under **"Source"**, select **"GitHub Actions"** (NOT "Deploy from a branch")
   - If you don't see "GitHub Actions" option, make sure you have admin access to the repository
   - Save the settings

2. **Add Secrets:**
   - Go to Settings → Secrets and variables → Actions
   - Add the following secrets:
     - `VITE_SUPABASE_URL` - Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

3. **Deploy:**
   - Push to `main` or `master` branch
   - The workflow will automatically build and deploy to GitHub Pages
   - Your site will be available at: `https://{username}.github.io/{repo-name}/`

### Manual Deployment:

You can also trigger deployment manually:
- Go to Actions tab
- Select "Build and Deploy to GitHub Pages"
- Click "Run workflow"

## Build

```bash
npm run build
```

The build output will be in the `dist` directory.
