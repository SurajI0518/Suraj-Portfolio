# Customization guide

## 1. How the configs work

All configs are regular JavaScript loaded in this order: `global.js`, `home.js`, `projects.js`, `project-content.js`, `contact.js`. The renderer then reads `window.Portfolio`. Keep that order in `index.html`. Unlike JSON, these files allow comments, template strings, and trailing commas.

Objects use braces `{ }`; lists use square brackets `[ ]`. Separate properties and list entries with commas. Use quotes around text; use backticks for multiline code. Paths are relative to `index.html`, even though they are written inside a config folder. Use forward slashes: `assets/images/my-project.webp`.

The inheritance order is **global defaults → component defaults → the individual item**. Objects are merged recursively; individual values replace shared values. Arrays such as `colors` are replaced in full. `fontFamily: null` always means the global font. An explicit `enabled: false` hides that component; omitting `enabled` uses its default, normally true. A parent disabled at render time also hides its children. Changing a default affects items unless those items explicitly override that field.

You do not need to edit `app.js` to add content. JavaScript configs are trusted code: only edit them yourself or use trusted contributions.

## 2. Global font, local fonts, and font overrides

In `config/global.js`, change this line once:

```js
fonts: {
  family: '"Segoe UI", Arial, sans-serif',
  faces: []
}
```

Every rendered text uses this family, including headings, paragraphs, buttons, tags, breadcrumbs, captions, and code. The supplied design uses system fonts, so no font download is required.

For a custom font, put a licensed WOFF2 file in `assets/fonts/`, then register it:

```js
fonts: {
  family: '"Portfolio Sans", Arial, sans-serif',
  faces: [
    {
      enabled: true,
      family: "Portfolio Sans",
      src: "assets/fonts/portfolio-sans.woff2",
      weight: "100 900", // Only for a variable font with this supported range
      style: "normal"
    },
    {
      enabled: true,
      family: "Display Face",
      src: "assets/fonts/display-regular.woff2",
      weight: "400",
      style: "normal"
    }
  ]
}
```

For a static font, register a separate face for each real weight/style you have. The family in the text config must match the registered `family`. Fonts load with swap behavior so text stays visible. Test custom fonts over HTTP; browsers can restrict local file loading.

To override only the home name:

```js
name: {
  enabled: true,
  value: "Avery Morgan",
  fontFamily: '"Display Face", Georgia, serif',
  fontSize: "clamp(52px, 9vw, 140px)",
  fontWeight: 400,
  color: "#ffffff"
}
```

To restore global inheritance, set `fontFamily: null` or remove the override if no component default defines one. The same field works on every text object. For code only, set `projects.detail.sectionDefaults.codeDefaults.text.fontFamily` to `'Consolas, "Courier New", monospace'`. Code inherits the global font by default, as requested.

## 3. Every text attribute

Text objects support the following fields. Use CSS strings for lengths; `lineHeight` may be a unitless number.

```js
title: {
  enabled: true,
  value: "My project",
  fontFamily: null,
  fontSize: "clamp(24px, 3vw, 40px)",
  fontWeight: 600,
  color: "#e9f2df",
  lineHeight: 1.25,
  letterSpacing: "-0.02em",
  wordSpacing: "0em",
  textAlign: "left",
  textTransform: "none",
  fontStyle: "normal",
  textDecoration: "none",
  textShadow: "none",
  textIndent: "0",
  whiteSpace: "normal",
  opacity: 1,
  maxWidth: "900px",
  margin: "0",
  padding: "0",
  wordBreak: "normal",
  overflowWrap: "anywhere",
  style: {} // Further CSS properties in camelCase
}
```

For paragraph line breaks, use `\n` with `whiteSpace: "pre-line"`. Text is rendered literally, so HTML markup is not interpreted. For code, use `whiteSpace: "pre"` (the default) to keep indentation and horizontal scrolling. Use `pre-wrap` if you prefer wrapping. Very large font overrides can change your layout; test them at phone widths. `clamp(minimum, fluid, maximum)` gives you responsive sizes directly in config.

## 4. Solid backgrounds, gradients, angles, opacity

Every supported surface uses this same format:

```js
background: {
  enabled: true,
  colors: ["#141b13"], // ONE color = solid
  angle: 135,
  opacity: 1
}
```

Two or more entries become a linear gradient:

```js
background: {
  enabled: true,
  colors: ["#20371e", "#1c2733", "#102015"],
  angle: 45,
  opacity: 0.95
}
```

Use valid CSS colors, including `transparent`, `rgba(0,0,0,0.5)`, and 8-digit hex. Optional gradient stops work as strings such as `"#102015 20%"` when there are multiple entries. CSS angles: 0 points up, 90 right, 180 down, 270 left. Opacity affects the background layer only; text remains opaque. With a single color the angle has no visual effect. An empty color list or `enabled: false` makes the background transparent.

The same object works for `home.overlay`, all section `background`s, `popup.background`, `lightbox.background`, card and tag backgrounds, button backgrounds, individual content-section backgrounds, and code block backgrounds. Buttons and project cards also accept `hoverBackground`. Categories additionally accept `activeBackground` and `activeText`.

Do not use `style.background` for ordinary backgrounds: use the unified `background` object to retain its enable switch and independent opacity. You can add `background` and `style` to rendered containers such as `body`, `buttonGroup`, `footer`, `categoriesBar`, `grid`, `navigation`, `mediaGrid`, code `header`, individual images, and individual videos.

## 5. Generic component style

Every surface-backed component accepts a `style` object with camelCase CSS properties:

```js
style: {
  padding: "20px 28px",
  border: "1px solid #495941",
  borderRadius: "8px",
  boxShadow: "0 12px 40px #0004",
  gap: "12px",
  maxWidth: "100%"
}
```

Button defaults live at `global.buttons`; individual buttons can override their background, hover background, text, icon, and style. `textStyle` is a convenience override merged into a button's `text`. Prefer using one of them consistently. Mobile CSS deliberately reduces home-button padding and category-button padding; edit the corresponding media rules in `css/styles.css` if you want to change these compact behaviors. Structural hover lift, grid breakpoints, and spacing fallback rules also live there.

## 6. Home and the three button types

Set `home.name.value`, `home.role.value`, the optional description, and `home.image.src`. The image fills the viewport with `objectFit: "cover"`; this preserves proportions and crops edges. Use `objectPosition` to keep the subject visible. `contain` shows the entire image but can leave empty space. Overlay colors are independent of the image.

The home section occupies one small viewport height (`100svh`) on first load, with subsequent sections below. The page itself intentionally scrolls to those sections. Normal content fits without scrolling the home. If you add unusually many buttons or very large text, the hero's content area can scroll internally to keep every control accessible while preserving the screen-height section.

### Navigate

```js
{
  enabled: true,
  type: "navigate",
  target: "projects", // Must match a section's id, or a currently rendered element id
  text: { enabled: true, value: "View projects" },
  icon: { enabled: true, value: "↓" }
}
```

### Bottom popup

```js
{
  enabled: true,
  type: "popup",
  text: { enabled: true, value: "My approach" },
  icon: { enabled: true, value: "+" },
  popup: {
    enabled: true,
    title: { enabled: true, value: "How I work", fontFamily: null },
    content: {
      enabled: true,
      value: "First paragraph.\n\nSecond paragraph.",
      whiteSpace: "pre-line"
    },
    background: { enabled: true, colors: ["#25321f", "#111a13"], angle: 120, opacity: 1 },
    close: { enabled: true, text: { value: "↓" }, icon: { enabled: false } },
    buttons: []
  }
}
```

Add as many popup buttons as you like. They share one active panel: opening another first animates the old one down. Clicking the same trigger toggles it. Popups are fixed to the viewport at 95% width, with height based on content and a 75dvh maximum. With `keepTriggerVisible: true`, home popups are additionally capped to the space below their trigger (when at least 160px is available), keeping neighboring buttons available for switching. Set this option to false to allow the panel to overlap home buttons. Oversized contents scroll inside the panel. Scrolling the surrounding page, closing, or pressing Escape dismisses it; scrolling inside a long panel keeps it usable. Panels are nonmodal, so visitors can still use another visible button. Each popup can override `global.popup` settings, including `width`, `maxHeight`, `keepTriggerVisible`, `style`, title, content, eyebrow, close, buttonGroup, and buttons.

### New-tab redirect

```js
{
  enabled: true,
  type: "redirect",
  url: "assets/documents/your-name-resume.pdf",
  text: { enabled: true, value: "Résumé" },
  icon: { enabled: true, value: "↗" }
}
```

Use a document path, HTTPS URL, or `mailto:` link. New-tab links include `noopener noreferrer`. The browser may hand mail links to an email application; it controls that behavior. JavaScript URLs are rejected. Miro and Trello work as normal HTTPS URLs; their access permissions still apply.

Add button objects to `home.buttons` or `contact.buttons`. Change a group's spacing with `buttonGroup.style.gap`. Contact buttons are normally redirects, but the renderer supports all three types there too.

## 7. Categories and project cards

Add a category in `projects.categories`:

```js
{ enabled: true, id: "rigging", text: { enabled: true, value: "Rigging" } }
```

IDs must be unique. The category with `all: true` includes every enabled project. `defaultCategory` selects the initial filter. If it is hidden or absent, the first enabled category is selected. If no categories are enabled, all projects show. A hidden category can still be listed in a project's IDs; the project remains visible through All work or its other categories. To change a category's font, edit its `text.fontFamily`; to change every category, edit `categoryDefaults.text.fontFamily`.

Add a card to `projects.items`:

```js
{
  enabled: true,
  id: "character-rig", // Also used as the key in project-content.js
  categoryIds: ["rigging", "tools"],
  thumbnail: {
    enabled: true,
    src: "assets/images/character-rig.webp",
    alt: "Character rig control demonstration",
    aspectRatio: "16 / 10",
    objectFit: "cover"
  },
  kicker: { enabled: true, value: "CHARACTER TOOLS" },
  title: { enabled: true, value: "Character Rig", fontFamily: null },
  description: { enabled: true, value: "A short description of your work." },
  background: { enabled: true, colors: ["#222d20", "#101611"], angle: 145, opacity: 1 },
  style: { borderRadius: "8px", borderColor: "#576d45" },
  tagsStyle: { enabled: true, style: { gap: "8px" } },
  tags: [
    { enabled: true, text: { enabled: true, value: "Maya" } },
    { enabled: true, text: { enabled: true, value: "Python", color: "#d4f694" } }
  ]
}
```

Shared card fields are in `cardDefaults`. Add the same field to one card to override it. Individual tags accept `background`, `style`, `enabled`, and `text`; project `tagDefaults` overrides the shared tag defaults. `tagsStyle.enabled: false` hides the tag row for that project. Tags wrap naturally across lines on small screens.

Grid settings: `grid.desktopColumns`, `tabletColumns`, `mobileColumns`, and `gap`. Default breakpoints are 1050px and 650px. Keep column counts positive integers; use sensible counts for readable cards.

## 8. Project content

In `project-content.js`, create a key matching the card ID:

```js
"character-rig": {
  enabled: true,
  title: { enabled: true, value: "Character Rig — breakdown" }, // Optional; defaults to card title
  description: { enabled: true, value: "Your contribution and the project brief." },
  sections: [ /* Image, video, and code objects below, in any order */ ]
}
```

Use stable unique IDs for your projects and optional section IDs. The active category is retained when opening/closing a project. If opening from All work, the breadcrumb uses the first enabled mapped category. Clicking any category exits detail view. The breadcrumb separator is configurable; change `detail.breadcrumb.separator` to `" > "` for `Game Jam > MorphBound`.

Shared detail styling lives in `projects.detail`. Override it per project in `project-content.js`: `navigation`, `breadcrumb`, `backButton`, `title`, `description`, `tags`, `sectionDefaults`, `background`, and `style`. Navigation can be independently enabled at the top and bottom. The bottom tags reuse the card tags.

### Image section

```js
{
  enabled: true,
  type: "image",
  id: "rig-gallery",
  title: { enabled: true, value: "Controls and deformation" },
  description: { enabled: true, value: "Explain what these images show." },
  background: { enabled: true, colors: ["#172217", "#242e1c"], angle: 60, opacity: 1 },
  mediaGrid: { enabled: true, columns: 2, gap: "20px" },
  images: [
    {
      enabled: true,
      src: "assets/images/rig-preview.webp",
      fullSrc: "assets/images/rig-full.png", // Optional original for the viewer
      alt: "Face rig control layout",
      thumbnail: { enabled: true, aspectRatio: "16 / 10", objectFit: "cover" },
      caption: { enabled: true, value: "Face controls", fontFamily: null },
      lightbox: { enabled: true }
    }
  ]
}
```

Duplicate image entries as needed. Images are contained inside a padded full-screen dialog when expanded; click anywhere or press Escape to dismiss. Disable the viewer globally with `global.lightbox.enabled: false`, or for one image with `lightbox.enabled: false`. The thumbnail still displays. Viewer settings include background, padding, close button, and caption. Use `lightbox.caption.enabled: false` to hide a viewer caption separately from its gallery caption.

### Video section

```js
{
  enabled: true,
  type: "video",
  title: { enabled: true, value: "Tool walkthrough" },
  description: { enabled: true, value: "Show the workflow in motion." },
  mediaGrid: { enabled: true, columns: 1, gap: "24px" },
  videos: [
    {
      enabled: true,
      url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
      title: "Character rig tool walkthrough", // Accessible iframe label
      thumbnail: { enabled: true, src: "assets/images/walkthrough.webp", alt: "Walkthrough preview", aspectRatio: "16 / 9" },
      playButton: { enabled: true, text: { enabled: true, value: "Watch walkthrough" } },
      caption: { enabled: true, value: "Tool walkthrough" }
    }
  ]
}
```

The example video ID above is a placeholder. Use a real 11-character YouTube ID via `watch`, `youtu.be`, `embed`, `shorts`, or `live` links. Videos must permit embedding. Multiple videos are supported. Nothing is requested from YouTube until Play. The iframe uses `youtube-nocookie.com`; playback still contacts YouTube and requires internet access. Local `file:` pages may be blocked by YouTube's referrer rules, so preview videos over HTTP and publish on HTTPS. On restricted networks or when embedding is disabled by the video owner, playback cannot be guaranteed.

### Code section

```js
{
  enabled: true,
  type: "code",
  title: { enabled: true, value: "Implementation" },
  description: { enabled: true, value: "Describe the important decisions." },
  blocks: [
    {
      enabled: true,
      name: { enabled: true, value: "Enemy.cpp" },
      language: "cpp",
      code: `void Enemy::Update(float dt)\n{\n    phase += dt;\n}`,
      text: { enabled: true, fontFamily: 'Consolas, monospace', fontSize: "14px" },
      copyButton: { enabled: true },
      background: { enabled: true, colors: ["#0c140d"], angle: 0, opacity: 1 }
    }
  ]
}
```

Each block has its own filename and optional copy button. `language` is metadata; no external syntax-highlighting library is loaded. Source text is escaped automatically by the DOM and never evaluated. With backtick strings, escape any literal backticks and any literal `${` sequences in your code. With ordinary quoted strings, escape quotes and write newlines as `\n`. Clipboard access is best supported over HTTPS/localhost; a fallback is included for local files, and manual text selection remains available.

The temporary copy success label is configurable at `copyButton.copiedText` (including enabled, value, and text styles). Invalid-video messages are configurable with each video's `error` text object or `sectionDefaults.videoDefaults.error`. The skip link accepts text styling attributes directly on `global.accessibility.skipLink`, with its label in `text`. The JavaScript-disabled notice and standalone résumé-placeholder page are static HTML; edit those files directly if you retain them.

## 9. Visibility map

All visible component configs accept `enabled`. These are the primary switches:

| Area | Config paths (relative to Portfolio) |
| --- | --- |
| Entire portfolio | `global.enabled` |
| All text | `global.text.enabled` |
| Page background | `global.background.enabled` |
| Skip link | `global.accessibility.skipLink.enabled` |
| Home | `home.enabled`, `home.image.enabled`, `home.overlay.enabled`, `home.content.enabled` |
| Home text | `home.eyebrow/name/role/description.enabled` |
| Home buttons | `home.buttonGroup.enabled`, each `home.buttons[].enabled` |
| Home footer | `home.footer.enabled`, `home.footer.left/right.enabled` |
| Popup | `global.popup.enabled`, each button's `popup.enabled`, popup `eyebrow/title/content/close/buttonGroup.enabled` |
| Projects | `projects.enabled`, `projects.eyebrow/title/description.enabled` |
| Categories | `projects.categoriesBar.enabled`, each `categories[].enabled`, its `text.enabled` |
| Gallery | `projects.grid.enabled`, each `items[].enabled` |
| Card content | card `thumbnail/body/kicker/title/description/arrow.enabled`, `tagsStyle.enabled`, each tag `enabled` and `text.enabled` |
| Detail | `projects.detail.enabled`, `projectContent[id].enabled` (false makes that card non-opening) |
| Detail navigation | `detail.navigation.enabled`, `navigation.top/bottom.enabled`, `breadcrumb.enabled`, `backButton.enabled` |
| Detail body | `title/description/tags.enabled`, each `sections[].enabled` |
| Section content | each section's `title/description/mediaGrid.enabled` |
| Images | each `images[].enabled`, `thumbnail/caption/lightbox.enabled` |
| Videos | each `videos[].enabled`, `thumbnail/playButton/caption.enabled` |
| Code | each `blocks[].enabled`, `header/name/text/copyButton.enabled` |
| Contact | `contact.enabled`, `eyebrow/title/description/buttonGroup/footer.enabled`, each `buttons[].enabled` |
| Contact footer | `contact.footer.copyright/note.enabled` |
| Image viewer | `global.lightbox.enabled`, `close/caption.enabled` |
| Back to top | `global.backToTop.enabled`, its `text/icon.enabled` |
| Every button | its `enabled`, `text.enabled`, `icon.enabled`, `background.enabled` |

The slash-separated paths in this table are shorthand for separate properties, not literal property names. Layout wrappers, decorative borders, and hover effects are controlled through their owner's `style` or the CSS file; they are not separate content entries. Buttons can retain an accessible `label` even when their visible text is disabled. Keep at least an icon or text visible for a usable control.

## 10. Contact, back-to-top, and accessibility

Replace `hello@example.com` and the generic social URLs in `contact.buttons`. You can add unlimited buttons and change all labels and styles. The footer replaces `{year}` with the current year. The back-to-top button appears after `global.backToTop.threshold` pixels of page scroll and moves focus back to the top when used.

For section IDs you change, update every associated navigate target and the skip-link target. If Projects is disabled, point the skip link at another enabled section or disable it. Supply meaningful `alt` text, unique project IDs, and accessible button `label`s when showing only icons. Keep readable text/background contrast. Reduced motion follows system preferences automatically; `global.motion.enabled: false` disables transitions, and `smoothScroll: false` disables smooth navigation.

Use the CSS file for deeper structural changes. No generated/minified source is included, so the complete site remains editable.
