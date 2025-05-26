import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Your Profile</h1>
        <p className="text-gray-600">Demo version - No authentication required</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl text-purple-800">👤</span>
          </div>
          <h2 className="text-xl font-semibold mb-2">Demo User</h2>
          <p className="text-gray-600 mb-6">demo@aliennova.com</p>
          <p className="bg-green-100 text-green-800 px-4 py-2 rounded-md inline-block">
            Demo Mode Active
          </p>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link 
          href="/chat" 
          className="inline-block px-6 py-3 bg-blue-900 text-white rounded-md hover:bg-blue-800 transition"
        >
          Start Using StarTalk AI
        </Link>
      </div>
    </div>
  );
}
