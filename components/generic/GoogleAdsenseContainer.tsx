import { useEffect } from "react";
interface Iprops {
  client: string;
}
export function GoogleAdsenseContainer(props: Iprops) {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={props.client}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
