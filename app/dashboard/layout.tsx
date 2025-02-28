"use client";

import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header"; // Import the Header component
import Link from "next/link";

interface UserData {
  name: string;
  email: string;
  profileImage: string;
  created: string;
  role?: string;
  organization?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth"); // Redirect if not logged in
    }
  }, [session, router]);

  if (!session) {
    return <p className="text-xl text-center mt-10">Loading...</p>;
  }

  const userData: UserData = {
    name: session.user.user_metadata.full_name || "Unknown User",
    email: session.user.email || "No email",
    profileImage: session.user.user_metadata.avatar_url || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8",
    created: session.user.created_at || "",
    role: session.user.user_metadata.role,
    organization: session.user.user_metadata.organization,
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-6">Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link href="/dashboard" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-gray-300 hover:text-white">
                  Settings
                </Link>
              </li>
              <li>
                <Link href="/dashboard/profile" className="text-gray-300 hover:text-white">
                  Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Header userData={userData} />
        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
