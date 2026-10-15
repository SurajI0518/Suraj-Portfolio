/* Vanilla JavaScript renderer. Content belongs in config/, not in this file. */
(() => {
  'use strict';
  const P = window.Portfolio;
  const G = P.global;
  const root = document.getElementById('portfolio');
  const overlayRoot = document.getElementById('overlay-root');
  const enabled = item => item !== false && item?.enabled !== false;
  const plain = value => value && typeof value === 'object' && !Array.isArray(value);
  function merge(...items) {
    const result = {};
    for (const item of items) if (plain(item)) {
      for (const [key, value] of Object.entries(item)) {
        result[key] = plain(value) ? merge(result[key], value) : value;
      }
    }
    return result;
  }
  function el(tag, className, parent) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    parent?.append(node);
    return node;
  }
  function style(node, values = {}) {
    for (const [key, value] of Object.entries(values)) {
      if (value == null) continue;
      if (key.startsWith('--')) node.style.setProperty(key, String(value));
      else if (key in node.style) node.style[key] = String(value);
    }
    return node;
  }
  const textProperties = ['color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textAlign', 'textTransform', 'fontStyle', 'textDecoration', 'whiteSpace', 'opacity', 'wordSpacing', 'textShadow', 'textIndent', 'maxWidth', 'margin', 'padding', 'wordBreak', 'overflowWrap'];
  function textStyle(node, config = {}) {
    const merged = merge(G.text, config);
    style(node, Object.fromEntries(textProperties.map(key => [key, merged[key]])));
    node.style.fontFamily = merged.fontFamily || G.fonts.family;
    style(node, merged.style);
  }
  function text(tag, config, parent, className = '', defaults = {}) {
    const c = merge(defaults, config);
    if (!enabled(G.text) || !enabled(c) || c.value == null || c.value === '') return null;
    const node = el(tag, className, parent);
    node.textContent = String(c.value);
    textStyle(node, c);
    return node;
  }
  function background(c) {
    if (!enabled(c) || !Array.isArray(c?.colors) || !c.colors.length) return 'transparent';
    return c.colors.length === 1 ? c.colors[0] : `linear-gradient(${Number(c.angle) || 0}deg, ${c.colors.join(', ')})`;
  }
  function surface(node, config = {}) {
    node.classList.add('surface');
    node.style.setProperty('--surface-bg', background(config.background));
    node.style.setProperty('--surface-opacity', String(config.background?.opacity ?? 1));
    node.style.setProperty('--surface-hover', background(config.hoverBackground || config.background));
    node.style.setProperty('--surface-hover-opacity', String(config.hoverBackground?.opacity ?? config.background?.opacity ?? 1));
    style(node, config.style);
    return node;
  }
  function safeURL(value, media = false) {
    if (!value || typeof value !== 'string') return '';
    try {
      const url = new URL(value, document.baseURI);
      const protocols = media ? ['http:', 'https:', 'file:'] : ['http:', 'https:', 'file:', 'mailto:', 'tel:'];
      return protocols.includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  }
  function picture(config, parent, eager = false) {
    if (!enabled(config) || !config.src) return null;
    const picture = el('picture', '', parent);
    for (const source of config.sources || []) {
      if (!enabled(source)) continue;
      const node = el('source', '', picture);
      if (source.type) node.type = source.type;
      if (source.media) node.media = source.media;
      if (source.srcset) node.srcset = source.srcset;
      if (source.sizes) node.sizes = source.sizes;
    }
    const img = el('img', '', picture);
    img.alt = config.alt || '';
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    if (eager) img.fetchPriority = 'high';
    if (config.srcset) img.srcset = config.srcset;
    if (config.sizes) img.sizes = config.sizes;
    if (config.width) img.width = config.width;
    if (config.height) img.height = config.height;
    style(img, { objectFit: config.objectFit, objectPosition: config.objectPosition, aspectRatio: config.aspectRatio, opacity: config.opacity });
    style(img, config.style);
    img.addEventListener('error', () => { img.classList.add('image-error'); });
    img.src = safeURL(config.src, true);
    return picture;
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const motion = () => enabled(G.motion) && !reduceMotion.matches;
  function navigate(target) {
    const node = document.getElementById(String(target || '').replace(/^#/, ''));
    if (!node) return;
    closePopup(false);
    node.scrollIntoView({ behavior: motion() && G.motion.smoothScroll ? 'smooth' : 'instant', block: 'start' });
    if (!node.hasAttribute('tabindex')) node.tabIndex = -1;
    node.focus({ preventScroll: true });
  }
  function button(config, parent, action, defaults = {}) {
    const c = merge(G.buttons, defaults, config);
    if (!enabled(c)) return null;
    const isLink = !action && c.type === 'redirect';
    const node = el(isLink ? 'a' : 'button', 'button', parent);
    if (isLink) {
      const url = safeURL(c.url);
      if (url) { node.href = url; node.target = '_blank'; node.rel = 'noopener noreferrer'; }
      else { node.setAttribute('aria-disabled', 'true'); node.removeAttribute('href'); }
    } else node.type = 'button';
    surface(node, c);
    const tc = merge(c.text, c.textStyle);
    text('span', tc, node);
    const icon = text('span', c.icon, node, 'button-icon', tc);
    if (icon) icon.setAttribute('aria-hidden', 'true');
    node.setAttribute('aria-label', c.label || c.text?.value || 'Open item');
    if (action) node.addEventListener('click', action);
    else if (c.type === 'navigate') node.addEventListener('click', () => navigate(c.target));
    else if (c.type === 'popup') {
      node.setAttribute('aria-expanded', 'false');
      node.setAttribute('aria-controls', 'content-popup');
      node.addEventListener('click', () => openPopup(c.popup, node));
    }
    return node;
  }
  function buttons(config, items, parent) {
    if (!enabled(config)) return;
    const group = el('div', 'button-group', parent);
    surface(group, config);
    for (const item of items || []) button(item, group);
  }
  function announce(message) {
    if (G.accessibility.announceChanges) document.getElementById('announcer').textContent = message;
  }
  function initGlobal() {
    document.title = G.page.title;
    document.documentElement.lang = G.page.language || 'en';
    document.querySelector('meta[name="description"]').content = G.page.description;
    style(document.documentElement, {
      '--font': G.fonts.family, '--accent': G.theme.accent, '--muted': G.theme.muted,
      '--line': G.theme.line, '--focus': G.theme.focus, '--radius': G.theme.radius,
      '--max-width': G.layout.maxWidth, '--page-pad': G.layout.sectionPadding,
      '--section-gap': G.layout.sectionGap, '--duration': `${enabled(G.motion) ? G.motion.duration : 0}ms`
    });
    surface(document.body, G);
    const skip = document.querySelector('.skip-link');
    const skipConfig = G.accessibility.skipLink;
    skip.hidden = !enabled(skipConfig) || !enabled(G.text) || !enabled(G);
    skip.textContent = skipConfig.text;
    textStyle(skip, merge({ color: '#172012' }, skipConfig));
    skip.href = `#${skipConfig.target}`;
    for (const font of G.fonts.faces || []) {
      if (!enabled(font) || !safeURL(font.src, true)) continue;
      const face = new FontFace(font.family, `url(${JSON.stringify(safeURL(font.src, true))})`, { weight: font.weight || '400', style: font.style || 'normal', display: 'swap' });
      document.fonts.add(face);
      face.load().catch(() => console.warn(`Could not load font: ${font.family}`));
    }
  }
  function renderHome() {
    const c = P.home;
    if (!enabled(c)) return;
    const hero = surface(el('section', 'hero', root), c);
    hero.id = c.id;
    if (enabled(c.image)) {
      const back = el('div', 'hero-image', hero);
      picture(c.image, back, true);
    }
    if (enabled(c.overlay)) surface(el('div', 'hero-overlay', hero), { background: c.overlay });
    if (enabled(c.content)) {
      const content = surface(el('div', 'hero-content', hero), c.content);
      text('p', c.eyebrow, content, 'eyebrow');
      text('h1', c.name, content, 'hero-name');
      text('p', c.role, content, 'hero-role');
      text('p', c.description, content, 'hero-description');
      buttons(c.buttonGroup, c.buttons, content);
    }
    if (enabled(c.footer)) {
      const foot = surface(el('div', 'hero-footer', hero), c.footer);
      text('span', c.footer.left, foot);
      text('span', c.footer.right, foot);
    }
  }
  let category, gallery, categoryButtons = [], projectConfig;
  function categoriesFor(project) {
    return projectConfig.categories.filter(c => enabled(c) && !c.all && project.categoryIds.includes(c.id));
  }
  function tagList(project, parent, overrides = {}) {
    const c = merge(projectConfig.cardDefaults.tags, project.tagsStyle, overrides);
    if (!enabled(c)) return;
    const list = surface(el('div', 'tags', parent), c);
    for (const tag of project.tags || []) {
      const t = merge(projectConfig.cardDefaults.tagDefaults, project.tagDefaults, tag);
      if (!enabled(t)) continue;
      const wrap = surface(el('span', 'tag', list), t);
      text('span', t.text, wrap);
    }
  }
  function renderProjects() {
    const c = P.projects;
    projectConfig = c;
    if (!enabled(c)) return;
    const section = surface(el('section', 'projects section', root), c);
    section.id = c.id;
    const inner = el('div', 'container', section);
    const heading = el('div', 'section-heading', inner);
    const left = el('div', '', heading);
    text('p', c.eyebrow, left, 'eyebrow');
    text('h2', c.title, left);
    text('p', c.description, heading, 'section-description');
    const cats = c.categories.filter(enabled);
    category = cats.find(cat => cat.id === c.defaultCategory) || cats[0] || { id: 'all', all: true };
    if (enabled(c.categoriesBar)) {
      const bar = surface(el('div', 'categories', inner), c.categoriesBar);
      bar.setAttribute('role', 'group');
      bar.setAttribute('aria-label', 'Project categories');
      for (const cat of cats) {
        const btn = button(merge(c.categoryDefaults, cat), bar, () => { category = cat; renderGallery(); }, { icon: { enabled: false } });
        if (btn) categoryButtons.push({ btn, cat });
      }
    }
    gallery = el('div', 'project-panel', inner);
    gallery.id = 'project-panel';
    renderGallery();
  }
  function renderGallery(restoreId) {
    gallery.replaceChildren();
    for (const { btn, cat } of categoryButtons) {
      const active = category.id === cat.id;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
      btn.setAttribute('aria-controls', 'project-panel');
      const c = merge(projectConfig.categoryDefaults, cat);
      surface(btn, active ? merge(c, { background: c.activeBackground, hoverBackground: c.activeBackground }) : c);
      const label = btn.querySelector('span');
      if (label) textStyle(label, active ? merge(c.text, c.activeText) : c.text);
    }
    if (!enabled(projectConfig.grid)) return;
    const grid = surface(el('div', 'project-grid', gallery), projectConfig.grid);
    style(grid, { '--desktop-columns': projectConfig.grid.desktopColumns, '--tablet-columns': projectConfig.grid.tabletColumns, '--mobile-columns': projectConfig.grid.mobileColumns, gap: projectConfig.grid.gap });
    const items = projectConfig.items.filter(p => enabled(p) && (category.all || p.categoryIds.includes(category.id)));
    for (const item of items) {
      const c = merge(projectConfig.cardDefaults, item);
      const card = surface(el('article', 'project-card', grid), c);
      card.dataset.project = item.id;
      if (enabled(c.thumbnail)) {
        const thumb = el('div', 'card-thumbnail', card);
        picture(c.thumbnail, thumb);
      }
      if (enabled(c.body)) {
        const body = surface(el('div', 'card-body', card), c.body);
        text('p', c.kicker, body, 'card-kicker');
        const line = el('div', 'card-title-line', body);
        text('h3', c.title, line);
        const arrow = text('span', c.arrow, line, 'card-arrow');
        if (arrow) arrow.setAttribute('aria-hidden', 'true');
        text('p', c.description, body, 'card-description');
        tagList(item, body);
      }
      if (enabled(projectConfig.detail) && enabled(P.projectContent[item.id])) {
        const hit = el('button', 'card-action', card);
        hit.type = 'button';
        hit.setAttribute('aria-label', `View ${item.title.value}`);
        hit.addEventListener('click', () => renderDetail(item));
        if (restoreId === item.id) hit.focus({ preventScroll: true });
      }
    }
    if (!items.length) text('p', projectConfig.emptyMessage, gallery, 'empty-state');
    announce(`${items.length} projects in ${category.text?.value || 'all work'}`);
  }
  function detailNav(project, content, parent, position) {
    const c = merge(projectConfig.detail, content);
    if (!enabled(c.navigation) || !enabled(c.navigation[position])) return;
    const nav = surface(el('div', 'detail-navigation', parent), c.navigation);
    const selected = !category.all && categoriesFor(project).find(cat => cat.id === category.id);
    const cat = selected || categoriesFor(project)[0];
    text('p', merge(c.breadcrumb, { value: [cat?.text?.value, project.title.value].filter(Boolean).join(c.breadcrumb.separator) }), nav, 'breadcrumb');
    button(c.backButton, nav, () => { renderGallery(project.id); gallery.scrollIntoView({ behavior: 'instant', block: 'start' }); });
  }
  function renderDetail(project) {
    closePopup(false);
    const content = P.projectContent[project.id] || {};
    const defaults = projectConfig.detail;
    const c = merge(defaults, content);
    gallery.replaceChildren();
    const detail = surface(el('article', 'project-detail', gallery), c);
    detailNav(project, content, detail, 'top');
    const title = text('h3', merge(defaults.title, { value: project.title.value }, content.title), detail, 'detail-title');
    if (title) { title.tabIndex = -1; title.focus({ preventScroll: true }); }
    text('p', c.description, detail, 'detail-intro');
    for (const raw of content.sections || []) {
      const section = merge(defaults.sectionDefaults, content.sectionDefaults, raw);
      if (!enabled(section)) continue;
      const node = surface(el('section', 'content-section', detail), section);
      if (section.id) node.id = section.id;
      text('h4', section.title, node, 'content-title');
      text('p', section.description, node, 'content-description');
      if (!enabled(section.mediaGrid)) continue;
      const media = surface(el('div', `media-grid ${section.type === 'code' ? 'code-grid' : ''}`, node), section.mediaGrid);
      style(media, { '--media-columns': section.mediaGrid.columns, gap: section.mediaGrid.gap });
      if (section.type === 'image') for (const img of section.images || []) renderImage(merge(section.imageDefaults, img), media);
      if (section.type === 'video') for (const vid of section.videos || []) renderVideo(merge(section.videoDefaults, vid), media);
      if (section.type === 'code') for (const block of section.blocks || []) renderCode(merge(section.codeDefaults, block), media);
    }
    detailNav(project, content, detail, 'bottom');
    tagList(project, detail, c.tags);
    gallery.scrollIntoView({ behavior: 'instant', block: 'start' });
    announce(`Viewing ${project.title.value}`);
  }
  function renderImage(c, parent) {
    if (!enabled(c)) return;
    const figure = surface(el('figure', 'media-image', parent), c);
    if (enabled(c.thumbnail)) {
      const expandable = enabled(G.lightbox) && enabled(c.lightbox);
      const wrap = el(expandable ? 'button' : 'div', 'image-trigger', figure);
      if (expandable) { wrap.type = 'button'; wrap.setAttribute('aria-label', `Expand ${c.alt || 'image'}`); }
      picture(merge(c, c.thumbnail), wrap);
      if (expandable) wrap.addEventListener('click', () => openLightbox(c, wrap));
    }
    text('figcaption', c.caption, figure);
  }
  function youtubeId(value) {
    try {
      const u = new URL(value);
      let id;
      if (u.hostname === 'youtu.be') id = u.pathname.slice(1).split('/')[0];
      else if (['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtube-nocookie.com', 'www.youtube-nocookie.com'].includes(u.hostname)) {
        id = u.searchParams.get('v') || u.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/)?.[1];
      }
      return /^[\w-]{11}$/.test(id || '') ? id : '';
    } catch { return ''; }
  }
  function renderVideo(c, parent) {
    if (!enabled(c)) return;
    const figure = surface(el('figure', 'media-video', parent), c);
    const stage = el('div', 'video-stage', figure);
    style(stage, { aspectRatio: c.thumbnail?.aspectRatio || '16 / 9' });
    if (enabled(c.thumbnail)) picture(c.thumbnail, stage);
    const id = youtubeId(c.url);
    if (id) {
      const play = button(c.playButton, stage, () => {
        stage.replaceChildren();
        const frame = el('iframe', '', stage);
        frame.title = c.title || 'Project video';
        frame.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen';
        frame.allowFullscreen = true;
        frame.referrerPolicy = 'strict-origin-when-cross-origin';
        frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        frame.focus();
      });
      play?.classList.add('video-play');
    } else {
      text('p', c.error, stage, 'video-error');
    }
    text('figcaption', c.caption, figure);
  }
  async function copyCode(value, buttonNode, config) {
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(value);
      else {
        const box = el('textarea', 'copy-helper', document.body);
        box.value = value; box.select();
        const copied = document.execCommand('copy'); box.remove();
        if (!copied) throw new Error('Clipboard unavailable');
      }
      announce('Code copied');
      buttonNode.setAttribute('aria-label', 'Code copied');
      const label = buttonNode.querySelector('span');
      if (label && enabled(config.copiedText)) {
        const old = label.textContent;
        const oldStyle = label.getAttribute('style');
        label.textContent = config.copiedText?.value || 'Copied';
        textStyle(label, merge(G.buttons.text, config.text, config.copiedText));
        setTimeout(() => { label.textContent = old; label.setAttribute('style', oldStyle || ''); }, 1600);
      }
    } catch { announce('Copy unavailable. Select the code and copy it manually.'); }
  }
  function renderCode(c, parent) {
    if (!enabled(c)) return;
    const wrap = surface(el('div', 'code-block', parent), c);
    if (enabled(c.header)) {
      const header = surface(el('div', 'code-header', wrap), c.header);
      text('span', c.name, header);
      const copy = button(c.copyButton, header, () => copyCode(c.code || '', copy, c.copyButton));
    }
    if (enabled(c.text) && enabled(G.text)) {
      const pre = el('pre', '', wrap);
      pre.tabIndex = 0;
      pre.setAttribute('aria-label', c.name?.value || 'Code sample');
      const code = el('code', '', pre);
      code.textContent = c.code || '';
      code.dataset.language = c.language || 'text';
      textStyle(code, c.text);
    }
  }
  function renderContact() {
    const c = P.contact;
    if (!enabled(c)) return;
    const section = surface(el('section', 'contact section', root), c);
    section.id = c.id;
    const inner = el('div', 'container', section);
    text('p', c.eyebrow, inner, 'eyebrow');
    text('h2', c.title, inner, 'contact-title');
    text('p', c.description, inner, 'contact-description');
    buttons(c.buttonGroup, c.buttons, inner);
    if (enabled(c.footer)) {
      const footer = surface(el('footer', 'contact-footer', inner), c.footer);
      text('p', merge(c.footer.copyright, { value: c.footer.copyright.value.replace('{year}', new Date().getFullYear()) }), footer);
      text('p', c.footer.note, footer);
    }
  }
  let popup = null, popupTrigger = null, popupVersion = 0;
  function closePopup(restoreFocus = true) {
    popupVersion++;
    if (!popup) return;
    const old = popup;
    popup = null;
    old.classList.remove('is-open');
    old.inert = true;
    const oldTrigger = popupTrigger;
    popupTrigger = null;
    oldTrigger?.setAttribute('aria-expanded', 'false');
    if (restoreFocus && oldTrigger?.isConnected) oldTrigger.focus({ preventScroll: true });
    setTimeout(() => old.remove(), motion() ? G.motion.duration : 0);
  }
  function openPopup(raw, trigger) {
    if (!enabled(G.popup) || !enabled(raw)) return;
    if (popupTrigger === trigger) { closePopup(); return; }
    const wasOpen = !!popup;
    closePopup(false);
    const version = ++popupVersion;
    setTimeout(() => {
      if (version !== popupVersion) return;
      const c = merge(G.popup, raw);
      const panel = surface(el('aside', 'content-popup', overlayRoot), c);
      panel.id = 'content-popup';
      panel.setAttribute('role', 'dialog');
      panel.setAttribute('aria-modal', 'false');
      panel.setAttribute('aria-label', c.title?.value || 'More information');
      panel.tabIndex = -1;
      style(panel, { width: c.width, maxHeight: c.maxHeight });
      // Preserve access to adjacent home buttons so visitors can switch panels.
      const spaceBelowTrigger = window.innerHeight - trigger.getBoundingClientRect().bottom - 18;
      if (c.keepTriggerVisible && trigger.closest('.hero') && spaceBelowTrigger >= 160) {
        panel.style.maxHeight = `min(${c.maxHeight}, ${Math.floor(spaceBelowTrigger)}px)`;
      }
      const close = button(c.close, panel, () => closePopup());
      close?.classList.add('popup-close');
      text('p', c.eyebrow, panel, 'eyebrow');
      const title = text('h2', c.title, panel, 'popup-title');
      if (title) { title.id = 'popup-title'; panel.setAttribute('aria-labelledby', title.id); }
      text('p', c.content, panel, 'popup-content');
      buttons(c.buttonGroup, c.buttons, panel);
      popup = panel; popupTrigger = trigger;
      trigger.setAttribute('aria-expanded', 'true');
      requestAnimationFrame(() => { if (popup === panel) { panel.classList.add('is-open'); panel.focus({ preventScroll: true }); } });
    }, wasOpen && motion() ? G.motion.duration : 0);
  }
  function openLightbox(c, trigger) {
    const config = merge(G.lightbox, c.lightbox);
    const dialog = surface(el('dialog', 'lightbox', overlayRoot), config);
    dialog.setAttribute('aria-label', c.alt || 'Expanded image');
    style(dialog, { padding: config.padding });
    button(config.close, dialog, () => dialog.close())?.classList.add('lightbox-close');
    const full = merge(c, { src: c.fullSrc || c.src, srcset: c.fullSrcset || '', sources: c.fullSources || [], sizes: '95vw', objectFit: 'contain', aspectRatio: 'auto' });
    picture(full, dialog, true);
    text('p', merge(config.caption, { value: c.caption?.value || c.alt }, c.lightbox?.caption), dialog, 'lightbox-caption');
    dialog.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { dialog.remove(); document.body.classList.remove('modal-open'); trigger.focus({ preventScroll: true }); });
    document.body.classList.add('modal-open');
    dialog.showModal();
  }
  function initEvents() {
    let top;
    if (enabled(G.backToTop)) {
      top = button(G.backToTop, overlayRoot, () => {
        closePopup(false);
        window.scrollTo({ top: 0, behavior: motion() && G.motion.smoothScroll ? 'smooth' : 'instant' });
        const home = document.getElementById(P.home.id) || root;
        home.tabIndex = -1; home.focus({ preventScroll: true });
      });
      top.classList.add('back-top');
    }
    const update = () => { if (top) top.hidden = window.scrollY < G.backToTop.threshold; };
    window.addEventListener('scroll', () => { closePopup(false); update(); }, { passive: true });
    window.addEventListener('wheel', event => { if (popup && !popup.contains(event.target)) closePopup(false); }, { passive: true });
    window.addEventListener('touchmove', event => { if (popup && !popup.contains(event.target)) closePopup(false); }, { passive: true });
    window.addEventListener('keydown', event => { if (event.key === 'Escape' && popup) closePopup(); });
    update();
  }
  initGlobal();
  if (enabled(G)) { renderHome(); renderProjects(); renderContact(); initEvents(); }
})();
