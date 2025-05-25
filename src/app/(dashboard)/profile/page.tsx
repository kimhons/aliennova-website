import Link from "next/link";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900">Your Profile</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <UserProfile 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-blue-900 hover:bg-blue-800',
              navbarButton: 'text-blue-900 hover:text-blue-800'
            }
          }}
        />
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
