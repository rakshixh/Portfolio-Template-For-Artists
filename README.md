# Portfolio Template For Artists

A modern React portfolio template for artists, illustrators, photographers, and other visual creators. The project uses Vite for a fast development server, quick production builds, and a lightweight modern toolchain.

## Highlights

- Vite-based development and build workflow.
- React 18 with React Router 6.
- Lazy-loaded route pages for a smaller initial bundle.
- Smooth Framer Motion gallery reveals that animate on scroll in both directions.
- Responsive layout with reusable components and CSS Modules.

## Tech Stack

- React 18
- Vite
- React Router 6
- Framer Motion
- react-hot-toast
- hamburger-react

## Project Structure

- `index.html` is the Vite entry HTML file.
- `src/main.jsx` is the application bootstrap file.
- `src/App.jsx` handles routing and app-level behavior.
- `src/pages/` contains the routed views.
- `src/components/` contains reusable UI parts.
- `src/Data.js` stores site content.
- `src/css/` contains CSS Modules for component styling.
- `src/assets/` contains portfolio images, profile images, and supporting artwork.

## Getting Started

1. Install dependencies.

   ```bash
   npm install
   ```

2. Start the development server.

   ```bash
   npm start
   ```

   This runs Vite locally on your machine.

   To test on a phone on the same Wi-Fi, run:

   ```bash
   npm run start:host
   ```

3. Build the production bundle.

   ```bash
   npm run build
   ```

4. Preview the production build locally.

   ```bash
   npm run preview
   ```

   To open the production preview on a phone on the same network, run:

   ```bash
   npm run preview:host
   ```

## Available Scripts

- `npm start` runs the Vite development server.
- `npm run start:host` runs the Vite development server on your network so a phone can connect.
- `npm run build` creates an optimized production build in `dist/`.
- `npm run preview` previews the production build locally.
- `npm run preview:host` previews the production build on your network for mobile testing.

## Migration Notes

- The app no longer depends on Create React App or `react-scripts`.
- Image imports now use Vite's `import.meta.glob` instead of `require.context`.
- Portfolio images reveal when about 10% of the card enters the viewport and re-animate on scroll up or down.
- Use `npm run start:host` or `npm run preview:host` when you want to open the site on a mobile device.
- Static assets that should be served directly live in `public/` and are referenced from `/`.

## Customization Guide

### Update Portfolio Images

Replace the files in `src/assets/images/` with your own artwork. The gallery automatically loads supported image files from that folder.

The gallery uses a smooth fade-and-lift entrance, so new images animate as they come into view instead of appearing all at once.

### Update the Profile Image

Replace the image inside `src/assets/profile/` with your portrait or studio photo. The about page uses the first supported image in that folder.

### Edit Site Content

Update `src/Data.js` to change the header title, footer text, about page copy, and contact email details.

### Change the Site Title

Review `src/SetWebsiteTitle.js` if you want to adjust the browser tab title.

## Deployment

Deploy the contents of `dist/` to any static host such as Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
