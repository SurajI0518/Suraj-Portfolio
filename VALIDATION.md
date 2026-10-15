# Delivery verification

Verified on 15 October 2026 with installed Chrome 155.0.8059.40, automated through Playwright. Thirteen browser integration checks passed with no JavaScript page errors or failed local asset requests in the tested flows.

## Passed checks

1. Initial render: six demo projects, no eager YouTube iframe or video request.
2. Exact initial hero viewport height and no horizontal page overflow at 2560×1440, 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, 320×568, and 844×390.
3. Home navigation button scrolls to Projects.
4. Multi-category filtering, in-place project details, selected-category breadcrumbs, both Back controls, and returning to the correct filtered gallery.
5. Mixed image/code/video sections, native full-screen image dialog, Escape and click dismissal.
6. Code copy preserves the source text in the clipboard.
7. YouTube iframe creation only on Play, with the expected privacy-enhanced embed URL.
8. Back-to-top navigation, popup width at 95%, bottom positioning, close button, Escape, and dismissal on page scroll.
9. New-tab link attributes and the local résumé placeholder; no missing local assets.
10. Config-driven global font inheritance and individual font override; disabled text, card, image, and tag; empty category message.
11. Switching between two configured popup buttons leaves only the new panel open.
12. Opening `index.html` through a local file URL works without a web server, including category filters.
13. Reduced-motion preference removes transitions while preserving functionality.

Desktop, mobile, project-detail, and popup screenshots were visually reviewed during development. The inactive-button browser background was corrected, and the popup height can preserve access to neighboring home buttons. Long panels scroll internally and keep their close control available.

## Limits of verification

- The external YouTube player response was mocked in automated tests. The embed lifecycle and URL were verified; actual external video playback, video availability, and third-party permissions were not independently verified.
- Tests ran in Chrome on Windows using desktop and emulated viewport dimensions. Physical iOS/Android devices and Safari/Firefox were not tested.
- The bundled demo is small and self-contained, but no claim is made of instant loading on every connection. Your replacement media can substantially change performance.
- Your name, biography, résumé, projects, links, and media are still demo content. The original request did not include the mentioned reference images, so those specific references could not be reproduced.

## After you customize

Open your finished site at desktop and phone widths. Check every category, project, image, code block, and popup. Confirm the first hero frame fits your longest name and button list, test all outgoing links and real video embeds, and verify the intended custom font files load. Check your colors for readable contrast and test keyboard navigation. See MEDIA-GUIDE.md for responsive exports and hosting guidance.
