# apesonus.com

The APESONUS root website: the brand front door. Static HTML and CSS, exported from the approved design. No framework, no build step.

    index.html          the site
    styles.css          the site's styles
    assets/shim.webp    Shim composition
    assets/icon-512.png favicon and apple-touch-icon
    assets/og-image.jpg OG and X share image, 1200x630
    robots.txt, sitemap.xml
    server.js           dependency-free static server so it deploys anywhere Node runs

The app is a separate project at https://music.apesonus.com. This site only links to it through ENTER THE CLINIC.

## Run locally

    npm start
    open http://localhost:3000

## Deploy on Railway

1. New project → Deploy from GitHub repo → this repo. Railway detects package.json and runs `npm start`.
2. Settings → Networking → Custom Domain → `apesonus.com` (and `www.apesonus.com` if wanted). Add the CNAME Railway shows at your DNS provider.
3. Nothing else. There are no environment variables.

## Going live with the token

In `index.html` find:

    <div class="token" id="token" data-contract="" data-ticker="">

Paste the complete contract address into `data-contract` (optionally the ticker into `data-ticker`, e.g. `$SHIM`). The block then shows the ticker, `CA: <full address>` and a COPY CA button. Leave `data-contract` empty and it keeps showing TOKEN — COMING SOON. Never truncate the address.
