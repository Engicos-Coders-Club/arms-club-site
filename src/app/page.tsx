import Hero from "@/components/Hero";

export default async function Home() {
 
  return (
    <div className="w-full">
      <Hero />
      <div className="w-full h-screen bg-blue-900 sticky z-20 top-0"></div>
    </div>
  );
}
