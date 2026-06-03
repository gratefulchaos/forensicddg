# ForensicDDG website — How to make changes and push them live

**Read this first in any new AI chat.** It explains how this site is set up and the exact
steps to edit it and deploy changes to the live site.

---

## The 30-second summary

- The website is a single static page: `index.html` (+ `assets/` for images).
- It lives in a **GitHub repo**, and **Netlify auto-deploys** whatever is on the `main` branch.
- **To publish a change: edit `index.html`, commit, and `git push`. That's it.**
  Netlify rebuilds and the live site updates in ~30–60 seconds.

There is NO build step, no framework. What you see in `index.html` is what ships.

---

## The setup (so a new chat has full context)

| Thing | Value |
|-------|-------|
| Live site | https://forensicddg.com (and https://www.forensicddg.com) |
| Local folder | `c:\FDDG` |
| Main file | `index.html` (the entire site) |
| Images | `assets/images/` (e.g. `FDDM_Trademark_v1.png` is the logo) |
| GitHub repo | https://github.com/gratefulchaos/forensicddg (public) |
| GitHub user | `gratefulchaos` |
| Netlify project | `forensicddg` → `forensicddg.netlify.app`, in the **DDF** team |
| Deploy trigger | Push to `main` on GitHub → Netlify auto-deploys |
| DNS | **Netlify DNS** (nameservers `dns1-4.p04.nsone.net`). Domain registered at GoDaddy, but GoDaddy only holds the registration — DNS is managed in Netlify. |
| Email | `@forensicddg.com` email runs through GoDaddy/secureserver.net. DNS records for it (MX/SPF/DKIM/DMARC) live in the Netlify DNS zone. **Do not touch these** when changing the website. |

Files NOT published (excluded via `.gitignore`): draft PNGs, notes (`.txt`/`.md`),
`index_v2.html`. Only `index.html` + `assets/images/` go live.

---

## How to make a change (the normal workflow)

In a new chat, just tell the AI what you want changed — e.g.
*"Change the tagline to X"*, *"Add a services section"*, *"Update the email address"*.
The AI should then:

1. **Edit `index.html`** (or the relevant file) in `c:\FDDG`.
2. **Commit and push** with these commands (PowerShell, from `c:\FDDG`):

   ```powershell
   git add -A
   git commit -m "Describe the change here"
   git push
   ```

3. **Confirm it deployed.** Netlify auto-builds on push. After ~1 minute, verify the live
   site updated (load https://forensicddg.com in an incognito window, or the AI can fetch it).

That's the whole loop. No drag-and-drop, no Netlify dashboard needed for content changes.

---

## Useful commands / checks (for the AI)

```powershell
# Is git connected to GitHub?  (run from c:\FDDG)
git remote -v          # should show origin = github.com/gratefulchaos/forensicddg
git status             # see uncommitted changes
git log --oneline -5   # recent deploys

# gh CLI lives here if PATH isn't set:
& "$env:ProgramFiles\GitHub CLI\gh.exe" --version
```

Verify the live site is serving the latest (checks content, ignores local DNS cache):
```powershell
# Quick: just load the netlify.app URL — always the freshest copy of the deployed site
#   https://forensicddg.netlify.app
```

---

## Things to be careful about

- **Don't edit DNS for content changes.** Content = just push to GitHub. DNS in Netlify only
  matters for the domain itself / email, which is already done and working.
- **Don't touch the email DNS records** (MX, `_dmarc`, `secureserver*._domainkey`, the SPF TXT)
  in Netlify — they keep `@forensicddg.com` email working.
- **The logo path** is `assets/images/FDDM_Trademark_v1.png`. If you add images, put them in
  `assets/images/` and reference them with that relative path.
- If `git push` asks for credentials, the GitHub login is `gratefulchaos` (auth was set up via
  `gh auth login`). If auth is lost, re-run `gh auth login` in a terminal.

---

## History / why it's set up this way

- Site deployed from GitHub (not drag-and-drop) so every change auto-publishes on push.
- Repo is **public** to avoid Netlify's free-plan single-contributor limit on private repos.
- DNS was moved from GoDaddy to **Netlify DNS** because GoDaddy's free Website Builder was
  intercepting `forensicddg.com` at the platform level and couldn't be unpublished. Moving
  nameservers to Netlify took the domain out of GoDaddy's control. (See
  `DNS_BACKUP_before_netlify.md` for the original GoDaddy DNS records.)
