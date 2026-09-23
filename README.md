# Wen Rui Tan — Personal Website

Source for [wrlog.github.io/Wr.github.io](https://wrlog.github.io/Wr.github.io), the
personal site and portfolio of Wen Rui Tan — PhD candidate, pharmacometrician and
data scientist. It covers population PK/PD modelling, model-informed precision
dosing, and machine learning applied to pharmacometric problems.

## Stack

- [Jekyll](https://jekyllrb.com/) built and served by GitHub Pages from the `master` branch
- Theme derived from [jekyll-theme-H2O](https://github.com/mzlogin/jekyll-theme-H2O)
- MathJax 3 for equations, Prism for syntax highlighting, Mermaid / flowchart.js for diagrams
- Plugins: `jekyll-feed`, `jekyll-sitemap`, `jekyll-paginate`, `jekyll-github-metadata`

## Running locally

```bash
bundle install
bundle exec jekyll serve
```

The site is then available at <http://localhost:4000/Wr.github.io/>.

## Repository layout

| Path | Contents |
| --- | --- |
| `_posts/` | Blog posts, named `YYYY-MM-DD-title.md` |
| `pages/` | Standalone pages (About, Portfolio, Archives, Categories, 404) |
| `_layouts/`, `_includes/` | Jekyll templates and partials |
| `assets/` | CSS, JavaScript and third-party vendor files |
| `images/` | Images used by posts and pages |
| `docs/` | Authoring notes: post template and YAML front matter rules |
| `_config.yml` | Site configuration (title, navigation, plugins, analytics) |

## Writing a post

Copy [`docs/post-template.md`](docs/post-template.md) into `_posts/` as
`YYYY-MM-DD-title.md` and fill in the front matter. Quote any `title`,
`description` or `keywords` value that contains a colon — see
[`docs/yaml-front-matter.md`](docs/yaml-front-matter.md).

Optional front matter flags: `mermaid`, `sequence` and `flow` load the
matching diagram renderer only on the pages that need it. MathJax loads site-wide.

## License

Site code is MIT licensed (see [LICENSE](LICENSE)); it derives from
jekyll-theme-H2O. Written content and figures are © Wen Rui Tan.
