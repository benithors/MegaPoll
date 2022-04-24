import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ToastProvider>
        <Component {...pageProps} key={router.asPath} />
      </ToastProvider>
    </UserProvider>
  );
}

export default MyApp;
