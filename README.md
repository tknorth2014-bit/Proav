# ProAv Charters Website

A static, mobile-friendly website for ProAv Charters. It's plain HTML, CSS and JavaScript, with no build step, so it deploys to Vercel as is.

## Pages

| URL         | File            |
|-------------|-----------------|
| `/`         | `index.html`    |
| `/fleet`    | `fleet.html`    |
| `/services` | `services.html` |
| `/safety`   | `safety.html`   |
| `/about`    | `about.html`    |
| `/contact`  | `contact.html` (quote form) |
| missing page | `404.html`     |

## Making edits

- **Page text:** open the page's `.html` file and change the words between the tags.
- **Phone, email, home base:** edit the `SITE` block at the top of `js/main.js`. That updates the header, footer and contact page together.
- **Menu links, header, footer:** also in `js/main.js` (`NAV`, `buildHeader`, `buildFooter`).
- **Colors and fonts:** edit the `:root` variables at the top of `css/style.css`.
- **Photos:** add `images/hero.jpg` and the home page hero uses it automatically in place of the drawn jet. For the other image boxes, change `src="/images/jet.svg"` to your photo, e.g. `src="/images/cabin.jpg"`, and remove `class="placeholder"`.

## Quote form

By default, submitting the form opens the visitor's email app with the trip details filled in and addressed to the `SITE.email` address.
To get submissions delivered straight to your inbox, create a free form at https://formspree.io and paste its endpoint into `formEndpoint` in `js/main.js`.

## Deploying on Vercel

1. Push this repository to GitHub.
2. In Vercel, click **Add New → Project** and import the repository.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Click **Deploy**. Any later push to the main branch redeploys the site automatically.

`vercel.json` turns on clean URLs, so `/fleet` serves `fleet.html`.

## Preview locally

```
npx serve .
```
