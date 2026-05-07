# Vyuhaa Video Studio — Electron Wrapper

Professional video editor for medical researchers and medtech teams.
Built on OpenReel · Powered by Vyuhaa Med Data.

## Repository Structure

This folder (`electron-wrapper/`) sits alongside the OpenReel source:

```
your-repo/
├── apps/
│   └── web/          ← OpenReel web app (unchanged)
├── packages/         ← OpenReel packages (unchanged)
├── electron-wrapper/ ← This folder
│   ├── electron/
│   │   └── main.js   ← Electron main process
│   ├── build/
│   │   ├── icon.ico  ← Vyuhaa icon (Windows)
│   │   ├── icon.png  ← Vyuhaa icon (Linux/Mac)
│   │   └── installer.nsh ← NSIS branding
│   ├── .github/
│   │   └── workflows/
│   │       └── build.yml ← GitHub Actions
│   └── package.json
└── package.json      ← OpenReel root
```

## Setup (One-time)

### 1. Push OpenReel + this wrapper to a GitHub repo

```bash
# In the openreel-video-main folder:
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-ORG/vyuhaa-video-studio.git
git push -u origin main
```

### 2. Update the workflow path

In `.github/workflows/build.yml`, the workflow expects the electron wrapper
to be in `electron-wrapper/`. Move this folder there or adjust the paths.

### 3. Trigger a build

**Option A — Automatic (on tag):**
```bash
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions will build the `.exe` and attach it to a GitHub Release automatically.

**Option B — Manual:**
Go to your GitHub repo → Actions → Build Vyuhaa Video Studio → Run workflow.

### 4. Download the .exe

After the build completes (~10-15 mins):
- Go to your repo → **Releases** → download `VyuhaaVideoStudio-Setup.exe`
- Or go to **Actions** → click the build → **Artifacts** → download

## Add download link to website

Once you have the `.exe` URL from GitHub Releases, add it to the Vyuhaa
website Applications page. The URL format will be:
```
https://github.com/YOUR-ORG/vyuhaa-video-studio/releases/latest/download/VyuhaaVideoStudio-Setup.exe
```

## What the installer does

- Installs Vyuhaa Video Studio to Program Files
- Creates Desktop and Start Menu shortcuts
- Adds uninstaller to Windows Apps & Features
- Shows Vyuhaa branding throughout installation

## Features for researchers

- Multi-track video timeline
- Auto-captions / subtitle tools
- Color grading and effects
- GPU-accelerated export (H.264, H.265, WebM)
- 100% offline — files never leave your computer
- No subscription, no watermarks
