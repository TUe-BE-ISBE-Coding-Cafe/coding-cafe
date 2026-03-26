# Coding Café @ TU/e Built Environment

Coding Café is a monthly community event for anyone at TU Eindhoven, Department of the Built Environment, who is interested in research software — whether that means writing your first script or maintaining a full scientific software package. If you're writing code for research, you're already one of us!

Coding Café is open to all skill levels, from beginners to experts.

This repository hosts the website as well as the presentations, exercises, and other materials from past and upcoming sessions.

## Materials

You can access:

Presentations and session recordings via our website.
Exercises and code examples in the exercises/ folder of this repository.

## Contribute

Got an idea? Want to give a talk or share a cool tool? Or just tell us what you’d like to learn?

Open an Issue to suggest topics, vote for existing ones, or express your interest in presenting.
Contributions to the exercises or materials are also welcome via pull requests!

## Links

Visit our Coding Café website for:

- The full session agenda
- Upcoming event dates
- Resources and past materials

## Documentation

### Adding a new Coding Cafe event

Event list data lives in [`src/lib/data/events.json`](src/lib/data/events.json).

Add a new object to the array with the metadata you want to show on the agenda, homepage, and event detail page.

Minimal example:

```json
{
  "title": "Working with Data",
  "subtitle": "From database concepts to a mini-SQL demo",
  "date": "2026-09-30",
  "startTime": "12:00",
  "endTime": "13:30",
  "location": "Vertigo 9.06",
  "speaker": "Jane Doe",
  "speaker_link": "https://example.org/jane-doe",
  "speakerImage": "https://example.org/jane-doe.jpg",
  "slug": "2026-09-30-working-with-data",
  "description": "A short practical introduction to working with research data and simple SQL workflows.",
  "tags": ["databases", "SQL", "data management"],
  "calendar": "/calendar/september_coding_cafe.ics"
}
```

Useful optional fields:

- `subtitle`: shown under the title when available
- `speaker_link`: used for speaker profile links
- `speakerImage`: used in agenda cards and event pages
- `slides`: can be a local file under `static/events/<slug>/...` or a full external URL such as a GitHub Pages Slidev deck
- `poster`: optional explicit poster path; if omitted, the agenda page will try to use `static/events/<slug>/poster.png` automatically
- `repo`: GitHub or repository link for exercises and materials
- `zenodo`: DOI or DOI URL for archived slides/materials
- `calendar`: `.ics` file path for upcoming sessions

Notes:

- `slug` should match the event folder name under `static/events/<slug>/`.
- Use ISO dates in `YYYY-MM-DD` format.
- The detail page merges data from `events.json` with `static/events/<slug>/info.md`. Keep shared metadata in `events.json`, and use `info.md` mainly for the page body text.

### Adding event files and page content

Create a folder under [`static/events`](static/events) using the same slug as the event entry:

```text
static/events/2026-09-30-working-with-data/
  info.md
  poster.png
  slides/
```

Recommended structure:

- `info.md`: markdown body for the session detail page
- `poster.png`: poster image if available
- `slides/`: local PDFs or other downloadable slide files
- `exercises/`: optional exercises or example code

Minimal `info.md`:

```md
---
---

This session explored practical ways to work with research data.

## Topics covered

- Data organisation basics
- Relational databases
- A short SQL demo
```

You only need frontmatter in `info.md` when you want to override something from `events.json` for that one page.

### Adding a new resource

Resources live in [`src/lib/data/resources.json`](src/lib/data/resources.json).

Example:

```json
{
  "id": "r7",
  "title": "Research Software Engineering with Python",
  "abstract": "A practical guide for writing maintainable research code in Python.",
  "type": "Guide",
  "source": "External",
  "access": "Open Access",
  "tags": ["Python", "Research Software"],
  "theme": "Research Software Engineering",
  "url": "https://example.org/resource",
  "image": "https://example.org/resource-preview.jpg"
}
```

Field notes:

- `id` should be unique
- `title` and `abstract` are shown on the resources page
- `theme` is used to group related resources
- `url` should point to the external page or downloadable asset
- `image` is optional; when present it is shown on the resource card and detail dialog
- if `image` is omitted, the site falls back to the current generated abstract visual

### Adding a new training

Trainings live in [`src/lib/data/trainings.json`](src/lib/data/trainings.json).

Example:

```json
{
  "id": "t20260915",
  "title": "Introduction to Research Data Management",
  "description": "A practical workshop on organising, documenting, and sharing research data.",
  "organizer": "4TU.ResearchData",
  "level": "Beginner",
  "audience": ["PhD", "Postdocs"],
  "duration": "1 day",
  "format": "In-person",
  "tags": ["Data Management", "FAIR"],
  "registrationLink": "https://example.org/register",
  "sessions": [
    {
      "id": "t20260915-1",
      "title": "Introduction to Research Data Management",
      "date": "2026-09-15",
      "startTime": "09:30",
      "endTime": "16:30",
      "location": "TU/e campus",
      "description": ""
    }
  ]
}
```

Field notes:

- `id` should be unique
- `sessions` is required and can contain one or more training dates
- each session should have its own unique `id`
- use ISO dates and `HH:MM` times
- `registrationLink` should point to the signup page

### Checking your changes

After editing the JSON files or event content, run:

```bash
npm run build
```

This catches broken links and prerender issues early.
