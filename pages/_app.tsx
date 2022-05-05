import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastProvider } from "react-toast-notifications";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useRouter } from "next/router";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <>
      <Script
        id="Adsense-id"
        async
        onError={(e) => {
          console.error("Script failed to adsense", e);
        }}
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5057636178540526"
        crossOrigin="anonymous"
      />
      <UserProvider supabaseClient={supabaseClient}>
        <ToastProvider>
          <Component {...pageProps} key={router.asPath} />
        </ToastProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
