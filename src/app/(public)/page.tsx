import Hero from "@/components/Hero";
import { ExpertiseStrip, ServicesGrid, QuoteSection, ContactCTA } from "@/components/HomeSections";
import { FeaturedReviews } from "@/components/FeaturedReviews";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <ExpertiseStrip />
            <ServicesGrid />
            <QuoteSection />
            <FeaturedReviews />
            <ContactCTA />
        </div>
    );
}
