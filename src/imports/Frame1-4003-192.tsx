export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute h-[20px] left-0 rounded-[4px] top-0 w-[79px]" style={{ backgroundImage: "linear-gradient(90deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 100%), linear-gradient(94.1268deg, rgb(185, 255, 238) 0.89693%, rgb(175, 255, 101) 99.67%)" }} />
      <p className="absolute font-['SF_Pro:Medium',sans-serif] font-[510] leading-[normal] left-[6px] text-[12px] text-black top-[3px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        AI Assistant
      </p>
    </div>
  );
}