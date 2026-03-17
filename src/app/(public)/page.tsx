import { Hero } from "@/components/Hero";
import { FeaturedReviews } from "@/components/FeaturedReviews";

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <FeaturedReviews />
        </div>
    );
}
