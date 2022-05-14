import React from "react";
import Script from "next/script";

function AdSenseScript(props: { onError: (e) => void }) {
  return (
    <Script
      id="Adsense-id"
      async
      onError={props.onError}
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5057636178540526"
      crossOrigin="anonymous"
    />
  );
}

export default AdSenseScript;
