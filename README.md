# FIT5032 Weeks 11 and 12 Studio

Yafei Zhang, student ID 35275103.

This single Vue application continues the course library and weather activities.
It was scaffolded with Cloudflare C3 and uses JavaScript, Vue 3, Vue Router,
Axios, Bootstrap, PrimeVue and the Firebase web SDK.

## Deployments

- Cloudflare Pages from Git: https://yz-library-studio.pages.dev/
- Cloudflare Pages from the C3 project in the IDE: https://yz-library-ide.pages.dev/
- GitHub Pages CI/CD: https://yzha1428-ship-it.github.io/yz-library-studio/

Select **Get Weather**, enter `Clayton, AU` and press **Search**. Weather requires
a valid OpenWeather build-time configuration. The existing Firebase backend is
hosted separately; this repository contains the static frontend only.

## Local commands

```sh
npm ci
npm run dev
npm run build
npm run deploy
```

C3 was used to create this project with:

```sh
npm create cloudflare@latest -- yz-library-studio --framework=vue --platform=pages --no-deploy --no-git --no-agents --accept-defaults -- --default
```

The course library frontend was then brought into the scaffold. The C3 Wrangler
configuration and deployment command are retained. `npm run deploy` builds the
app and uploads it from the local project to `yz-library-ide`.

## GitHub Pages pipeline

`.github/workflows/deploy.yml` runs on pushes to `main` and manual dispatch.
It installs dependencies, builds with the GitHub repository base path, and
deploys `dist` to `gh-pages`. GitHub Pages publishes that branch's root.

Vue Router reads `import.meta.env.BASE_URL`. The post-build script generates
entry files for all eight fixed routes to support direct links and refreshes.

## Build configuration

Copy `.env.example` to `.env.local` for local development. Do not commit real
configuration values. Hosted builds use Cloudflare build variables and GitHub
Actions secrets with the same `VITE_` names. Vite embeds frontend configuration
in the browser bundle, so it is not a place for server secrets.

The `libraryuser` login is a classroom routing demonstration, not production
authentication. Use test data in the registration form.

## Week 12 optimisation concepts

The Studio asks for understanding these techniques rather than implementing
every one: reduce unnecessary HTTP requests; resize/compress images and use
responsive sources; minify CSS/JavaScript; use a CDN; and consider DNS prefetch
or preconnect for important third-party origins. TTFB and hotlinking research
are included in the accompanying submission PDF.
