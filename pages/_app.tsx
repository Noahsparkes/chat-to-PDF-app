
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [supabaseClient] = useState(() => supabase)

  return (
    <Component {...pageProps} supabase={supabaseClient} />
  );
};

export default MyApp;

