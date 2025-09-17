<<<<<<< HEAD
<div align="center">
	<h1>🍅 Pomodoro Timer (Next.js + TypeScript)</h1>
	<p>Focus / Break cycles with configurable lengths, drift‑proof timing, and responsive UI.</p>
</div>

## ✨ Features

- Work / Short Break / Long Break cycle (long break every 4 sessions)
- Adjustable lengths with safe min/max bounds
- Drift‑proof timer (survives background tab throttling & unfocus)
- Start / Pause / Reset / Skip (skip advances to next phase)
- Session completion counter + basic stats
- Visual mode styling (focus / short break / long break)
- Accessible + / − controls (keyboard & screen reader friendly)
- Alert notifications (in‑app banner)
- Responsive layout (mobile → desktop)

## 🧠 Drift‑Proof Timing Explained

Browsers throttle `setInterval` in background tabs. Instead of subtracting 1 second blindly, this app stores a target end timestamp (`Date.now() + duration`). Each tick computes `timeLeft = targetEnd - now`. When the tab refocuses, it recalculates instantly—keeping accurate elapsed time even if a tab was inactive for minutes.

## 🕹 Controls

| Control | Behavior |
|---------|----------|
| Start / Pause | Toggles running state of current segment |
| Reset | Stops timer & restores full remaining length for current mode |
| Skip | Immediately advances to next mode (only visible when `onSkip` provided) |
| − / + | Decrease / increase lengths (disabled while running) |

## ⚙️ Default Durations (minutes)

| Mode | Default | Min | Max |
|------|---------|-----|-----|
| Work Session | 25 | 1 | 60 |
| Short Break | 5 | 1 | 30 |
| Long Break | 15 | 5 | 60 |

## 📂 Key Files

| File | Purpose |
|------|---------|
| `src/components/PomodoroTimer.tsx` | Orchestrates state & workflow |
| `src/components/TimerDisplay.tsx` | Renders formatted time + progress styles |
| `src/components/LengthSetting.tsx` | Adjustable length rows |
| `src/components/Controls.tsx` | Start / Pause / Reset / Skip buttons |
| `src/components/Alert.tsx` | Temporary banner notifications |
| `src/components/Button.tsx` | Reusable styled button |

## 🚀 Development

```bash
npm install       # install deps
npm run dev       # start dev server (localhost:3000)
npm run build     # production build
npm start         # run built app (after build)
```

Open: http://localhost:3000

## 🌐 Access on Local Network (LAN)

Next.js 15 removed the deprecated `--host` flag. To expose dev server on your LAN in **PowerShell**:

```powershell
$env:HOST="0.0.0.0"
$env:PORT="3000"   # optional
npm run dev
```

Then from another device on the same Wi‑Fi: `http://YOUR_LAN_IP:3000`

Find your IP (Windows):
```powershell
ipconfig | findstr /i "IPv4"
```

If not reachable:
- Allow Node.js through Windows Firewall (prompt) or create a rule
- Ensure same subnet & no VPN isolation
- Avoid using `localhost` from other devices

### Temporary Public Tunnel (Optional)
```bash
npx localtunnel --port 3000
# or
npx cloudflared tunnel --url http://localhost:3000
```

## ☁️ Deployment Options

| Option | Notes |
|--------|-------|
| Vercel | Easiest (auto builds, previews, custom domain) |
| Static Export* | Works if only client state (currently fine) → `next build && next export` |
| VPS (Nginx + PM2) | Full control; reverse proxy + HTTPS |
| Docker | Containerize for portability |

Static export command:
```bash
npm run build
npx next export -o out
```
Deploy `out/` to Netlify, S3+CloudFront, etc.

## 🔐 Production Hardening (If Self‑Hosting)
- Serve only production build (`npm run build && npm start`)
- Add HTTPS (Let’s Encrypt / Cloudflare proxy)
- Use a reverse proxy (Nginx / Caddy) if exposing publicly
- Consider a service manager (PM2, systemd) for uptime

## 🧪 Testing (Optional Future Work)
Suggested test stack: Jest + Testing Library (component behavior, timing rollover, mode transitions, accessibility roles).

## 🗺 Future Improvements
- Sound notifications / desktop notifications
- Auto-start next session toggle
- Long break scheduling customization (e.g., every N sessions)
- Persist settings to `localStorage`
- PWA (offline + installable) / service worker for background countdown notification
- Analytics of cumulative focus time

## ❓ Troubleshooting
| Issue | Fix |
|-------|-----|
| Timer jumps after refocus | Expected: drift-proof resyncs using timestamp |
| Buttons disabled unexpectedly | Timer is running—pause to adjust values |
| Another device can’t reach site | Check firewall, ensure HOST=0.0.0.0, verify IP |
| Port already in use | Change `PORT` env var (e.g. 4000) |

## 📜 License
Personal / educational use. Add a LICENSE file if you plan distribution.

---
Made with Next.js 15 & TypeScript.
=======
# Pomodoro-Timer
Focus / Break cycles with configurable lengths, drift‑proof timing, and responsive UI.
>>>>>>> 8a911a350af6844215ba0f23876864ca0f061d4c
