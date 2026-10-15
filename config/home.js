Portfolio.home = {
  enabled: true, id: "home",
  background: { enabled: true, colors: ["#151c18"], angle: 135, opacity: 1 },
  image: { enabled: true, src: "assets/images/hero-terrain.svg", alt: "Abstract wireframe landscape", objectFit: "cover", objectPosition: "center", opacity: 1 },
  overlay: { enabled: true, colors: ["#0c100e22", "#0c100edb"], angle: 180, opacity: 1 },
  style: { textAlign: "center" },
  content: { enabled: true, style: { maxWidth: "1100px" } },
  eyebrow: { enabled: true, value: "ART / CODE / REAL-TIME", color: "#d4f694", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.24em", textAlign: "center" },
  name: { enabled: true, value: "Your Name", fontSize: "clamp(64px, 10.5vw, 156px)", fontWeight: 500, letterSpacing: "-0.065em", lineHeight: 1.02, textAlign: "center" },
  role: { enabled: true, value: "Technical Artist", fontSize: "clamp(20px, 2.3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "#c8d1bd", textAlign: "center" },
  description: { enabled: true, value: "Bridging the space between imagination and implementation.", fontSize: "clamp(14px, 1.15vw, 18px)", color: "#b4beb0", textAlign: "center", lineHeight: 1.6 },
  buttonGroup: { enabled: true, style: { gap: "12px", marginTop: "32px" } },
  buttons: [
    { enabled: true, id: "work", type: "navigate", target: "projects", text: { enabled: true, value: "Explore my work" }, icon: { enabled: true, value: "↓" } },
    {
      enabled: true, id: "about", type: "popup", text: { enabled: true, value: "About me" }, icon: { enabled: true, value: "+" },
      background: { enabled: true, colors: ["#15201799"], angle: 0, opacity: 1 },
      hoverBackground: { enabled: true, colors: ["#283623"], angle: 0, opacity: 1 },
      style: { borderColor: "#89937b66", backdropFilter: "blur(12px)" },
      textStyle: { color: "#eef0e8" },
      popup: {
        enabled: true,
        eyebrow: { enabled: true, value: "A LITTLE ABOUT ME", color: "#d4f694", fontSize: "0.7rem", letterSpacing: "0.18em" },
        title: { enabled: true, value: "Creative thinking. Technical curiosity." },
        content: { enabled: true, value: "This is your space to tell your story. Introduce your practice, the tools you enjoy, and the kind of creative problems you love to solve.\n\nReplace this sample with your own background, experience, and what you want to build next." },
        buttons: [{ enabled: true, type: "navigate", target: "contact", text: { enabled: true, value: "Let’s connect" } }]
      }
    },
    {
      enabled: true, id: "resume", type: "redirect", url: "assets/documents/resume-placeholder.html",
      text: { enabled: true, value: "Résumé" }, textStyle: { color: "#eef0e8" },
      background: { enabled: true, colors: ["transparent"], angle: 0, opacity: 1 },
      hoverBackground: { enabled: true, colors: ["#ffffff12"], angle: 0, opacity: 1 }
    }
  ],
  footer: {
    enabled: true,
    left: { enabled: true, value: "A PORTFOLIO IN ART & ENGINEERING", color: "#adb6a5", fontSize: "0.65rem", letterSpacing: "0.14em" },
    right: { enabled: true, value: "SCROLL TO EXPLORE  ↓", color: "#adb6a5", fontSize: "0.65rem", letterSpacing: "0.14em" }
  }
};
