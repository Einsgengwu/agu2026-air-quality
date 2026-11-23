# AGU 2026 · Air quality research film

A mobile-first, static research-video page for a conference poster. No build step, framework, analytics, remote fonts, or runtime dependencies.

## Publish on GitHub Pages

1. Create a **public** GitHub repository and upload this folder's contents to its `main` branch. Keep `index.html` at the repository root. Include `assets/` and `.nojekyll`. Upload the MP4 as a regular Git file, not a Git LFS pointer.
2. Open **Settings → Pages → Build and deployment**. Choose **Deploy from a branch**, `main`, and `/ (root)`, then save.
3. Wait for the Pages deployment. Use the HTTPS URL shown by GitHub; leave **Enforce HTTPS** enabled. Open the page and start the video before printing the QR code.

For this project, the repository is https://github.com/Einsgengwu/agu2026-air-quality. The confirmed live URL and QR files are recorded below after deployment.

## Maintain

- **Text:** edit `index.html`. Research wording is based on the supplied conference abstract; that source document is not distributed.
- **Video:** replace `assets/research-introduction.mp4`. Change `?v=1` to `?v=2` in all three video URLs in `index.html` to refresh cached copies. Commit and push. Keep the page URL unchanged: the printed QR stays valid.
- **Cover:** replace `assets/video-poster.jpg` with a 16:9 image and update its filename if cache refresh is needed.
- **Poster / paper:** add actual public HTTPS URLs to the `resources` array at the top of `script.js`, e.g. `{ label: 'View the full poster', url: 'https://your-real-domain/poster.pdf' }`. Empty resources stay hidden. No placeholder links are displayed.
- Keep the GitHub account, repository name, and Pages path stable after printing. Renaming or disabling them can break the QR destination.

## Playback and mobile behavior

The original MP4 is copied byte-for-byte: 1920 × 1080, 68.011 seconds, 13,447,346 bytes, H.264 video and AAC audio. Its `moov` metadata already precedes the media data for progressive playback. No re-encoding or remuxing was needed.

The player uses `controls`, `playsinline`, and `preload="none"`; it does not autoplay or download the video deliberately before play. A small local cover loads first. The page uses relative asset URLs and works under a GitHub Pages project subpath.

Portrait screens show the complete 16:9 image without cropping. Landscape screens use a compact layout. Fullscreen requests a landscape orientation when the browser supports it; iOS uses native video fullscreen where available. Browsers and device rotation settings control whether orientation can be locked. A webpage cannot reliably force landscape at scan/open time. Native controls also work without JavaScript.

Desktop browser rendering and playback can be checked locally; actual iOS/Android behavior and conference-network throughput should be spot-checked on a phone before printing. GitHub Pages availability and speed can vary by network.

References: [GitHub publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [screen orientation support](https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation/lock).

## Local preview

Open `index.html` in a browser, or serve this directory with `python -m http.server 8000` and visit `http://localhost:8000`. Python's basic server is suitable for layout preview; use the live Pages site for byte-range/seek verification.

## QR printing

Generate QR files only from the confirmed final HTTPS webpage URL. Use SVG for poster layout, or the high-resolution PNG at its original resolution. Preserve its four-module white quiet zone; use black on white, with no overlaid logo. Print at least 35 mm square and test a scan from the final poster proof. The QR links to the webpage, not the MP4, so video replacements do not change it.
