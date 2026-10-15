# Technical Artist Portfolio

A complete, responsive portfolio built with plain HTML, CSS, and JavaScript. No build step, dependencies, accounts, or API keys. No top navigation bar.

## Open your website

1. Extract the ZIP completely.
2. Open `index.html` in a modern browser. The gallery, filters, popups, code blocks, and image previews work directly from the folder.
3. For YouTube playback, local fonts, and a deployment-like preview, serve this folder over HTTP. If Python is installed, run `python -m http.server 8000` in this folder and visit `http://localhost:8000`.
4. Edit the JavaScript files in `config/`, save, and refresh the browser.

See **CUSTOMIZATION.md** for the full illustrated-with-code reference and **MEDIA-GUIDE.md** for media preparation and performance.

## Make it yours

- `config/global.js`: global font, custom font files, base text attributes, button defaults, popup and image viewer styling, back-to-top button.
- `config/home.js`: name, role, background image, overlay, home buttons and popup content.
- `config/projects.js`: heading, categories, card defaults, project cards, tags, shared detail defaults.
- `config/project-content.js`: per-project detail sections with videos, images, and named code blocks.
- `config/contact.js`: contact text, links, footer.

Every visual component can be disabled with `enabled: false`; list entries can also be removed. Most detailed styling is inherited from shared defaults, so you only need to change exceptions. See the visibility map in the customization guide.

## Included behavior

- Full-viewport home with a local background image and independent gradient overlay.
- Navigate, bottom-popup, and new-tab link buttons; unrestricted configurable lists.
- Fixed, content-sized bottom panels at 95% viewport width. Close with the top-right control or Escape; scrolling the page dismisses the panel. Another popup replaces the current one after its exit transition.
- Category filters, including projects assigned to multiple categories.
- Project details replace cards in the same section. Categories remain visible above them. Both top and bottom navigation return to the selected category.
- Any sequence of image, video, and code sections, each with its own background and style.
- Full-screen padded image previews, dismissed by any click or Escape.
- Click-to-load privacy-enhanced YouTube embeds and code copy buttons.
- Responsive cards and media; keyboard focus, reduced-motion support, and accessible control labels.
- Contact links and a scroll-triggered back-to-top control.

## Files

```text
portfolio/
  index.html
  README.md
  CUSTOMIZATION.md
  MEDIA-GUIDE.md
  VALIDATION.md
  config/
    global.js
    home.js
    projects.js
    project-content.js
    contact.js
  css/styles.css
  js/app.js
  assets/
    images/       Original SVG demo artwork; add your own screenshots here
    documents/    Résumé, PDFs, downloadable documents
    fonts/        Your licensed WOFF2 font files
    videos/       Optional local poster/supporting video assets
```

The default artwork and project descriptions are demonstration material, not claims about your professional experience. Change “Your Name”, the biography, project examples, résumé, and all contact links before publishing. The YouTube slot points to an external demonstration video and is labeled as such. No reference images were attached to the original request; the bottom popup and contact section use an original dark design.

## Publish

Upload the folder contents to any static host, keeping `index.html` at the site root and preserving the folder structure. All local asset paths are relative, so deployment in a subfolder also works. Enable HTTPS and compression through your host. No server-side application is required. Nothing has been published or connected to an account on your behalf.

The page content is rendered from JavaScript. If search-engine indexing or link-preview metadata matters, edit the title and description in `index.html` as well as `global.js`; add your own Open Graph image and metadata in the HTML head. There is no contact form backend: the email button uses your configured `mailto:` address.

## Browser support

Designed for current Chrome, Edge, Firefox, and Safari. The viewport uses `svh` to fit the initial mobile screen despite browser toolbars; image dialogs use the native `dialog` element. Browser verification performed for this delivery is listed in VALIDATION.md.
