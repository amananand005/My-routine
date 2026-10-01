# My Routine — Upgraded PWA

This package upgrades the original My Routine HTML app with:
- Web App Manifest with installability metadata
- 192px and 512px real PNG icons
- any + maskable icon declarations
- standalone display and portrait orientation
- app shortcut
- install prompt support (`beforeinstallprompt`)
- Android/iOS home-screen metadata
- versioned service worker with offline app-shell fallback
- cache cleanup on service-worker update

## Run
Serve the folder from HTTPS or localhost. A normal `file://` URL cannot register a service worker.

Example:
python -m http.server 8080

Then open:
http://localhost:8080

For phone installation, deploy to an HTTPS host (GitHub Pages, Netlify, Vercel, etc.) and use the browser's Install/Add to Home screen option.
