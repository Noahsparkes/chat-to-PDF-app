"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
          console.error("🔴 Not authenticated:", error?.message);
          router.push("/auth"); // Redirect to auth
        } else {
          console.log("✅ Authenticated User:", data.user);
          setUser(data.user);
        }
      } catch (err: any) {
        console.error("Auth Check Error:", err.message);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Redirecting to /auth...</p>;

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>You are logged in as {user.email}</p>
    </div>
  );
}
