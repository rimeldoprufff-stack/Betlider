# BTLIDER (GitHub split)

This is the same site, but split from one huge HTML into separate files for GitHub Pages.

## Files
- `index.html` — main page
- `assets/css/styles.css` — extracted CSS
- `assets/js/app.js` — extracted inline JS

## Deploy to GitHub Pages
1. Create a repo (public or private).
2. Upload everything from this folder (keep the same structure).
3. In GitHub: Settings → Pages → Build and deployment:
   - Source: Deploy from a branch
   - Branch: `main` / root
4. Open the Pages URL GitHub gives you.

## Notes
- Your Supabase **publishable** key is allowed in frontend.
- Do NOT put Supabase **secret/service_role** keys in frontend.
