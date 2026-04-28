# AI Agent Guidelines for bradlove.org

This is a **Jekyll-based academic website** for Bradley C. Love's research lab and blog at UCL. The site is hosted on GitHub Pages.

## Content Architecture

### Primary Content Areas
- **Blog posts** (`_posts/*.md`) - Technical/research articles with YAML frontmatter (title, layout, author, image, comments, mathjax)
- **Publications** (`_data/outputs.csv`) - Lab outputs database; **do not edit manually**, use the CSV format documented in [`_data/README.md`](/_data/README.md)
- **Static pages** (`*.html`) - Home, blog index, CV, contact, newsletter

### Key Conventions

**Blog Posts** ([example](/_posts/2025-06-11-position-embd.md)):
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

**Publications Data** ([format docs](/_data/README.md)):
- CSV format with columns: Date (ISO 8601), Type, Status, Title, Authors (APA style), Journal, DOI Link, etc.
- Generated automatically on pages via [`_includes/publications.html`](/_includes/publications.html)
- Author formatting: "Love, B. C." (note spacing), multiple authors use "&", 3+ authors use ", & " before last

## Common Tasks

**Add a blog post**: Create `_posts/YYYY-MM-DD-slug.md` with frontmatter above

**Update publications**: Edit `_data/outputs.csv` following APA formatting rules in [`_data/README.md`](/_data/README.md)

**Modify layouts**: Update `_layouts/*.html` and `_includes/*.html` files

**Build locally**: `gem install bundler && bundle exec jekyll serve` (uses `Gemfile`)

## Layout Architecture

The site uses a **single-column responsive layout**:
- **Header** - Navigation and branding
- **Top section** - Contact info (email, location) and social links
- **Content area** - Main page content (full width)
- Clean, minimal design with no sidebars

## Site Configuration

[`_config.yml`](_config.yml) controls:
- Site name: Bradley C. Love
- Main URL: http://bradlove.org
- Disqus comments (bradlove-1)
- Google Analytics (UA-78483005-1)
- Twitter (@ProfData)

## Directory Structure

```
_layouts/          # Page templates (default, blog, post, page, base)
_includes/         # Reusable components (header, navigation, publications, social, address)
_data/             # Data files (outputs.csv, alumni.yml, resources.yml)
_posts/            # Blog posts (Jekyll converts to /blog/*)
_site/             # Built static site (generated, don't commit)
css/, js/, images/ # Assets
papers/            # Paper PDFs and supplementary materials
```

## Development Notes

- **Static site generation**: Jekyll converts Markdown and HTML templates to static files
- **Publishing**: Push to GitHub; Pages auto-builds from main branch
- **Math rendering**: MathJax enabled when `mathjax: true` in frontmatter
- **Responsive design**: Single-column layout adjusts for mobile/tablet/desktop viewports
- **License**: Code (GPLv3), content (CC BY 4.0) — see [LICENSE](LICENSE)
