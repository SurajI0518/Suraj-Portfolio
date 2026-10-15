Portfolio.contact = {
  enabled: true, id: "contact",
  background: { enabled: true, colors: ["#1d271b", "#121712"], angle: 120, opacity: 1 },
  style: { borderTop: "1px solid #394232" },
  eyebrow: { enabled: true, value: "02 / CONTACT", color: "#d4f694", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em" },
  title: { enabled: true, value: "Let’s make\nsomething extraordinary.", fontSize: "clamp(38px, 5.2vw, 78px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.045em", whiteSpace: "pre-line" },
  description: { enabled: true, value: "Have an idea, an interesting challenge, or just want to say hello?\nI’d love to hear from you.", color: "#acb6a4", fontSize: "1rem", whiteSpace: "pre-line" },
  buttonGroup: { enabled: true, style: { gap: "12px" } },
  buttons: [
    { enabled: true, type: "redirect", url: "mailto:hello@example.com", text: { enabled: true, value: "Email me" } },
    { enabled: true, type: "redirect", url: "https://www.linkedin.com/", text: { enabled: true, value: "LinkedIn" }, textStyle: { color: "#eef0e8" }, background: { enabled: true, colors: ["transparent"], angle: 0, opacity: 1 }, style: { borderColor: "#506044" } },
    { enabled: true, type: "redirect", url: "https://github.com/", text: { enabled: true, value: "GitHub" }, textStyle: { color: "#eef0e8" }, background: { enabled: true, colors: ["transparent"], angle: 0, opacity: 1 }, style: { borderColor: "#506044" } }
  ],
  footer: {
    enabled: true, style: { borderTop: "1px solid #394232" },
    copyright: { enabled: true, value: "© {year} Your Name", fontSize: "0.72rem", color: "#8e9a86" },
    note: { enabled: true, value: "MADE AT THE INTERSECTION OF ART & CODE", fontSize: "0.62rem", letterSpacing: "0.12em", color: "#8e9a86" }
  }
};
