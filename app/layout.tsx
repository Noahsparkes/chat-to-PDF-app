// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { supabase} from "@/lib/supabaseClient";
// import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   // create supabase client
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <SessionContextProvider supabaseClient={supabase}>
//           {children}
//         </SessionContextProvider>
//       </body>
//     </html>
//   );
// }

//solution 1:

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() =>
    createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  return (
    <SessionContextProvider supabaseClient={supabase}>
      <html lang="en">
        <body className="body-class antialiased">
          {children}
        </body>
      </html>
    </SessionContextProvider>
  );
}
