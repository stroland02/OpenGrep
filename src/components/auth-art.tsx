/**
 * The right-hand brand panel on the auth screens: a periwinkle field carrying
 * a woven moiré band, wireframe-globe tiles and chartreuse accents, captioned
 * "The OpenGrep System".
 *
 * Rendered as inline SVG so it needs no assets and scales to any viewport.
 */
export function AuthArt() {
  const globes = [
    { x: 210, y: 120, r: 46 },
    { x: 250, y: 300, r: 68 },
    { x: 190, y: 520, r: 38 },
    { x: 255, y: 690, r: 92 },
    { x: 205, y: 900, r: 52 },
  ];

  return (
    <div className="relative hidden h-full w-full overflow-hidden bg-[#5b5bef] lg:block">
      <svg
        viewBox="0 0 500 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {/* Woven moiré band — overlapping sine curves in coral and white. */}
        <g opacity="0.85">
          {Array.from({ length: 46 }).map((_, i) => {
            const phase = i * 0.34;
            const amp = 118 + Math.sin(i * 0.5) * 26;
            const d = Array.from({ length: 60 }).map((__, j) => {
              const y = (j / 59) * 1000;
              const x = 250 + Math.sin(y / 118 + phase) * amp;
              return `${j === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
            });
            return (
              <path
                key={i}
                d={d.join(" ")}
                fill="none"
                stroke={i % 3 === 0 ? "#ff8a63" : "#ffffff"}
                strokeWidth="0.7"
                opacity={i % 3 === 0 ? 0.75 : 0.4}
              />
            );
          })}
        </g>

        {/* Wireframe globes on lighter tiles. */}
        {globes.map((g, i) => (
          <g key={i}>
            <rect
              x={g.x - g.r - 16}
              y={g.y - g.r - 16}
              width={(g.r + 16) * 2}
              height={(g.r + 16) * 2}
              fill="#7b96f0"
              opacity="0.55"
            />
            <circle
              cx={g.x}
              cy={g.y}
              r={g.r}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.9"
              opacity="0.85"
            />
            {/* Latitudes */}
            {[-0.62, -0.3, 0, 0.3, 0.62].map((t, k) => (
              <ellipse
                key={k}
                cx={g.x}
                cy={g.y + g.r * t}
                rx={g.r * Math.sqrt(Math.max(0, 1 - t * t))}
                ry={g.r * 0.13}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.7"
                opacity="0.6"
              />
            ))}
            {/* Longitudes */}
            {[0.24, 0.52, 0.8, 1].map((t, k) => (
              <ellipse
                key={k}
                cx={g.x}
                cy={g.y}
                rx={g.r * t}
                ry={g.r}
                fill="none"
                stroke="#ffffff"
                strokeWidth="0.7"
                opacity="0.5"
              />
            ))}
          </g>
        ))}

        {/* Chartreuse square accents. */}
        {[
          [150, 250],
          [345, 255],
          [150, 640],
          [352, 646],
          [200, 960],
        ].map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="11" height="11" fill="#e8f87a" />
        ))}
      </svg>

      <p className="absolute bottom-10 right-10 text-right text-[22px] font-bold leading-tight text-[#e8f87a]">
        The OpenGrep
        <br />
        System
      </p>
    </div>
  );
}

/** Shared shell for the split auth screens. */
export function AuthSplit({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-white lg:grid-cols-[40%_60%]">
      <div className="flex items-center justify-center px-8 py-16">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
      <AuthArt />
    </div>
  );
}
