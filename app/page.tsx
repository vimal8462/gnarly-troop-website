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
import SectionMinisterLetter from "@/components/sections/SectionMinisterLetter";

const ministerCards = [
  {
    id: 1,
    name: "Shri Gajendra Singh Shekhawat",
    title: "Hon'ble Union Minister of Culture & Tourism | Govt of India",
    image:
      "/images/crousel/minister-letters/img-shri-gajendra-singh-shekhawat.png",
    certificateUrl: "/certificates/cert-1.jpg",
  },
  {
    id: 2,
    name: "Shri Bhajan Lal Sharma",
    title: "Hon'ble Chief Minister | Rajasthan",
    image: "/images/crousel/minister-letters/img-shri-bhajan-lal-sharma.png",
    certificateUrl: "/certificates/cert-2.jpg",
  },
  {
    id: 3,
    name: "Shri Jhabar Singh Kharra",
    title: "Hon'ble Minister of State for Urban Housing | Government of India",
    image: "/images/crousel/minister-letters/img-shri-jhabar-singh-kharra.png",
    certificateUrl: "/certificates/cert-2.jpg",
  },
  {
    id: 4,
    name: "Swami Balmukundacharya Ji Maharaj",
    title: "Hon'ble Member of the Legislative Assembly Rajasthan",
    image:
      "/images/crousel/minister-letters/img-swami-balmukundacharya-ji-maharaj.png",
    certificateUrl: "/certificates/cert-2.jpg",
  },
];
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
      <main>
        <SectionAbout />
        <SectionMinisterLetter
          staticImage="/images/sections/img-globe-girl-flag.png"
          cards={ministerCards}
        />
        <SectionTimeline/>
        <SectionVisions /> 
      </main>
    </>
  );
}
