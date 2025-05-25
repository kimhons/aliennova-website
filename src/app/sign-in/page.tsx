import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">Welcome to AlienNova</h1>
          <p className="mt-2 text-gray-600">Sign in to access all AI tools</p>
        </div>
        <SignIn appearance={{
          elements: {
            formButtonPrimary: 'bg-blue-900 hover:bg-blue-800',
            footerActionLink: 'text-blue-900 hover:text-blue-800'
          }
        }} />
      </div>
    </div>
  );
}
