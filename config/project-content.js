/* Keys match projects.items[].id. Sections appear in list order.
   Duplicate any section or media item. There is no fixed item limit.
   These are illustrative samples, not claims about your past work. */
Portfolio.projectContent = {
  terrain: {
    enabled: true,
    description: { enabled: true, value: "A sample breakdown of a procedural landscape system. Replace these sections with your process, decisions, and results." },
    sections: [
      {
        enabled: true, type: "image", id: "terrain-study",
        title: { enabled: true, value: "Building a world from a simple idea" },
        description: { enabled: true, value: "Start with a broad silhouette, layer in detail, and give artists meaningful controls. These original vector studies stand in for your screenshots and renders." },
        images: [
          { enabled: true, src: "assets/images/terrain.svg", alt: "Procedural terrain study", caption: { enabled: true, value: "01 — Landscape study. Click to expand." } },
          { enabled: true, src: "assets/images/hero-terrain.svg", alt: "Wireframe landscape study", caption: { enabled: true, value: "02 — Structure and topology." } },
          { enabled: true, src: "assets/images/hero-terrain.svg", alt: "Wireframe landscape study", caption: { enabled: true, value: "02 — Structure and topology." } },
        ]

      },
      {
        enabled: true, type: "code", id: "terrain-code",
        title: { enabled: true, value: "The building blocks" },
        description: { enabled: true, value: "An illustrative layered-noise function. Replace this with your own implementation; code is displayed as text, never executed." },
        blocks: [
          { enabled: true, name: { enabled: true, value: "TerrainNoise.hlsl" }, language: "hlsl", code: "float LayeredNoise(float2 position)\n{\n    float height = 0.0;\n    float amplitude = 0.5;\n    float frequency = 1.0;\n\n    for (int octave = 0; octave < 5; ++octave)\n    {\n        height += Noise(position * frequency) * amplitude;\n        frequency *= 2.0;\n        amplitude *= 0.5;\n    }\n\n    return height;\n}" }
        ]
      },
      {
        enabled: true, type: "video", id: "terrain-video",
        title: { enabled: true, value: "See it in motion" },
        description: { enabled: true, value: "Video slot demonstration: this is an external Big Buck Bunny sample, not footage of this project. Replace the YouTube URL and thumbnail with your own work. YouTube loads only when you press play." },
        mediaGrid: { columns: 1 },
        videos: [{ enabled: true, url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ", title: "Big Buck Bunny — demonstration video", thumbnail: { enabled: true, src: "assets/images/terrain.svg", alt: "Demo video placeholder — replace with your own thumbnail" }, caption: { enabled: true, value: "External demo video · Replace before publishing" } }]
      }
    ]
  },
  iridescence: {
    enabled: true,
    description: { enabled: true, value: "A sample material exploration. Describe your artistic target, rendering approach, and the compromises you made." },
    sections: [
      { enabled: true, type: "image", title: { enabled: true, value: "Light as a material" }, description: { enabled: true, value: "Use this space for shader comparisons, lighting passes, and final renders." }, mediaGrid: { columns: 1 }, images: [{ enabled: true, src: "assets/images/iridescence.svg", alt: "Iridescent sphere study", caption: { enabled: true, value: "Illustrative material study" } }] },
      { enabled: true, type: "code", title: { enabled: true, value: "A view-dependent color ramp" }, description: { enabled: true, value: "Illustrative HLSL for a simple rim-based tint." }, blocks: [{ enabled: true, name: { enabled: true, value: "Iridescence.hlsl" }, language: "hlsl", code: "float facing = saturate(dot(normalize(N), normalize(V)));\nfloat rim = pow(1.0 - facing, RimPower);\nfloat3 tint = lerp(BaseColor, EdgeColor, rim);\nreturn tint;" }] }
    ]
  },
  morphbound: {
    enabled: true,
    description: { enabled: true, value: "MorphBound is an illustrative project title. Replace this introduction with your game jam brief, role, team, and contribution." },
    sections: [
      { enabled: true, type: "image", title: { enabled: true, value: "A world between states" }, description: { enabled: true, value: "Show your game world, mechanics, and visual development here." }, mediaGrid: { columns: 1 }, background: { enabled: true, colors: ["#1d242d", "#151c19"], angle: 145, opacity: 1 }, images: [{ enabled: true, src: "assets/images/morphbound.svg", alt: "Imaginary MorphBound world", caption: { enabled: true, value: "Original vector concept / demonstration content" } }] },
      { enabled: true, type: "code", title: { enabled: true, value: "From idea to behavior" }, description: { enabled: true, value: "Separate files can live in the same section. Add as many blocks as you need." }, blocks: [
        { enabled: true, name: { enabled: true, value: "Enemy.h" }, language: "cpp", code: "#pragma once\n\nclass Enemy\n{\npublic:\n    void Update(float deltaTime);\nprivate:\n    float phase = 0.0f;\n};" },
        { enabled: true, name: { enabled: true, value: "Enemy.cpp" }, language: "cpp", code: '#include "Enemy.h"\n\nvoid Enemy::Update(float deltaTime)\n{\n    phase += deltaTime;\n    // Your gameplay logic here.\n}' }
      ] }
    ]
  },
  scatter: {
    enabled: true,
    description: { enabled: true, value: "A sample artist-tool case study. Explain the manual task you improved and how an artist uses the finished tool." },
    sections: [
      { enabled: true, type: "image", title: { enabled: true, value: "Controlled variation" }, description: { enabled: true, value: "Show the interface, distribution controls, and results side by side." }, mediaGrid: { columns: 1 }, images: [{ enabled: true, src: "assets/images/scatter.svg", alt: "Procedural scatter study" }] },
      { enabled: true, type: "code", title: { enabled: true, value: "Repeatable by design" }, description: { enabled: true, value: "An illustrative seeded point generator. A stable seed makes iteration reproducible." }, blocks: [{ enabled: true, name: { enabled: true, value: "scatter.py" }, language: "python", code: "import random\n\ndef scatter_points(count, seed=42):\n    rng = random.Random(seed)\n    return [(rng.uniform(-1, 1), rng.uniform(-1, 1))\n            for _ in range(count)]" }] }
    ]
  },
  particles: {
    enabled: true, description: { enabled: true, value: "A sample visual effects study. Replace the artwork with captures from your own real-time effects." },
    sections: [{ enabled: true, type: "image", title: { enabled: true, value: "Finding the flow" }, description: { enabled: true, value: "Break down the force fields, timing, and color choices that give the effect its character." }, mediaGrid: { columns: 1 }, images: [{ enabled: true, src: "assets/images/particles.svg", alt: "Flowing particle field" }] }]
  },
  pipeline: {
    enabled: true, description: { enabled: true, value: "A sample pipeline project. Describe the handoff between your DCC tool, validation step, and game engine." },
    sections: [
      { enabled: true, type: "image", title: { enabled: true, value: "Connect the creative process" }, description: { enabled: true, value: "Use diagrams and captures to communicate where your tool fits in the production process." }, mediaGrid: { columns: 1 }, images: [{ enabled: true, src: "assets/images/pipeline.svg", alt: "Connected procedural nodes" }] },
      { enabled: true, type: "code", title: { enabled: true, value: "Validate before export" }, description: { enabled: true, value: "An illustrative validation utility. Document inputs and error cases alongside your code." }, blocks: [{ enabled: true, name: { enabled: true, value: "validate.py" }, language: "python", code: 'def validate_asset(asset):\n    errors = []\n    if not asset.name.startswith("SM_"):\n        errors.append("Use the SM_ naming prefix.")\n    if not asset.materials:\n        errors.append("Assign at least one material.")\n    return errors' }] }
    ]
  }
};
