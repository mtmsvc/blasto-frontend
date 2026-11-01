# Deploying to the server (Azure VM with Docker + Caddy)

How it fits together:

```
visitor ──HTTPS──▶ main Caddy (on the VM, already running)
                     ├─ /applications ──▶ backend
                     └─ everything else ──▶ blasto-frontend container (port 8080)
                                             = Caddy serving the static site
```

The frontend container has the built website inside, the old-address
redirects (`redirects.caddy`) and the 404 page. The main Caddy only adds
HTTPS and splits traffic between the frontend and the backend.

## First deployment

1. **Get the code on the VM**

   ```bash
   git clone https://github.com/mtmsvc/blasto-frontend.git
   ```

   ```bash
   cd blasto-frontend
   ```

2. **Build and start the frontend container**

   ```bash
   docker compose -f deploy/docker-compose.yml up -d --build
   ```

   Check it: `curl -I http://localhost:8080/lv/` should answer `200`.

3. **Connect the main Caddy.** Copy the blocks from
   `deploy/Caddyfile.server-example` into the server's main Caddyfile, set
   the backend address, then reload Caddy:

   ```bash
   caddy reload --config /etc/caddy/Caddyfile
   ```

   (If Caddy runs in Docker: `docker exec <caddy-container> caddy reload --config /etc/caddy/Caddyfile`.)

4. **Point the domain to the VM.** At the DNS provider of blasto.lv, set
   the `A` records of `blasto.lv` and `www.blasto.lv` to the VM's public IP.
   ⚠️ Change **only** those records: keep the `MX`/`TXT` records, or email
   for the domain may stop working. Caddy requests the HTTPS certificate on
   the first visit after DNS has switched.

5. **Azure:** the VM's network security group must allow inbound ports 80
   and 443 (probably already open if Caddy serves other sites).

## Updating the site

```bash
git pull
```

```bash
docker compose -f deploy/docker-compose.yml up -d --build
```

The old container keeps serving until the new one is built, so there is
almost no downtime. To go back to an earlier version: `git checkout <commit>`
and run the same command.

## Checks after a deployment

- `https://blasto.lv/` → opens `/lv/`
- An old address, e.g. `https://blasto.lv/b-kategorija/` → `/lv/kategorijas/b/`
- Send a test application → the backend receives it and the form shows
  "Paldies!" (needs the backend to answer `201`).
- `https://blasto.lv/nothing-here/` → the site's 404 page.

## Without Docker

`npm run build` produces the `out/` folder. Copy it to the server (e.g.
`/srv/blasto`) and use this instead of `reverse_proxy localhost:8080` in
the main Caddyfile:

```
handle {
	root * /srv/blasto
	import /path/to/deploy/redirects.caddy
	redir / /lv/ permanent
	file_server
}
```
