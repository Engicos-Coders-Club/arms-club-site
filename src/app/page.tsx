import AboutUs from "@/components/About";
import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutUs/>
    </div>
  );
}
