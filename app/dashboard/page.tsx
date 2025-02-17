// "use client";

// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from "@supabase/auth-ui-shared";
// import { supabase } from "@/lib/supabaseClient";
// import { useEffect } from "react"
// import { useRouter } from "next/navigation";

// export default function AuthPage() {
//   const router = useRouter();

//   useEffect(() => {
//     async function checkSession() {
//       const { data } = await supabase.auth.getSession();
//       if (data.session) {
//         router.push("/dashboard"); // Redirect logged-in users
//       }
//     }
//     checkSession();
//   }, [router]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Sign in</h1>
//       <Auth
//         supabaseClient={supabase}
//         appearance={{ theme: ThemeSupa }}
//         providers={["google"]}
//         redirectTo="http://localhost:3000/dashboard"
//       />
//     </div>
//   );
// }


//test
"use client";

import { useSession } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const session = useSession(); // Get the current user session
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <>
          <h1 className="text-2xl font-bold">Welcome, {session.user?.email}!</h1>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
