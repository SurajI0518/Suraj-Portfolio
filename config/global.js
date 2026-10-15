/* START HERE. No build tools, packages, account, or API keys required.
   Every visible component accepts enabled: false. See CUSTOMIZATION.md. */
window.Portfolio = {};
Portfolio.global = {
  enabled: true,
  page: { title: "Your Name — Technical Artist", description: "Technical art, real-time worlds, and the tools that bring them to life.", language: "en" },
  fonts: {
    family: '"Segoe UI", Arial, sans-serif', // Change this once for ALL text.
    faces: [
      // { enabled: true, family: "My Font", src: "assets/fonts/my-font.woff2", weight: "100 900", style: "normal" }
    ]
  },
  text: {
    enabled: true, fontFamily: null, color: "#eef0e8", fontSize: "1rem", fontWeight: 400,
    lineHeight: 1.65, letterSpacing: "0em", textAlign: "left", textTransform: "none",
    fontStyle: "normal", textDecoration: "none", whiteSpace: "normal", opacity: 1
  },
  background: { enabled: true, colors: ["#101211"], angle: 135, opacity: 1 },
  layout: { maxWidth: "1440px", sectionPadding: "clamp(24px, 5vw, 88px)", sectionGap: "clamp(72px, 9vw, 140px)" },
  theme: { accent: "#d4f694", muted: "#a4aaa2", line: "#343a32", focus: "#e5ffb8", radius: "4px" },
  motion: { enabled: true, duration: 260, smoothScroll: true },
  buttons: {
    enabled: true,
    background: { enabled: true, colors: ["#d4f694"], angle: 120, opacity: 1 },
    hoverBackground: { enabled: true, colors: ["#e6ffb9"], angle: 120, opacity: 1 },
    text: { enabled: true, color: "#14200e", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.01em", lineHeight: 1.3 },
    icon: { enabled: true, value: "↗" },
    style: { padding: "16px 24px", borderRadius: "3px", borderColor: "transparent", borderWidth: "1px", borderStyle: "solid", minHeight: "48px", gap: "24px" }
  },
  popup: {
    enabled: true, width: "95%", maxHeight: "75dvh", keepTriggerVisible: true,
    background: { enabled: true, colors: ["#20281e", "#141914"], angle: 130, opacity: 1 },
    style: { padding: "clamp(24px, 4vw, 64px)", borderRadius: "12px 12px 0 0", border: "1px solid #46523d", boxShadow: "0 -16px 80px #0007" },
    title: { enabled: true, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 500, lineHeight: 1.12, letterSpacing: "-0.03em" },
    content: { enabled: true, fontSize: "clamp(16px, 1.5vw, 20px)", color: "#c3cbbb", lineHeight: 1.8, whiteSpace: "pre-line" },
    close: { enabled: true, label: "Close panel", text: { value: "↓" }, icon: { enabled: false }, style: { padding: "8px 16px" } }
  },
  lightbox: {
    enabled: true, padding: "clamp(16px, 4vw, 64px)",
    background: { enabled: true, colors: ["#080b08f5"], angle: 0, opacity: 1 },
    close: { enabled: true, label: "Close image", text: { value: "Close ×" }, icon: { enabled: false } },
    caption: { enabled: true, fontSize: "0.85rem", color: "#c3cbbb", textAlign: "center" }
  },
  backToTop: {
    enabled: true, threshold: 380, label: "Back to top", text: { enabled: true, value: "↑", fontSize: "1.3rem" }, icon: { enabled: false },
    style: { padding: "10px", borderRadius: "50%", width: "48px", height: "48px" }
  },
  accessibility: { skipLink: { enabled: true, text: "Skip to projects", target: "projects" }, announceChanges: true }
};
