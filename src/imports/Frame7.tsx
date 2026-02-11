import imgRelayLogo1 from "@/assets/0d482116ba2f7c413f661bda6fbf8e8a0b268dd9.png";

export default function Frame() {
  return (
    <div className="relative size-full">
      <div className="absolute left-[17px] size-[125px] top-[18px]" data-name="黑色Relay logo 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRelayLogo1} />
      </div>
      <div className="absolute bg-black left-[12px] rounded-[24px] size-[136px] top-[12px]" />
      <p className="absolute font-['SF_Pro:Heavy',sans-serif] font-[860] leading-[normal] left-[50px] text-[100px] text-white top-[21px] w-[53px] whitespace-pre-wrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        R
      </p>
    </div>
  );
}