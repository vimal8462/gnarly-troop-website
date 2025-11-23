import "./globals.css";
import Header from "@/components/sections/Header";
import SectionHeroVideo from "@/components/sections/SectionHeroVideo";
import SectionAbout from "@/components/sections/SectionAbout";
import SectionVisions from "@/components/sections/SectionVisions";
import SectionTimeline from "@/components/sections/SectionTimeline";
import SectionScrollingImages from "@/components/sections/SectionScrollingImages";
import SectionSummit from "@/components/sections/SectionSummit";
import SectionExplore from "@/components/sections/SectionExplore";
import SectionPartners from "@/components/sections/SectionPartners";
import SectionGallery from "@/components/sections/SectionGallery";
import Footer from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Header />
      {/* <SectionHeroVideo /> */}

      <SectionHeroVideo
        videoSrc="/hero.mp4"
        founderImg="/images/sections/founder-img.png"
        pmImg="/images/sections/pm-img.png"
      />
      <main style={{ paddingTop: 24 }}>...</main>
        <SectionTimeline/>
        <SectionVisions /> 
    </>
  );
}
