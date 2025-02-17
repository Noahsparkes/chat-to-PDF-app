// "use client";

// import { supabase } from "@/lib/supabaseClient";
// import { useEffect, useState } from "react";

// export default function AuthPage() {
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     async function testSupabase() {
//       try {
//         const { data, error } = await supabase.auth.getUser();
//         if (error) throw error;
//         console.log("Supabase Auth User:", data);
//       } catch (err: any) {
//         console.error("Auth Error:", err.message);
//         setError(err.message);
//       }
//     }
//     testSupabase();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl">Authentication Page</h1>
//       {error && <p className="text-red-500">Error: {error}</p>}
//     </div>
//   );
// }


//test
"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard"); // Redirect logged-in users
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={["google"]}
        redirectTo="http://localhost:3000/dashboard"
      />
    </div>
  );
}
