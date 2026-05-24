import { CtaSection } from "./CtaSection";
import { Feature2Section } from "./Feature2Section";
import { Feature3Section } from "./Feature3Section";
import { Feature4Section } from "./Feature4Section";
import { Feature5Section } from "./Feature5Section";
import { HeroSection } from "./HeroSection";
import { LandingFooter } from "./LandingFooter";
import { Navbar } from "./Navbar";
import { PainPointSection } from "./PainPointSection";
import { TasteHitSection } from "./TasteHitSection";

export const ServiceLandingPage = () => {
	return (
		<div className="ygi:w-full ygi:overflow-x-hidden">
			<Navbar />
			<main>
				<HeroSection />
				<div id="hero-sentinel" />
				<PainPointSection />
				<TasteHitSection />
				<Feature2Section />
				<Feature3Section />
				<Feature4Section />
				<Feature5Section />
				<CtaSection />
			</main>
			<LandingFooter />
		</div>
	);
};
