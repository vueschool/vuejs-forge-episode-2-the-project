# Vue.js Forge Episode 2 Codebase

![Vue.js Forge Episode 2](https://vuejsforge.com/images/logo-vuejs-forge.svg)

This repo includes:

- The boilerplate code for the event (branch: main)
- Branches for both the starting point and the ending point for all exercises

## Services

During the event we'll use several 3rd party SaaS platforms to provide app funcationality like data storage, payment processing, etc. Those services include:

- Deskree
- Contentful CMS
- Stripe
- and Big Commerce

Please be sure to follow the steps in the event preparation doc to make sure these services are setup correctly.

Also be sure to fill out the .env file with the proper data to connect to these services.

## Uses Nuxt 3

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

### Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

### Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
