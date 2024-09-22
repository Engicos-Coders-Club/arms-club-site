import { SignedOut, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignedOut>
        <SignIn />
      </SignedOut>
    </div>
  );
}
