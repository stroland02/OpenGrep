"use client";

/**
 * The right-hand status canvas on the connect and indexing screens: a
 * constellation of file-type chips arranged on a wireframe sphere, captioned
 * with a monospace all-caps status line that tracks wizard progress.
 */
export function CodeGraph({
  status,
  annotated,
}: {
  status: string;
  annotated?: { subject: string; files: string[] };
}) {
  // Deterministic placement — a fixed lattice rather than random, so the
  // figure is stable across renders.
  const nodes = React.useMemo(() => buildSphere(96), []);

  const chipColors = ["#8ee6b8", "#8fb6f5", "#f5e08f", "#f5a8d8"];

  return (
    <div className="dotted relative h-full w-full">
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {/* Edges between nearby nodes give the point cloud its structure. */}
        <g stroke="#c9c9c5" strokeWidth="0.4" opacity="0.7">
          {nodes.flatMap((a, i) =>
            nodes.slice(i + 1).map((b, j) => {
              const d = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
              if (d > 46) return null;
              return (
                <line
                  key={`${i}-${j}`}
                  x1={300 + a.x}
                  y1={300 + a.y}
                  x2={300 + b.x}
                  y2={300 + b.y}
                />
              );
            }),
          )}
        </g>

        {nodes.map((n, i) => {
          // Every fourth node carries a coloured file chip; the rest are dots.
          if (i % 4 !== 0) {
            return (
              <circle
                key={i}
                cx={300 + n.x}
                cy={300 + n.y}
                r={1.6}
                fill="#b0b0ac"
                opacity={0.5 + n.depth * 0.5}
              />
            );
          }
          const size = 8 + n.depth * 12;
          return (
            <rect
              key={i}
              x={300 + n.x - size / 2}
              y={300 + n.y - size / 2}
              width={size}
              height={size}
              rx={2.5}
              fill={chipColors[i % chipColors.length]}
              opacity={0.45 + n.depth * 0.55}
            />
          );
        })}
      </svg>

      {annotated && (
        <div className="absolute right-8 top-8 rounded-[5px] border border-line bg-surface px-3 py-2">
          <p className="mono-label">Fig.1 Codegraph for</p>
          <p className="mono-label text-ink">{annotated.subject.toUpperCase()}</p>
        </div>
      )}

      <p className="mono-label absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
        {status}
      </p>
    </div>
  );
}

import * as React from "react";

/** Fibonacci lattice — evenly distributed points on a sphere. */
function buildSphere(count: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const radius = 190;

  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;

    return {
      x: Math.cos(theta) * r * radius,
      y: y * radius,
      z: Math.sin(theta) * r * radius,
      // Depth drives size and opacity so the sphere reads as three-dimensional.
      depth: (Math.sin(theta) * r + 1) / 2,
    };
  });
}
