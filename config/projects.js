Portfolio.projects = {
  enabled: true, id: "projects", defaultCategory: "all",
  background: { enabled: true, colors: ["#101211"], angle: 0, opacity: 1 },
  style: {},
  eyebrow: { enabled: true, value: "01 / SELECTED WORK", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", color: "#d4f694" },
  title: { enabled: true, value: "Projects", fontSize: "clamp(42px, 5.3vw, 76px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.045em" },
  description: { enabled: true, value: "Experiments, systems, and worlds.\nA selection of what happens when art meets code.", color: "#929b8c", fontSize: "0.9rem", whiteSpace: "pre-line" },
  categoriesBar: { enabled: true, style: { gap: "8px" } },
  categoryDefaults: {
    enabled: true, text: { enabled: true, fontSize: "0.78rem", color: "#a7afa0", fontWeight: 500 },
    background: { enabled: true, colors: ["transparent"], angle: 0, opacity: 1 },
    hoverBackground: { enabled: true, colors: ["#2c3427"], angle: 0, opacity: 1 },
    activeBackground: { enabled: true, colors: ["#d4f694"], angle: 0, opacity: 1 },
    activeText: { color: "#192113" },
    icon: { enabled: false }, style: { padding: "10px 18px", borderRadius: "2px", minHeight: "44px" }
  },
  categories: [
    { enabled: true, id: "all", all: true, text: { enabled: true, value: "All work" } },
    { enabled: true, id: "shaders", text: { enabled: true, value: "Shaders & VFX" } },
    { enabled: true, id: "tools", text: { enabled: true, value: "Tools & Pipelines" } },
    { enabled: true, id: "procedural", text: { enabled: true, value: "Procedural Art" } },
    { enabled: true, id: "game-jam", text: { enabled: true, value: "Game Jam" } }
  ],
  grid: { enabled: true, desktopColumns: 3, tabletColumns: 2, mobileColumns: 1, gap: "28px" },
  cardDefaults: {
    enabled: true,
    background: { enabled: true, colors: ["#181c17"], angle: 130, opacity: 1 },
    hoverBackground: { enabled: true, colors: ["#22291e"], angle: 130, opacity: 1 },
    style: { border: "1px solid #30372b", borderRadius: "5px" },
    thumbnail: { enabled: true, aspectRatio: "16 / 10", objectFit: "cover", objectPosition: "center" },
    body: { enabled: true, style: { padding: "24px" } },
    kicker: { enabled: true, color: "#8c9b7d", fontSize: "0.61rem", letterSpacing: "0.13em", fontWeight: 600 },
    title: { enabled: true, color: "#edf0e7", fontSize: "clamp(21px, 1.7vw, 27px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.025em" },
    description: { enabled: true, color: "#a0a997", fontSize: "0.85rem", lineHeight: 1.7 },
    arrow: { enabled: true, value: "↗", color: "#b5c7a0", fontSize: "1.35rem" },
    tags: { enabled: true, style: { gap: "6px" } },
    tagDefaults: { enabled: true, text: { enabled: true, color: "#a8b59c", fontSize: "0.61rem", fontWeight: 500 }, background: { enabled: true, colors: ["#242b20"], angle: 0, opacity: 1 }, style: { padding: "4px 8px", borderRadius: "2px" } }
  },
  detail: {
    enabled: true,
    navigation: { enabled: true, top: { enabled: true }, bottom: { enabled: true }, style: {} },
    breadcrumb: { enabled: true, separator: " > ", fontSize: "0.82rem", color: "#aebba2" },
    backButton: { enabled: true, text: { enabled: true, value: "Back to projects" }, icon: { enabled: true, value: "←" }, style: { padding: "10px 16px" } },
    title: { enabled: true, fontSize: "clamp(34px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.04em" },
    description: { enabled: true, fontSize: "1.05rem", color: "#a9b39f", lineHeight: 1.8 },
    tags: { enabled: true },
    sectionDefaults: {
      enabled: true,
      background: { enabled: true, colors: ["#181e16"], angle: 135, opacity: 1 },
      style: { padding: "clamp(20px, 4vw, 48px)", borderRadius: "5px", border: "1px solid #303a29" },
      title: { enabled: true, fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.03em" },
      description: { enabled: true, fontSize: "0.95rem", color: "#a6b29b", whiteSpace: "pre-line" },
      mediaGrid: { enabled: true, columns: 2, gap: "16px" },
      imageDefaults: { enabled: true, thumbnail: { enabled: true, objectFit: "cover", aspectRatio: "16 / 10" }, caption: { enabled: true, fontSize: "0.8rem", color: "#a6b29b" } },
      videoDefaults: {
        enabled: true, thumbnail: { enabled: true, aspectRatio: "16 / 9", objectFit: "cover" },
        playButton: { enabled: true, text: { enabled: true, value: "Play video" }, icon: { enabled: true, value: "▷" } },
        caption: { enabled: true, fontSize: "0.8rem", color: "#a6b29b" },
        error: { enabled: true, value: "Add a valid YouTube URL in the project config.", color: "#d4f694" }
      },
      codeDefaults: {
        enabled: true, header: { enabled: true },
        name: { enabled: true, fontSize: "0.8rem", color: "#c6d7b5", fontWeight: 600 },
        text: { enabled: true, fontFamily: null, fontSize: "0.84rem", lineHeight: 1.8, color: "#d1e4bf", whiteSpace: "pre" },
        background: { enabled: true, colors: ["#10160e"], angle: 0, opacity: 1 },
        copyButton: { enabled: true, text: { enabled: true, value: "Copy" }, copiedText: { enabled: true, value: "Copied" }, icon: { enabled: false }, style: { padding: "6px 12px", minHeight: "36px" } }
      }
    }
  },
  emptyMessage: { enabled: true, value: "More experiments are on the way. Explore another category.", color: "#a6b29b" },
  items: [
    {
      enabled: true, id: "terrain", categoryIds: ["procedural", "shaders"],
      thumbnail: { enabled: true, src: "assets/images/terrain.svg", alt: "Layered green procedural landscape" },
      kicker: { enabled: true, value: "01 / PROCEDURAL WORLDS" },
      title: { enabled: true, value: "Terrain, reimagined" },
      description: { enabled: true, value: "From a field of noise to a world worth exploring. A procedural landscape study." },
      tags: [{ enabled: true, text: { value: "Houdini" } }, { enabled: true, text: { value: "Unreal Engine" } }, { enabled: true, text: { value: "Procedural" } }]
    },
    {
      enabled: true, id: "iridescence", categoryIds: ["shaders"],
      thumbnail: { enabled: true, src: "assets/images/iridescence.svg", alt: "Iridescent material sphere" },
      kicker: { enabled: true, value: "02 / MATERIAL EXPLORATION" },
      title: { enabled: true, value: "Iridescence lab" },
      description: { enabled: true, value: "A play of light, layers, and shifting color. Exploring expressive real-time materials." },
      background: { enabled: true, colors: ["#20221c", "#161b17"], angle: 145, opacity: 1 },
      tags: [{ enabled: true, text: { value: "HLSL" } }, { enabled: true, text: { value: "Shaders" } }]
    },
    {
      enabled: true, id: "morphbound", categoryIds: ["game-jam", "shaders"],
      thumbnail: { enabled: true, src: "assets/images/morphbound.svg", alt: "Stylized luminous portal in a geometric landscape" },
      kicker: { enabled: true, value: "03 / GAME JAM" },
      title: { enabled: true, value: "MorphBound" },
      description: { enabled: true, value: "An imagined world in constant transformation. A sample game project breakdown." },
      tags: [{ enabled: true, text: { value: "Unreal Engine" } }, { enabled: true, text: { value: "C++" } }, { enabled: true, text: { value: "Game Jam" } }]
    },
    {
      enabled: true, id: "scatter", categoryIds: ["tools", "procedural"],
      thumbnail: { enabled: true, src: "assets/images/scatter.svg", alt: "Procedurally scattered forms on an isometric grid" },
      kicker: { enabled: true, value: "04 / ARTIST TOOLS" },
      title: { enabled: true, value: "Scatter studio" },
      description: { enabled: true, value: "Small tools, bigger possibilities. An artist-friendly approach to building environments." },
      tags: [{ enabled: true, text: { value: "Python" } }, { enabled: true, text: { value: "Houdini" } }]
    },
    {
      enabled: true, id: "particles", categoryIds: ["shaders"],
      thumbnail: { enabled: true, src: "assets/images/particles.svg", alt: "Warm flowing particle trails" },
      kicker: { enabled: true, value: "05 / REAL-TIME VFX" },
      title: { enabled: true, value: "Fields of motion" },
      description: { enabled: true, value: "Finding rhythm in the unpredictable. A study of particles, flow, and motion." },
      tags: [{ enabled: true, text: { value: "Niagara" } }, { enabled: true, text: { value: "VFX" } }]
    },
    {
      enabled: true, id: "pipeline", categoryIds: ["tools"],
      thumbnail: { enabled: true, src: "assets/images/pipeline.svg", alt: "Connected nodes forming a procedural tool graph" },
      kicker: { enabled: true, value: "06 / PIPELINE DEVELOPMENT" },
      title: { enabled: true, value: "A better workflow" },
      description: { enabled: true, value: "Less repetition, more creation. Connecting the steps between idea and engine." },
      tags: [{ enabled: true, text: { value: "Python" } }, { enabled: true, text: { value: "Pipeline" } }]
    }
  ]
};
