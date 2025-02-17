"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function AuthPage() {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testSupabase() {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        console.log("Supabase Auth User:", data);
      } catch (err: any) {
        console.error("Auth Error:", err.message);
        setError(err.message);
      }
    }
    testSupabase();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl">Authentication Page</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
}
