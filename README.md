# Living Wallpaper — HandshakeAI Competition

A buildless, responsive HandshakeAI competition showcase for a living iPhone wallpaper. Serve `dist/` with any static HTTP server. The iPhone automation runs daily at 10:00 AM, usually after the morning weigh-in.

## Content and provenance

- Six original images were supplied by the user and are included under `dist/assets/`. A supplied recording was used only as reference; the video is not included in the site or repository.
- The original quote-and-tip collection is in `dist/quotes.js`, preserving the text and attributions supplied by the user. The archive labels those attributions as unverified.
- The story and process are adapted from the user's project description and observed Shortcut recording; no Gemini transcript or downloadable Shortcut was supplied.
- Weight values and the countdown belong to the supplied project screenshots. This website does not read Apple Health.

## Interactions

Select among three wallpaper themes. Enlarge the images, switch between the completed lock screen and blank template, and download each template. Five chapter cards open accessible native dialogs. The quote archive supports search, topic filters, random selection, and copying. The automation chapter reconstructs all 14 visible Shortcut actions in one continuous flow; the sticky navigation tracks the current section while scrolling. Truncated variable names are preserved as shortened labels. This is a walkthrough, not a runnable Shortcut.

The site uses one font family, Barlow Condensed, with system fallbacks, and custom rough ink-style chapter illustrations. No build tools, accounts, tracking, or runtime dependencies are required.

The illustration prompts and generation details are documented in [docs/illustration-prompts.md](docs/illustration-prompts.md). WebP exports preserve transparency and keep the page lightweight; original selected PNGs are retained in the local `artwork/` folder.
