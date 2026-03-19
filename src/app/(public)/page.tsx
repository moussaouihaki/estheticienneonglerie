import Hero from "@/components/Hero";
import { PhilosophySection } from "@/components/PhilosophySection";
import { FeaturedReviews } from "@/components/FeaturedReviews";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <PhilosophySection />
            <FeaturedReviews />
        </div>
    );
}
