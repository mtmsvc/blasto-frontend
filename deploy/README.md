# Deploying

The site is plain static files, served by the existing Caddy server at
**blasto.me**.

1. Build the site:

   ```bash
   npm run build
   ```

2. Copy the contents of the `out/` folder to the folder Caddy serves for
   blasto.me.

`redirects.caddy` (old blasto.lv addresses → new pages) is kept here for
later use.
