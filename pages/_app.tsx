import { AppProps } from "next/app";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}




// import { supabase } from "@/lib/supabaseClient";
// import { useState } from "react";
// import { AppProps } from "next/app";

// const MyApp = ({ Component, pageProps }: AppProps) => {
//   const [supabaseClient] = useState(() => supabase)

//   return (
//     <Component {...pageProps} supabase={supabaseClient} />
//   );
// };

// export default MyApp;

