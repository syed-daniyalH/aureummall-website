/** Geometry for the floating header's reversible scroll sequence. */
export const clamp01 = (n: number) => Math.max(0, Math.min(1, n));
const ease = (n: number) => {
  const x = clamp01(n);
  return x * x * (3 - 2 * x);
};

/** Expand during 0–35%, hold until 65%, then shrink and move upward. */
export function getHeaderMotion(progress: number, viewportWidth: number) {
  const viewport = Math.max(0, viewportWidth);
  const mobile = viewport <= 768;
  const compact = mobile ? Math.max(0, viewport - 24) : Math.min(1120, viewport * 0.85);
  const expanded = Math.max(0, viewport - 24);
  const stretch = mobile ? 0 : ease(progress / 0.35) - ease((progress - 0.65) / 0.35);
  return {
    width: compact + (expanded - compact) * stretch,
    top: mobile ? 12 : 16 - 8 * ease((progress - 0.65) / 0.35),
    radius: 999 - 971 * stretch,
  };
}
