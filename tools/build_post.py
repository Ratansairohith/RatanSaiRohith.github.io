"""Build a Writing post from Markdown.

Usage: python3 tools/build_post.py writing/<slug>/post.md

Reads the front matter (title, subtitle, date, summary, reading_time, and optional
scripts: a comma-separated list of data files in the post folder), converts the
Markdown to HTML, turns each [[FIGURE: name | note]] line into a figure slot that
writing/figures.js fills in, and writes writing/<slug>/index.html next to the source.
"""
import html
import re
import sys
from pathlib import Path

import markdown

MONTHS = ["January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]


def front_matter(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if not m:
        return meta, text
    for line in m.group(1).splitlines():
        if ":" in line:
            k, v = line.split(":", 1)
            meta[k.strip()] = v.strip().strip('"')
    return meta, text[m.end():]


def figure(match):
    name = match.group(1).strip()
    note = (match.group(2) or "").strip()
    return ('\n<figure class="fig" data-fig="%s" data-note="%s"></figure>\n'
            % (html.escape(name), html.escape(note)))


def main(path):
    src = Path(path)
    meta, body = front_matter(src.read_text(encoding="utf-8"))
    body = re.sub(r"^\[\[FIGURE:\s*([^|\]]+?)\s*(?:\|\s*([^\]]*))?\]\]\s*$", figure, body, flags=re.M)
    content = markdown.markdown(body, extensions=["tables", "sane_lists"])
    content = re.sub(r'<a href="(https?://)', r'<a rel="noopener" href="\1', content)

    y, m, d = meta.get("date", "2026-01-01").split("-")
    nice_date = "%s %d, %s" % (MONTHS[int(m) - 1], int(d), y)
    tpl = (Path(__file__).parent / "post_template.html").read_text(encoding="utf-8")
    out = (tpl.replace("{{title}}", html.escape(meta.get("title", "")))
              .replace("{{subtitle}}", html.escape(meta.get("subtitle", "")))
              .replace("{{summary}}", html.escape(meta.get("summary", "")))
              .replace("{{date}}", meta.get("date", ""))
              .replace("{{nice_date}}", nice_date)
              .replace("{{reading_time}}", html.escape(meta.get("reading_time", "")))
              .replace("{{scripts}}", "".join('<script src="%s"></script>\n  ' % html.escape(x.strip())
                                               for x in meta.get("scripts", "").split(",") if x.strip()))
              .replace("{{content}}", content))
    (src.parent / "index.html").write_text(out, encoding="utf-8")
    print("wrote", src.parent / "index.html")


if __name__ == "__main__":
    main(sys.argv[1])
