import { SignedOut, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
