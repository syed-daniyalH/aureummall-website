# Module 08 — Immersive media

Owns the reusable visual layer for image galleries, lightboxes, floor-plan viewing, video, 360 scenes, captions and fallbacks.

## Current implementation

- `/immersive-media` is the public media register and viewer shell.
- `data.ts` is the single typed handoff point for approved assets. It intentionally contains no files until the project team supplies the approved media set and source notes.
- Gallery and floor-plan cards expose captions and text descriptions before any heavy source is opened.
- Approved media loads only after visitor intent. Image and floor-plan assets use responsive `next/image`; video uses `preload="metadata"` and native controls.
- The lightbox supports keyboard Escape, a focused close control, click-away close and reduced-motion-safe styling.
- Panorama assets have a labelled handoff surface ready for a dedicated 360 renderer once an approved scene format and source are selected.

## Acceptance

Heavy media loads after intent, respects reduced motion, remains usable on mobile and never hides essential facts from crawlers or assistive technology. No placeholder is presented as a real project image, video or panorama.
