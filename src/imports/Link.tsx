function Group1() {
  return (
    <div className="absolute inset-[12.5%]">
      <div className="absolute inset-[-4.17%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
          <g id="Group 2">
            <circle cx="24.7105" cy="24.7105" id="Ellipse 2" r="12.7895" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="3" />
            <circle cx="14.2895" cy="14.2895" fill="var(--fill-0, white)" id="Ellipse 1" r="12.7895" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[12.5%]">
      <Group1 />
    </div>
  );
}

function LinkTanka() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="link-tanka">
      <Group />
    </div>
  );
}

export default function Link() {
  return (
    <div className="content-stretch flex items-center justify-center relative size-full" data-name="Link">
      <LinkTanka />
    </div>
  );
}