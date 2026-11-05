# Aureum local asset library

These local images are the reusable visual assets used by the standalone Next.js website.

- Runtime pages load assets from `/assets/aureum/...`.
- The files were copied from the captured WordPress source for local reuse.
- Current downloadable project literature is stored in `/public/brochures`; optimized cover previews live in `approved/brochures`.
- The former 125 MB `Aureum-Project-Profile.pdf` runtime asset was retired in favor of the current, professionally named catalogue and factsheet downloads.
- The original source archive remains separate and is not required by the Next.js runtime.
- The apartment floor render was captured from the live public source and stored locally for the floor-plan interaction.
- The hero film poster is stored locally as a visual fallback; the Next.js site does not require an autoplay video or a third-party runtime to render the hero.
- Keep replacement images in this folder with stable filenames, meaningful alt text in the component, and an updated source record when a new approved asset is added.
