# Media and performance

The bundled demo uses original local SVG illustrations, system fonts, plain CSS, and small JavaScript files. There are no package downloads, trackers, remote font requests, or external image dependencies. Gallery images load lazily. The hero image is eager/high-priority. Image decoding is asynchronous. Aspect ratios reserve layout space. YouTube loads only after clicking Play; full-resolution image originals can load only when expanded.

No optimization can guarantee immediate, identical-quality media on every connection. Lossy compression changes pixels. To preserve exact pixels, use lossless WebP/PNG/AVIF options, keep original source files, and accept the resulting size. For photographic work, a visually inspected high-quality lossy export is often much smaller, but that choice is yours. This portfolio never recompresses your source assets at runtime.

## Responsive images

Export several widths from your source artwork. Provide `srcset` and `sizes` on any image config (hero, card thumbnail, gallery image, or video thumbnail):

```js
thumbnail: {
  enabled: true,
  src: "assets/images/shot-960.webp",
  srcset: "assets/images/shot-480.webp 480w, assets/images/shot-960.webp 960w, assets/images/shot-1600.webp 1600w",
  sizes: "(max-width: 650px) 90vw, (max-width: 1050px) 44vw, 29vw",
  alt: "A clear description of the project",
  aspectRatio: "16 / 10",
  objectFit: "cover"
}
```

The browser chooses a source based on display size, pixel density, and its loading policy. Create the referenced files yourself; a config entry does not generate them. The built-in SVGs remain sharp at every size and do not need multiple resolutions.

For format fallbacks, add `sources` to the image object:

```js
sources: [
  {
    enabled: true,
    type: "image/avif",
    srcset: "assets/images/shot-800.avif 800w, assets/images/shot-1600.avif 1600w",
    sizes: "(max-width: 650px) 90vw, 45vw"
  },
  {
    enabled: true,
    type: "image/webp",
    srcset: "assets/images/shot-800.webp 800w, assets/images/shot-1600.webp 1600w",
    sizes: "(max-width: 650px) 90vw, 45vw"
  }
]
```

The standard `src` is the fallback. A source can also set `media`, for example `(max-width: 650px)` to provide a portrait crop. Use `objectPosition` to preserve a focal point.

For full-screen images, set `fullSrc` to the high-resolution original. Optional `fullSrcset` and `fullSources` allow responsive full-screen variants. If you omit `fullSrc`, the gallery source is reused. Avoid loading a huge original as every card thumbnail. Use `width` and `height` when you know intrinsic image dimensions, plus an appropriate aspect ratio.

## Media folders

- `assets/images/`: backgrounds, thumbnails, screenshots, video posters, full-size image originals.
- `assets/documents/`: PDFs, résumé, and optional linked documents.
- `assets/fonts/`: licensed WOFF2 fonts. System fonts need no files.
- `assets/videos/`: reserved for downloadable supporting assets. The built-in video section is specifically for YouTube URLs; it does not implement a local MP4 player.

Use lowercase filenames without spaces. Keep paths and filename capitalization consistent; hosts on Linux are case-sensitive even when Windows is not.

## Hosting

Use HTTPS, Brotli/gzip for text files (including SVG), and a static host/CDN near your visitors. Configure cache headers through your host: give versioned media long cache lifetimes, and make HTML/config files revalidate so updates appear. Rename changed media or add a versioned filename if using long caches. The ZIP contains no host-specific caching rules and no service worker, so it cannot accidentally keep an old config offline.

## Before publishing

Check actual visual quality at desktop and phone sizes. Replace every demo link and source, confirm YouTube embeds work on the intended domain, and try slow-network throttling in browser developer tools. Large media, third-party restrictions, missing files, and poor connections still affect load time. Never place private credentials or private source code in these public config files.
