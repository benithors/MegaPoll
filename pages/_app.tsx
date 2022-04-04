import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </UserProvider>
  );
}

export default MyApp;
