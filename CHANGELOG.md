# Changelog

## v0.2.3 - 2026-03-26

### Updated

- Refined the homepage hero messaging to better reflect the Coding Cafe format and community-oriented tone.
- Simplified the second hero screen by removing the coffee icon and `Next` control while keeping the supporting banner text.
- Redesigned the event detail page to use a tighter layout with cleaner metadata, a compact speaker card, and clearer resource cards.
- Added matching clickable resource cards for Zenodo slides and GitHub materials on event detail pages.
- Improved agenda poster handling so cards automatically use `static/events/<slug>/poster.*` when available.
- Updated the README with concrete instructions for adding events, resources, trainings, and event content files.

### Fixed

- Removed browser-side missing-poster requests on the agenda page by resolving poster availability server-side.
- Fixed the broken July 2 slides path in [`src/lib/data/events.json`](src/lib/data/events.json) so the production build succeeds.
- Normalized Zenodo DOI handling for event detail pages.

### Content structure

- Standardized event detail pages around:
  - [`src/lib/data/events.json`](src/lib/data/events.json) for event metadata
  - `static/events/<slug>/info.md` for page body content
  - `static/events/<slug>/...` for posters, slides, and materials
- Removed duplicated metadata from existing `info.md` files so they only need to contain page-specific content.
- Retired unused legacy files and generation paths:
  - [`static/events/events.json`](static/events/events.json)
  - [`scripts/build-events-index.js`](scripts/build-events-index.js)
  - [`src/lib/events`](src/lib/events)

### Verification

- Ran `npm run build` successfully after the content and routing cleanup.
- Remaining build output only reports pre-existing accessibility warnings in unrelated calendar and resources dialogs.
