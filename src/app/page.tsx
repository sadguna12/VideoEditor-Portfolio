import HeroScrollAnimation from "@/components/HeroScrollAnimation";
import StorySections from "@/components/StorySections";
import ToolsSection from "@/components/ToolsSection";
import WorkSection from "@/components/WorkSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroScrollAnimation />
      <StorySections />
      <ToolsSection />
      <WorkSection />
      <ContactSection />
    </>
  );
}
