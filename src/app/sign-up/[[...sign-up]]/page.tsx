import { SignedOut, SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <SignedOut>
        <SignUp />
      </SignedOut>
    </div>
  );
}
