import React, { useEffect } from "react";
import Link from "next/link";
import { checkCookies, setCookies } from "cookies-next";

interface IProps {}

const CookieBar = (props: IProps) => {
  const [showCookieBar, setShowCookieBar] = React.useState(false);
  const [allowCookies, setAllowCookies] = React.useState(null);

  useEffect(() => {
    if (!checkCookies("analytics-cookies-allowed")) {
      setShowCookieBar(true);
    }
  }, []);

  useEffect(() => {
    if (allowCookies === null) {
      return;
    }

    setShowCookieBar(false);
    setCookies("analytics-cookies-allowed", allowCookies);
    console.log("allowcookies");
  }, [allowCookies]);

  return (
    <div>
      {showCookieBar && (
        <div
          className={
            "fixed bottom-0 left-0 flex h-fit w-full flex-col bg-gray-200 pt-7 pb-7 pl-8 text-black"
          }
        >
          <div
            className={
              "h-fit w-full max-w-screen-xl self-center pt-7 pb-7 pl-8  text-black"
            }
          >
            <h2 className={"pb-4 font-bold"}>
              Your privacy is important to us
            </h2>
            <div className={"pb-4"}>
              We and our partners use cookies to store and retrieve personal
              information, such as browsing data, to provide and personalize
              content and advertising, and to analyze website usage. You can
              learn more about the purposes for which we and our partners use
              cookies by clicking the link below.
              <div className={"text-blue-400"}>
                <Link href="/privacy">
                  <a>more information</a>
                </Link>
              </div>
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => {
                setAllowCookies(true);
              }}
            >
              Accept Cookies
            </button>
            <button
              className="btn btn-ghost pl-4"
              onClick={() => {
                setAllowCookies(false);
              }}
            >
              Only necessary Cookies
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBar;
