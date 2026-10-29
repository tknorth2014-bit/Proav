# ProAv Charters Website

A static, mobile-friendly website for ProAv Charters. It's plain HTML, CSS and JavaScript, with no build step, so it deploys to Vercel as is.

## Pages

| URL         | File            |
|-------------|-----------------|
| `/`         | `index.html`    |
| `/about`    | `about.html`    |
| `/services` | `services.html` |
| `/fleet`    | `fleet.html`    |
| `/news`     | `news.html`     |
| `/contact`  | `contact.html`  |
| `/quote`    | `quote.html` (Request a Quote) |
| missing page | `404.html`     |

## Making edits

- **Page text:** open the page's `.html` file and change the words between the tags.
- **Phone, email, address:** edit the `SITE` block at the top of `js/main.js`. That updates the header, footer and contact details on every page.
- **Menu links, header, footer:** also in `js/main.js` (`NAV`, `buildHeader`, `buildFooter`).
- **Colors and fonts:** edit the `:root` variables at the top of `css/style.css` (for example `--blue` for the buttons).
- **Photos:** everything is in `images/`. To swap a photo, replace the file and keep the same name (for example `images/home-hero.jpg`). The starter photos were cut from the design mockup, so they're fairly low resolution. Replace them with full-size originals, ideally at least 1600px wide for hero images, for the sharpest result.
- **Fleet:** each aircraft is an `<article class="aircraft-card">` in `fleet.html`. Copy one to add a new aircraft. Its `data-category` decides which filter tab it appears under (`light`, `midsize`, `super-midsize`, `heavy`, `turboprop`), and the `data-…` values fill the "View Details" popup. If a category has no aircraft, its tab shows an "Available on request" message.
- **News:** each post is an `<article class="news-card">` in `news.html`. Copy one, then change the date, title, summary and the paragraphs inside `<details>`.

## Forms

The quote and contact forms work right away: submitting one opens the visitor's email app with all the details filled in, addressed to `SITE.email`.
To get submissions delivered straight to your inbox without the email app, create a free form at https://formspree.io and paste its endpoint into `formEndpoint` in `js/main.js`.

## Deploying on Vercel

1. In Vercel, click **Add New → Project** and import this GitHub repository.
2. Framework preset: **Other**. Leave the build command and output directory empty.
3. Click **Deploy**. Every later push to `main` redeploys the site automatically.

`vercel.json` turns on clean URLs, so `/fleet` serves `fleet.html`.

## Preview locally

```
npx serve .
```
