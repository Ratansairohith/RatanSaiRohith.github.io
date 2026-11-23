# ratansairohith.github.io

Personal site of Ratan Sai Rohith Kokku. Live at https://ratansairohith.github.io/

## Updating the site

All text lives in **`content.js`**. Edit it (on github.com, click the file, then the pencil icon), commit, and GitHub Pages republishes within a minute or two. There is no build step.

Common edits:

- **Post an update:** add a line to `news`, e.g.
  `{ date: "2027-02", text: "Our paper on X was accepted at ICML." },`
  Write items newest first; they are grouped by year automatically. The first five show; the rest sit behind a "Show all" button.
- **New role:** add an entry at the top of `experience`; set the previous role's `end` date.
- **New project:** add to `projects`. Use `links: [{ label: "Paper", url: "https://..." }]` for links.
- **Inline links anywhere:** write `[link text](https://example.com)`.
- **Resume link:** set `resume` to a URL and a Resume link appears in the header.
- Bump `updated` to today's date.

## Files

- `index.html` page shell
- `content.js` all content
- `static/site.css`, `static/site.js` styling, rendering and the fingerprint drawing in the header
- `archive/2020/` the original 2020 version of the site (built on a template by varadbhogayata)

To preview locally, open `index.html` in a browser.
