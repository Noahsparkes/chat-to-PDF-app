"use client";

import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
//import { cn } from "@/lib/utils";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/auth"); // Redirect if not logged in
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth"); // Redirect after logout
  };

  if (!session) {
    return <p className="text-xl text-center mt-10">Loading...</p>;
  }

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

        {/* Logout Button */}
        <Button
          variant="destructive"
          onClick={handleSignOut}
          className="w-full mt-6"
        >
          Sign Out
        </Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="w-full bg-gray-800 p-4 shadow-md flex justify-between items-center">
          <h1 className="text-lg font-semibold">Welcome, {session?.user?.email}</h1>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
