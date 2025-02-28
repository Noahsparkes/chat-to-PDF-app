// "use client";

// import { useSession } from "@supabase/auth-helpers-react";
// import { supabase } from "@/lib/supabaseClient";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function Dashboard() {
//   const session = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (!session) {
//       router.push("/auth"); // Redirect if not logged in
//     }
//   }, [session, router]);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push("/auth"); // Redirect after logout
//   };

//   return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
//           {session ? (
//             <div className="max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg text-center">
//               <h1 className="text-3xl font-bold mb-4">
//                 Welcome, <span className="text-blue-400">{session.user?.email}</span>!
//               </h1>
//               <p className="text-gray-400 mb-6">You are successfully signed in.</p>
//               <button
//                 className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
//                 onClick={handleSignOut}
//               >
//                 Sign Out
//               </button>
//             </div>
//           ) : (
//             <p className="text-xl">Loading...</p>
//           )}
//         </div>
//       );
//     }
import React from 'react'

function page() {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <h1 className="text-3xl p-5 bg-gray-100 font-extralight text-indigo-600">
        My Documents
      </h1>
      {/* Document */}
    </div>
  )
}

export default page
