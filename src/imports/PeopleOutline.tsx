import svgPaths from "./svg-2fmgjnirci";

export default function PeopleOutline({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[24px]"} data-name="people-outline">
      <div className="absolute contents inset-0" data-name="Layer 2">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
          <g id="people">
            <path d="M24 0H0V24H24V0Z" fill="var(--fill-0, black)" id="Vector" opacity="0" />
            <path d={svgPaths.p1128f00} fill="var(--fill-0, black)" id="Vector_2" />
            <path d={svgPaths.p92f5500} fill="var(--fill-0, black)" id="Vector_3" />
            <path d={svgPaths.p1833b200} fill="var(--fill-0, black)" id="Vector_4" />
          </g>
        </svg>
      </div>
    </div>
  );
}