// apesonus.com · static front door.
// A dependency-free static file server so the site deploys on Railway (or any
// Node host) with nothing to install. There is no build step: the files in
// this folder are the site.
const http = require("http")
const fs = require("fs")
const path = require("path")

const ROOT = __dirname
const PORT = Number(process.env.PORT || 3000)
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
}

http
  .createServer((req, res) => {
    let url = decodeURIComponent((req.url || "/").split("?")[0])
    if (url === "/") url = "/index.html"
    const file = path.normalize(path.join(ROOT, url))
    // Never serve anything outside this folder, and never the server itself.
    if (!file.startsWith(ROOT) || path.basename(file) === "server.js" || path.basename(file) === "package.json") {
      res.writeHead(404); return res.end("Not found")
    }
    fs.stat(file, (err, st) => {
      if (err || !st.isFile()) {
        res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" })
        return res.end("<!doctype html><title>APESONUS</title><p>Not found. <a href=\"/\">apesonus.com</a></p>")
      }
      const ext = path.extname(file).toLowerCase()
      const cache = ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable"
      res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream", "Cache-Control": cache })
      fs.createReadStream(file).pipe(res)
    })
  })
  .listen(PORT, () => console.log(`apesonus.com on :${PORT}`))
