# Wen Rui Tan, personal website

Source for [wrlog.github.io](https://wrlog.github.io), my personal site and
portfolio. I'm a PhD candidate, pharmacometrician and data scientist, and the
site covers population PK/PD modelling, model-informed precision dosing and
machine learning applied to pharmacometric problems.

## Stack

- [Jekyll](https://jekyllrb.com/), built and served by GitHub Pages from the `master` branch
- Theme derived from [jekyll-theme-H2O](https://github.com/mzlogin/jekyll-theme-H2O)
- MathJax 3 for equations, Prism for syntax highlighting, Mermaid / flowchart.js for diagrams
- Plugins: `jekyll-feed`, `jekyll-sitemap`, `jekyll-paginate`, `jekyll-github-metadata`

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000/>.

## Layout

| Path | Contents |
| --- | --- |
| `_posts/` | Notes, named `YYYY-MM-DD-title.md` |
| `pages/` | Standalone pages (About, Portfolio, Notes, Archive, 404) |
| `_layouts/`, `_includes/` | Jekyll templates and partials |
| `assets/` | CSS, JavaScript and third-party vendor files |
| `images/` | Images used by posts and pages |
| `docs/` | Authoring notes: post template and YAML front matter rules |
| `_config.yml` | Site configuration (title, navigation, plugins, analytics) |

## Writing a note

Copy [`docs/post-template.md`](docs/post-template.md) into `_posts/` as
`YYYY-MM-DD-title.md` and fill in the front matter. If a `title`,
`description` or `keywords` value has a colon in it, quote it (see
[`docs/yaml-front-matter.md`](docs/yaml-front-matter.md)).

The optional front matter flags `mermaid`, `sequence` and `flow` load the
matching diagram renderer only on pages that use it. MathJax loads on every page.

## License

The site code is MIT licensed (see [LICENSE](LICENSE)) and derives from
jekyll-theme-H2O. Written content and figures are © Wen Rui Tan.
