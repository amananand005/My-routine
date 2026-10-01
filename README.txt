# My Routine — PWA

## Included
- `index.html` — your routine app
- `manifest.webmanifest` — installable PWA metadata
- `sw.js` — service worker for app-shell/offline caching
- `icon-192.svg` and `icon-512.svg` — PWA icons

## Important
A service worker cannot be installed from a normal `file://` URL. Serve this folder over HTTPS or localhost.

Examples:
- GitHub Pages / Netlify / Vercel: upload the folder and open the HTTPS URL.
- Local testing: run a static server such as `python -m http.server 8080` and open `http://localhost:8080`.

On a supported browser, use **Add to Home screen / Install app**.
