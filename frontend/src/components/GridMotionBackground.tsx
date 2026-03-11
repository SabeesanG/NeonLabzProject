export default function GridMotionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grid-motion-base" />
      <div className="grid-motion-lines grid-motion-move-slow" />
      <div className="grid-motion-lines grid-motion-move-fast" />
      <div className="grid-motion-glow" />
      <div className="grid-motion-scan" />
    </div>
  );
}
