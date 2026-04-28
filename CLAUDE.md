# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Local development
bundle exec jekyll serve    # Serve site at http://localhost:4000 with live reload
bundle exec jekyll build    # Build static site to _site/

# First-time setup
gem install bundler && bundle install
```

Deployment is automatic: push to `master` and GitHub Pages builds from the `github-pages` gem.

## Architecture

Jekyll static site for Bradley C. Love's academic lab, hosted at bradlove.org.

**Layout inheritance:** `base.html` (HTML skeleton, scripts, analytics) → `default.html` (header, nav, content wrapper) → page-specific layouts (`post.html`, `blog.html`, `page.html`).

**Publications pipeline:** `_data/outputs.csv` → `_includes/publications.html` (Liquid template) → rendered on `index.html` and `lab.html`. The CSV is the single source of truth; do not hardcode publication lists in HTML.

**Blog posts** live in `_posts/YYYY-MM-DD-slug.md` and are served at `/blog/<slug>` (set by `permalink: /blog/:title` in `_config.yml`).

## Content Conventions

### Blog post frontmatter

```yaml
---
published: true
title: "Post Title"
layout: post
author: Author Name(s)
image: /images/blog/filename.png
comments: false
mathjax: true
---
```

Set `mathjax: true` only when the post contains equations. Set `comments: false` to disable Disqus on a post.

### outputs.csv columns and rules

| Column | Notes |
|--------|-------|
| Date | ISO 8601 (`YYYY-MM-DD`); use submission date for journal articles, upload date for preprints |
| Type | `journal article`, `preprint`, `book chapter`, `proceedings`, `popular science`, `supplemental`, `dataset` |
| Status | `published`, `in press`, or `unpublished` (use `unpublished` only for standalone preprints with no associated journal article) |
| Title | Exact display casing |
| Authors | APA style — see formatting rules below |
| DOI Link | Full URL starting with `http://` |
| PDF Link | Full URL starting with `http://` |
| GitHub | Full URL starting with `http://` |
| OSF | Full URL starting with `http://` |

**Author APA formatting:**
- One author: `Love, B. C.` (space between initials)
- Two authors: `Hornsby, A. N. & Love, B. C.` (no comma before `&`)
- Three or more: `Mack, M. L., Preston, A. R., & Love, B. C.` (comma before `&`)

**Preprint status rule:** If a preprint has a published journal article, set its status to `published` (it renders as an icon next to the article). If it has no journal article, set status to `unpublished` (it gets its own entry).
