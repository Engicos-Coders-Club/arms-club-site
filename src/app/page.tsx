import Hero from "@/components/Hero";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

async function create(data: string) {
  cookies().set('userId', data)
}

export default async function Home() {
  return (
    <div className="w-full">
      <Hero />
      <div className="sticky top-0 z-20 w-full h-screen bg-blue-900"></div>
    </div>
  );
}
