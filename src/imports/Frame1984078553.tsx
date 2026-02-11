import svgPaths from "./svg-ojbj5yyki4";
import imgRectangle from "@/assets/877060e84f3ea7850cd361fbd2a3313dd56bf0cb.png";
import imgRectangle1 from "@/assets/e48daf718d57b3a4d6bf5be029b1a3167b227ae4.png";
import { imgGCalendar, imgOutlook } from "./svg-5dpak";

function TankaSearch() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Tanka/Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Tanka/Search">
          <path clipRule="evenodd" d={svgPaths.p2ad58500} fill="var(--fill-0, #8D8D8D)" fillRule="evenodd" id="Union" />
        </g>
      </svg>
    </div>
  );
}

function Left() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="left">
      <TankaSearch />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[22.4px] relative shrink-0 text-[#8d8d8d] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Search
      </p>
    </div>
  );
}

function Search() {
  return (
    <div className="relative rounded-[10px] shrink-0 w-full" data-name="search">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[6px] items-center px-[12px] py-[6px] relative w-full">
          <Left />
        </div>
      </div>
    </div>
  );
}

function SearchField() {
  return (
    <div className="bg-[#fefefe] content-stretch flex flex-col h-[36px] items-start overflow-clip relative rounded-[6px] shrink-0 w-[233px]" data-name="Search Field">
      <Search />
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-['SF_Pro:Regular','Noto_Sans_JP:Regular',sans-serif] font-semibold leading-[22.4px] overflow-hidden relative shrink-0 text-[#020617] text-[16px] text-ellipsis" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        All Tools（39）
      </p>
      <SearchField />
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-[rgba(0,94,255,0.05)] content-stretch flex gap-[6px] items-center justify-center min-w-[48px] px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <div aria-hidden="true" className="absolute border border-[rgba(0,94,255,0.1)] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Featured
      </p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`Files & Docs`}</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <Frame60 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`Emails & Messengers`}</p>
    </div>
  );
}

function Tab2() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <Frame61 />
    </div>
  );
}

function Tab3() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Calendars
      </p>
    </div>
  );
}

function Tab4() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Meeting
      </p>
    </div>
  );
}

function Tab5() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        AI Models
      </p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full">
      <Tab />
      <Tab1 />
      <Tab2 />
      <Tab3 />
      <Tab4 />
      <Tab5 />
    </div>
  );
}

function Tab6() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>{`Data & Analytics`}</p>
    </div>
  );
}

function Tab7() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Tanka Official
      </p>
    </div>
  );
}

function Tab8() {
  return (
    <div className="bg-[#f7f9fa] content-stretch flex gap-[4px] items-center px-[10px] py-[6px] relative rounded-[9999px] shrink-0" data-name="tab">
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#555] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Others
      </p>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Tab6 />
      <Tab7 />
      <Tab8 />
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame10 />
      <Frame62 />
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <Frame65 />
      <Frame63 />
    </div>
  );
}

function Group9() {
  return <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start shrink-0" />;
}

function Frame64() {
  return <div className="absolute h-[35px] left-[944px] top-[43.5px] w-px" />;
}

function Frame39() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[rgba(200,200,200,0.25)] border-b-[0.5px] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col gap-[10px] items-start p-[24px] relative w-full">
        <Frame67 />
        <Group9 />
        <Frame64 />
      </div>
    </div>
  );
}

function GCalendar() {
  return (
    <div className="mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-5.031px_-5.032px] mask-size-[40.25px_40.25px] relative shrink-0 size-[30.187px]" data-name="g-calendar" style={{ maskImage: `url('${imgGCalendar}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.1873 30.1872">
        <g id="g-calendar">
          <g id="Vector" />
          <path d={svgPaths.pdc85f00} fill="var(--fill-0, #1967D2)" id="Vector_2" />
          <path d={svgPaths.p1e5a8a40} fill="var(--fill-0, #1967D2)" id="Vector_3" />
          <path d={svgPaths.p1c32800} fill="var(--fill-0, #FBBC05)" id="Vector_4" />
          <path d={svgPaths.p19c6d400} fill="var(--fill-0, #FBBC05)" id="Vector_5" />
          <path d={svgPaths.p935a700} fill="var(--fill-0, #EA4335)" id="Vector_6" />
          <path d={svgPaths.p2a87c580} fill="var(--fill-0, #EA4335)" id="Vector_7" />
          <path d={svgPaths.p21660400} fill="var(--fill-0, #34A853)" id="Vector_8" />
          <path d={svgPaths.p10f543f0} fill="var(--fill-0, #34A853)" id="Vector_9" />
          <path d={svgPaths.p11ac0300} fill="var(--fill-0, #34A853)" id="Vector_10" />
          <path d={svgPaths.pd939100} fill="var(--fill-0, #188038)" id="Vector_11" />
          <path d={svgPaths.p3902a000} fill="var(--fill-0, #4285F4)" id="Vector_12" />
          <g id="31">
            <path d={svgPaths.p3c683580} fill="var(--fill-0, #4285F4)" />
            <path d={svgPaths.p345f04c0} fill="var(--fill-0, #4285F4)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ThirdApp() {
  return (
    <div className="content-stretch flex gap-[10.063px] items-center justify-center p-[2.013px] relative shrink-0 size-[40.25px]" data-name="Third App">
      <GCalendar />
    </div>
  );
}

function ThirdAppSlack() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack />
    </div>
  );
}

function LinkSimple() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkSimple">
          <path d={svgPaths.p2b5f7280} fill="var(--fill-0, #0EC46C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkSimple />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <IconWrapper />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8793ab] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Linked
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Google Calendar
      </p>
      <Frame14 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame50 />
    </div>
  );
}

function Frame79() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame40 />
      <Frame />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#020617] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        View
      </p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame79 />
      <Frame12 />
    </div>
  );
}

function Frame69() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function app() {
  return (
    <div className="absolute inset-[3.75%]" data-name="第三方app-48">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.2313 37.2313">
        <g id="icons8-outlook-calendar 1">
          <path d={svgPaths.p3691f900} fill="var(--fill-0, #1976D2)" id="Vector" />
          <path d={svgPaths.p1dec5500} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p140abdc0} fill="var(--fill-0, #1976D2)" id="Vector_3" />
          <path d={svgPaths.p2c9a2440} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p22feaa50} fill="var(--fill-0, #1976D2)" id="Vector_5" />
          <path d={svgPaths.p13f3ac80} fill="var(--fill-0, #1976D2)" id="Vector_6" />
          <path d={svgPaths.p1d21dd80} fill="var(--fill-0, #1976D2)" id="Vector_7" />
          <path d={svgPaths.p3e269280} fill="var(--fill-0, #1976D2)" id="Vector_8" />
          <path d={svgPaths.p2cd01b00} fill="var(--fill-0, #1976D2)" id="Vector_9" />
          <path d={svgPaths.p2e202e90} fill="var(--fill-0, #1976D2)" id="Vector_10" />
          <path d={svgPaths.p27badf80} fill="var(--fill-0, #1976D2)" id="Vector_11" />
          <path d={svgPaths.p31548f00} fill="var(--fill-0, #1976D2)" id="Vector_12" />
          <path d={svgPaths.p3629b600} fill="var(--fill-0, #1976D2)" id="Vector_13" />
          <path d={svgPaths.pa07a200} fill="var(--fill-0, #1976D2)" id="Vector_14" />
          <path d={svgPaths.p3016a00} fill="var(--fill-0, #1976D2)" id="Vector_15" />
          <path d={svgPaths.p3f68ef00} fill="var(--fill-0, #1976D2)" id="Vector_16" />
          <path d={svgPaths.p3519bd00} fill="var(--fill-0, #1976D2)" id="Vector_17" />
          <path d={svgPaths.p2705d800} fill="var(--fill-0, #1976D2)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function ThirdApp1() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <app />
    </div>
  );
}

function ThirdAppSlack1() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp1 />
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack1 />
    </div>
  );
}

function LinkBreak() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkBreak">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkBreak">
          <path d={svgPaths.p1a8d1900} fill="var(--fill-0, #8794A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkBreak />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-end relative rounded-[8px] shrink-0">
      <IconWrapper1 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8794a6] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Unlinked
      </p>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Outlook Calendar
      </p>
      <Frame15 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame51 />
    </div>
  );
}

function Frame80() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame41 />
      <Frame1 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#005eff] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame80 />
      <Frame16 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame13 />
        </div>
      </div>
    </div>
  );
}

function Frame77() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <Frame69 />
      <Frame70 />
    </div>
  );
}

function Onedrive() {
  return (
    <div className="h-[24.5px] relative shrink-0 w-[36.75px]" data-name="onedrive-1 1">
      <div className="absolute inset-[0_-0.42%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.9031 24.5">
          <g id="onedrive-1 1">
            <path d={svgPaths.p170e8270} fill="var(--fill-0, #0364B8)" id="Vector" />
            <path d={svgPaths.pca27100} fill="var(--fill-0, #0078D4)" id="Vector_2" />
            <path d={svgPaths.p7fd9200} fill="var(--fill-0, #1490DF)" id="Vector_3" />
            <path d={svgPaths.p25aedf00} fill="var(--fill-0, #28A8EA)" id="Vector_4" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThirdApp2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 size-[40.25px]" data-name="Third App">
      <Onedrive />
    </div>
  );
}

function ThirdAppSlack2() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp2 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack2 />
    </div>
  );
}

function LinkBreak1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkBreak">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkBreak">
          <path d={svgPaths.p1a8d1900} fill="var(--fill-0, #8794A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper2() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkBreak1 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-end relative rounded-[8px] shrink-0">
      <IconWrapper2 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8794a6] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Unlinked
      </p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <Frame19 />
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        OneDrive
      </p>
      <Frame18 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame52 />
    </div>
  );
}

function Frame82() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame42 />
      <Frame2 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#005eff] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame82 />
      <Frame20 />
    </div>
  );
}

function Frame71() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[0.98%_0.58%_0.87%_22.86%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[0.98%_0.58%_0.87%_22.86%] mix-blend-multiply opacity-20" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4563 30.1869">
          <g id="Vector" opacity="0.2" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.p14debd80} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents inset-[-0.34%_-2.04%_-2.57%_20.44%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[-0.34%_-2.04%_-2.57%_20.44%] mix-blend-multiply opacity-12" data-name="Rectangle" />
      <div className="absolute inset-[0.98%_0.58%_0.87%_22.86%] mix-blend-multiply opacity-12" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4563 30.1869">
          <g id="Vector" opacity="0.12" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.p14debd80} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents inset-[19.02%_-27.5%_-27.65%_-4.71%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[19.02%_-27.5%_-27.65%_-4.71%] mix-blend-multiply opacity-12" data-name="Rectangle" />
      <div className="absolute inset-[50.06%_0.58%_0.87%_22.86%] mix-blend-multiply opacity-12" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4561 15.0935">
          <g id="Vector" opacity="0.35" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.p26eea100} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Envelope() {
  return (
    <div className="absolute contents inset-[19.02%_-27.5%_-27.65%_-4.71%]" data-name="Envelope">
      <Group3 />
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents inset-[47.03%_-2.03%_-0.94%_20.43%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[47.03%_-2.03%_-0.94%_20.43%] mix-blend-multiply opacity-0" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle} />
        </div>
      </div>
      <div className="absolute inset-[50.06%_0.58%_0.87%_22.86%] mix-blend-multiply opacity-0" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4561 15.0935">
          <g id="Vector" opacity="0.06" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.p26eea100} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Envelope1() {
  return (
    <div className="absolute contents inset-[47.03%_-2.03%_-0.94%_20.43%]" data-name="Envelope">
      <Group4 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents inset-[19.02%_-27.5%_-27.65%_-4.71%]" data-name="Group">
      <Envelope />
      <Envelope1 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents inset-[22.45%_48.8%_22.31%_0.11%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[22.45%_48.8%_22.31%_0.11%] mix-blend-multiply opacity-48" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9879 16.9879">
          <g id="Vector" opacity="0.48" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.pcfef980} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents inset-[21.53%_46.47%_19.66%_-1.63%] mix-blend-multiply" data-name="Group">
      <div className="absolute inset-[21.53%_46.47%_19.66%_-1.63%] mix-blend-multiply opacity-24" data-name="Rectangle">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgRectangle1} />
        </div>
      </div>
      <div className="absolute inset-[22.45%_48.8%_22.32%_0.1%] mix-blend-multiply opacity-24" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9879 16.9879">
          <g id="Vector" opacity="0.24" style={{ mixBlendMode: "multiply" }}>
            <path d={svgPaths.pcfef980} fill="var(--fill-0, white)" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Ambient() {
  return (
    <div className="absolute contents inset-[21.53%_46.47%_19.66%_-1.63%]" data-name="Ambient">
      <Group6 />
      <Group7 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents inset-[21.53%_46.47%_19.66%_-1.63%]" data-name="Group">
      <Ambient />
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents inset-[22.45%_48.8%_22.31%_0.11%] mix-blend-soft-light" data-name="Group">
      <div className="absolute inset-[22.45%_48.8%_22.31%_0.11%] mix-blend-soft-light opacity-50" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" opacity="0.5" style={{ mixBlendMode: "soft-light" }} />
        </svg>
      </div>
    </div>
  );
}

function Component() {
  return (
    <div className="absolute contents inset-[-5.15%_-27.5%_-27.65%_-4.71%]" data-name="142">
      <Group />
      <Group1 />
      <div className="absolute inset-[25.69%_0.58%_25.27%_25.67%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5249 15.0839">
          <path d={svgPaths.p11e9b00} fill="var(--fill-0, #123B6D)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.77%_48.81%_39.74%_28.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.91868">
          <path d={svgPaths.p9c76a80} fill="var(--fill-0, #0364B8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[0.98%_6.24%_83.71%_28.58%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.6705 4.71014">
          <path d={svgPaths.p37002900} fill="var(--fill-0, #0358A7)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[16.29%_48.81%_62.23%_28.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.60467">
          <path d={svgPaths.p18811380} fill="var(--fill-0, #0078D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[16.29%_26.11%_62.23%_51.19%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.60467">
          <path d={svgPaths.p18811380} fill="var(--fill-0, #28A8EA)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[16.29%_6.25%_62.23%_73.89%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.60467 6.60467">
          <path d={svgPaths.p3f213900} fill="var(--fill-0, #50D9FF)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.77%_6.25%_39.74%_73.89%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.60467 6.91868">
          <path d={svgPaths.p3bbadff0} fill="var(--fill-0, #28A8EA)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[37.77%_26.11%_39.74%_51.19%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.91868">
          <path d={svgPaths.p9c76a80} fill="var(--fill-0, #0078D4)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.26%_26.1%_17.24%_51.2%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.91868">
          <path d={svgPaths.p9c76a80} fill="var(--fill-0, #0364B8)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.26%_48.81%_19.29%_28.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.54669 6.29066">
          <path d={svgPaths.p2111de80} fill="var(--fill-0, #14447D)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[60.26%_6.24%_17.24%_73.89%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.60467 6.91868">
          <path d={svgPaths.p3bbadff0} fill="var(--fill-0, #0078D4)" id="Vector" />
        </svg>
      </div>
      <Group2 />
      <div className="absolute inset-[50.05%_0.61%_0.87%_22.86%]" data-name="Envelope">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.4466 15.094">
          <path d={svgPaths.p8afce00} fill="url(#paint0_linear_10017_3520)" id="Envelope" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10017_3520" x1="21.447" x2="3.91475" y1="-3.37037" y2="17.5217">
              <stop stopColor="#35B8F1" />
              <stop offset="0.9" stopColor="#0F78D1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="absolute inset-[50.05%_2.56%_0.87%_22.86%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7964 15.0934">
          <path d={svgPaths.p27ff9e00} fill="url(#paint0_linear_10017_3518)" id="Vector" />
          <defs>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_10017_3518" x1="12.393" x2="12.393" y1="0" y2="15.0934">
              <stop stopColor="#35B8F1" />
              <stop offset="1" stopColor="#28A8EA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <Group5 />
      <div className="absolute inset-[-5.15%_0.58%_-5.9%_0.13%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[1.11%_0.58%_0.74%_22.86%] mix-blend-soft-light" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" opacity="0.75" style={{ mixBlendMode: "soft-light" }} />
        </svg>
      </div>
      <div className="absolute inset-[22.45%_48.8%_22.31%_0.1%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.9879 16.9879">
          <path d={svgPaths.pcfef980} fill="var(--fill-0, #0F78D4)" id="Vector" />
        </svg>
      </div>
      <Group8 />
      <div className="absolute inset-[35.1%_61.39%_35%_12.5%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.68038 9.19499">
          <path d={svgPaths.p26d91500} fill="var(--fill-0, white)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Outlook() {
  return (
    <div className="absolute inset-[11.79%_8.69%_11.79%_8.7%] mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[-3.5px_-4.747px] mask-size-[40.25px_40.25px]" data-name="Outlook" style={{ maskImage: `url('${imgOutlook}')` }}>
      <Component />
    </div>
  );
}

function ThirdApp3() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <Outlook />
    </div>
  );
}

function ThirdAppSlack3() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp3 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack3 />
    </div>
  );
}

function LinkBreak2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkBreak">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkBreak">
          <path d={svgPaths.p1a8d1900} fill="var(--fill-0, #8794A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper3() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkBreak2 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-end relative rounded-[8px] shrink-0">
      <IconWrapper3 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8794a6] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Unlinked
      </p>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Outlook
      </p>
      <Frame22 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame53 />
    </div>
  );
}

function Frame83() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame43 />
      <Frame3 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#005eff] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame83 />
      <Frame23 />
    </div>
  );
}

function Frame72() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame21 />
        </div>
      </div>
    </div>
  );
}

function Frame81() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <Frame71 />
      <Frame72 />
    </div>
  );
}

function ThirdApp5() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40.25 40.25">
        <g id="Third App">
          <g id="vector">
            <path d={svgPaths.p1f74c600} fill="black" />
            <path clipRule="evenodd" d={svgPaths.p5c5700} fill="black" fillRule="evenodd" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ThirdApp4() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0" data-name="Third App">
      <ThirdApp5 />
    </div>
  );
}

function ThirdAppSlack4() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp4 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack4 />
    </div>
  );
}

function LinkSimple1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkSimple">
          <path d={svgPaths.p2b5f7280} fill="var(--fill-0, #0EC46C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper4() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkSimple1 />
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <IconWrapper4 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8793ab] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Linked
      </p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Notion
      </p>
      <Frame25 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame54 />
    </div>
  );
}

function Frame85() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame44 />
      <Frame4 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#020617] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        View
      </p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame85 />
      <Frame26 />
    </div>
  );
}

function Frame73() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function GDrive() {
  return (
    <div className="absolute inset-[4.49%_0_4.6%_0]" data-name="g-drive">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.2125 31.1021">
        <g id="g-drive">
          <g id="Vector" />
          <g id="Vector_2" />
          <g id="Vector_3" />
          <path d={svgPaths.p35697a00} fill="var(--fill-0, #34A853)" id="Vector_4" />
          <g id="Vector_5" />
          <g id="Vector_6" />
          <g id="Vector_7" />
          <g id="Vector_8" />
          <path d={svgPaths.p1c1e9480} fill="var(--fill-0, #FBBC05)" id="Vector_9" />
          <path d={svgPaths.p3a490080} fill="var(--fill-0, #188038)" id="Vector_10" />
          <g id="Vector_11" />
          <g id="Vector_12" />
          <g id="Vector_13" />
          <path d={svgPaths.p197ef00} fill="var(--fill-0, #4285F4)" id="Vector_14" />
          <g id="Vector_15" />
          <g id="Vector_16" />
          <path d={svgPaths.p3c0c8f00} fill="var(--fill-0, #1967D2)" id="Vector_17" />
          <path d={svgPaths.p3235a5a1} fill="var(--fill-0, #EA4335)" id="Vector_18" />
        </g>
      </svg>
    </div>
  );
}

function Drive() {
  return (
    <div className="absolute inset-[7.5%] overflow-clip" data-name="Drive">
      <GDrive />
    </div>
  );
}

function ThirdApp6() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <Drive />
    </div>
  );
}

function ThirdAppSlack5() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp6 />
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack5 />
    </div>
  );
}

function LinkBreak3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkBreak">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkBreak">
          <path d={svgPaths.p1a8d1900} fill="var(--fill-0, #8794A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper5() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkBreak3 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-end relative rounded-[8px] shrink-0">
      <IconWrapper5 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8794a6] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Unlinked
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Google Drive
      </p>
      <Frame28 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame55 />
    </div>
  );
}

function Frame86() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame45 />
      <Frame5 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#005eff] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame86 />
      <Frame29 />
    </div>
  );
}

function Frame74() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame27 />
        </div>
      </div>
    </div>
  );
}

function Frame84() {
  return (
    <div className="bg-[#fdfefe] content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <Frame73 />
      <Frame74 />
    </div>
  );
}

function Sheets() {
  return (
    <div className="absolute inset-[8.33%_19.79%]" data-name="Sheets">
      <div className="absolute inset-[-0.23%_-0.14%_-0.23%_-0.63%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.5044 33.6937">
          <g id="Sheets">
            <path d={svgPaths.p2ec52700} fill="var(--fill-0, #20A464)" id="Page" />
            <path d={svgPaths.p2a3b5600} fill="var(--fill-0, #149456)" id="Shadow" />
            <path d={svgPaths.p1ab94a00} fill="var(--fill-0, #38AE74)" id="Highlight" />
            <path d={svgPaths.p182f6080} fill="var(--fill-0, #8ED1B1)" id="Fold" />
            <path clipRule="evenodd" d={svgPaths.pacb3b00} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThirdApp8() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <Sheets />
    </div>
  );
}

function IconWrapper6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip top-0" data-name="icon-wrapper-2025">
      <ThirdApp8 />
    </div>
  );
}

function ThirdApp7() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <IconWrapper6 />
    </div>
  );
}

function ThirdAppSlack6() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp7 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack6 />
    </div>
  );
}

function LinkSimple2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkSimple">
          <path d={svgPaths.p2b5f7280} fill="var(--fill-0, #0EC46C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper7() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkSimple2 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <IconWrapper7 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8793ab] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Linked
      </p>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Google Sheets
      </p>
      <Frame31 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame56 />
    </div>
  );
}

function Frame88() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame46 />
      <Frame6 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame88 />
    </div>
  );
}

function Frame75() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function Docs() {
  return (
    <div className="absolute inset-[8.33%_19.79%]" data-name="Docs">
      <div className="absolute inset-[0_-0.15%_0_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3537 33.5417">
          <g id="Docs">
            <path d={svgPaths.p23d81100} fill="var(--fill-0, #4E8DF5)" id="Page" />
            <path d={svgPaths.p29e8500} fill="var(--fill-0, #417EE9)" id="Shadow" />
            <path d={svgPaths.pe41fb00} fill="var(--fill-0, #639AF6)" id="Highlight" />
            <path d={svgPaths.p3213d780} fill="var(--fill-0, #A6C5FA)" id="Fold" />
            <g id="Icon">
              <path d={svgPaths.p2c043f00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p18a81d00} fill="var(--fill-0, white)" />
              <path d={svgPaths.p28ff3b80} fill="var(--fill-0, white)" />
              <path d={svgPaths.p194e3a00} fill="var(--fill-0, white)" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThirdApp10() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <Docs />
    </div>
  );
}

function IconWrapper8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 top-0" data-name="icon-wrapper-2025">
      <ThirdApp10 />
    </div>
  );
}

function ThirdApp9() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <IconWrapper8 />
    </div>
  );
}

function ThirdAppSlack7() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp9 />
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack7 />
    </div>
  );
}

function LinkBreak4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkBreak">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkBreak">
          <path d={svgPaths.p1a8d1900} fill="var(--fill-0, #8794A6)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper9() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkBreak4 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex gap-[5px] items-center justify-end relative rounded-[8px] shrink-0">
      <IconWrapper9 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8794a6] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Unlinked
      </p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Google Docs
      </p>
      <Frame33 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame57 />
    </div>
  );
}

function Frame89() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame47 />
      <Frame7 />
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#005eff] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#005eff] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Link
      </p>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame89 />
      <Frame34 />
    </div>
  );
}

function Frame76() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame32 />
        </div>
      </div>
    </div>
  );
}

function Frame87() {
  return (
    <div className="bg-[#fdfefe] content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <Frame75 />
      <Frame76 />
    </div>
  );
}

function Slides() {
  return (
    <div className="absolute inset-[8.33%_19.25%]" data-name="Slides">
      <div className="absolute inset-[-0.23%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.7569 33.6938">
          <g id="Slides">
            <path d={svgPaths.p3d85c600} fill="var(--fill-0, #F4B70A)" id="Page" />
            <path d={svgPaths.p3c4c5a00} fill="var(--fill-0, #EFA904)" id="Shadow" />
            <path d={svgPaths.p15d80700} fill="var(--fill-0, #F6C028)" id="Highlight" />
            <path d={svgPaths.p2ad4b780} fill="var(--fill-0, #FADC87)" id="Fold" />
            <path clipRule="evenodd" d={svgPaths.pd9b400} fill="var(--fill-0, white)" fillRule="evenodd" id="Icon" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function ThirdApp12() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <Slides />
    </div>
  );
}

function IconWrapper10() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 overflow-clip top-0" data-name="icon-wrapper-2025">
      <ThirdApp12 />
    </div>
  );
}

function ThirdApp11() {
  return (
    <div className="relative shrink-0 size-[40.25px]" data-name="Third App">
      <IconWrapper10 />
    </div>
  );
}

function ThirdAppSlack8() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp11 />
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack8 />
    </div>
  );
}

function LinkSimple3() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkSimple">
          <path d={svgPaths.p2b5f7280} fill="var(--fill-0, #0EC46C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper11() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkSimple3 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <IconWrapper11 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8793ab] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Linked
      </p>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Google Slides
      </p>
      <Frame36 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame58 />
    </div>
  );
}

function Frame91() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame48 />
      <Frame8 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame91 />
    </div>
  );
}

function Frame78() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame35 />
        </div>
      </div>
    </div>
  );
}

function Zoom() {
  return (
    <div className="relative shrink-0 size-[33.25px]" data-name="zoom">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33.25 33.25">
        <g id="zoom">
          <rect fill="var(--fill-0, #0B5CFF)" height="33.25" id="Rectangle 1" rx="8.0314" width="33.25" />
          <path d={svgPaths.p20e10000} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper12() {
  return (
    <div className="content-stretch flex items-center justify-center mask-intersect mask-luminance mask-no-clip mask-no-repeat mask-position-[0px_0px] mask-size-[40.25px_40.25px] overflow-clip relative shrink-0 size-[40.25px]" data-name="icon-wrapper-2025" style={{ maskImage: `url('${imgGCalendar}')` }}>
      <Zoom />
    </div>
  );
}

function ThirdApp13() {
  return (
    <div className="content-stretch flex gap-[10.063px] items-center justify-center p-[2.013px] relative shrink-0 size-[40.25px]" data-name="Third App">
      <IconWrapper12 />
    </div>
  );
}

function ThirdAppSlack9() {
  return (
    <div className="bg-white content-stretch flex gap-[18.667px] items-center justify-center relative rounded-[16px] shrink-0 size-[56px]" data-name="Third App/slack">
      <div aria-hidden="true" className="absolute border border-[#efefef] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ThirdApp13 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <ThirdAppSlack9 />
    </div>
  );
}

function LinkSimple4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="LinkSimple">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="LinkSimple">
          <path d={svgPaths.p2b5f7280} fill="var(--fill-0, #0EC46C)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function IconWrapper13() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip relative shrink-0" data-name="icon-wrapper-2025">
      <LinkSimple4 />
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex gap-[5px] items-center relative shrink-0 w-full">
      <IconWrapper13 />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#8793ab] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Linked
      </p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <p className="font-['SF_Pro:Regular',sans-serif] font-semibold leading-[22.4px] relative shrink-0 text-[#020617] text-[16px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        Zoom
      </p>
      <Frame38 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
      <Frame59 />
    </div>
  );
}

function Frame93() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame49 />
      <Frame9 />
    </div>
  );
}

function Frame94() {
  return (
    <div className="content-stretch flex items-center justify-end px-[16px] py-[6px] relative rounded-[38px] shrink-0">
      <div aria-hidden="true" className="absolute border border-[#020617] border-solid inset-0 pointer-events-none rounded-[38px]" />
      <p className="font-['SF_Pro:Regular',sans-serif] font-normal leading-[16.8px] relative shrink-0 text-[#020617] text-[12px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        View
      </p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] items-center min-h-px min-w-px relative">
      <Frame93 />
      <Frame94 />
    </div>
  );
}

function Frame92() {
  return (
    <div className="bg-[rgba(15,41,77,0.03)] flex-[1_0_0] min-h-px min-w-px relative rounded-[16px]">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[16px] relative w-full">
          <Frame37 />
        </div>
      </div>
    </div>
  );
}

function Frame90() {
  return (
    <div className="bg-[#fdfefe] content-stretch flex gap-[32px] items-start relative shrink-0 w-full">
      <Frame78 />
      <Frame92 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[32px] items-start px-[24px] relative w-full">
        <Frame77 />
        <Frame81 />
        <Frame84 />
        <Frame87 />
        <Frame90 />
      </div>
    </div>
  );
}

export default function Frame66() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start relative size-full">
      <Frame39 />
      <Frame68 />
    </div>
  );
}