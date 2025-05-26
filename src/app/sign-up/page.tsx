import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">Join AlienNova</h1>
          <p className="mt-2 text-gray-600">Demo Version - No Sign Up Required</p>
        </div>
        <div className="mt-8 space-y-6">
          <div className="bg-green-100 text-green-800 p-4 rounded-md text-center">
            <p className="font-medium">Demo Mode Active</p>
            <p className="text-sm mt-2">This is a demo version with all features available without registration</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Link href="/" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Return to Home
            </Link>
            <Link href="/chat" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Try StarTalk AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
