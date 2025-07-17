// app/sign-in/page.tsx (ou src/app/sign-in/page.tsx selon ta structure)

import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="shadow-lg rounded-xl bg-white p-6">
        <SignUp />
      </div>
    </div>
  );
}
