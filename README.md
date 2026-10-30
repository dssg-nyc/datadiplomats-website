# Data Diplomats Program

Source for [www.datadiplomats.org](https://www.datadiplomats.org): the Data Diplomats Program
by Data Diplomats for Nonprofits, Inc. A React + Vite single-page site using hash routing.

## Develop

```
npm ci
npm run dev
```

## Where things live

- `src/components/DataDiplomats.jsx`: the program page, served at `/`
- `src/data/diplomats.json`: apply link, page sections and cohorts
- `src/data/siteproperties.json`: organization details and external links
- `src/data/blogs.json`, `src/data/impactstories.json`: Blog and Our work content
- `public/images/`: images referenced by the components and data files

## Deploy

Pushing to `main` runs `.github/workflows/static.yml`, which builds the site and publishes `dist/`
to GitHub Pages (Settings → Pages → Source must be **GitHub Actions**). `CNAME` is copied into the
build so the custom domain keeps working.
