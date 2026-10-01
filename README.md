# My Routine PWA

A GitHub Pages-ready Progressive Web App for the **My Routine** visualizer.

## Deploy with GitHub Pages

1. Create a new GitHub repository.
2. Upload **all files and folders inside this folder** to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Save and wait for GitHub Pages to publish the site.
6. Open the generated `https://...github.io/.../` URL in Chrome.
7. Choose **Install app** / **Add to Home screen**.

### Important
- Keep `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, and the `icons` folder in the repository root.
- The PWA requires HTTPS for service-worker registration. GitHub Pages provides HTTPS.
- If you change the app later, increment the cache name in `sw.js` (for example `my-routine-pwa-v3`) so installed copies update cleanly.

## Files

- `index.html` — app
- `manifest.webmanifest` — PWA manifest
- `sw.js` — service worker
- `icon-192.png` — app icon
- `icon-512.png` — app icon
- `.nojekyll` — GitHub Pages static-file marker
