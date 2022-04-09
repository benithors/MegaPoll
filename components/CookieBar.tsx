import React, {useEffect} from 'react'
import Link from "next/link";
import {checkCookies, setCookies} from "cookies-next";


interface IProps {

}

const CookieBar = (props: IProps) => {

    const [showCookieBar, setShowCookieBar] = React.useState(false);


    useEffect(() => {
        setShowCookieBar(!checkCookies("cookies-allowed"))
    }, []);

    useEffect(() => {
        setCookies("cookies-allowed", showCookieBar)
    }, [showCookieBar]);

    return (
        <div>
            {showCookieBar &&
                <div className={"absolute z-50 bottom-0 left-0 w-screen h-fit bg-gray-200 text-black pt-7 pb-7 pl-8"}>
                    <h2 className={"pb-4 font-bold"}>
                        Your privacy is important to us
                    </h2>
                    <div className={"pb-4"}>
                        We and our partners use cookies to store and retrieve personal information, such as browsing data, to provide and personalize content and advertising, and to analyze website usage. You can learn more about the purposes for which we
                        and our partners use cookies by clicking the link below.
                        <div className={"text-blue-400"}>
                            <Link href="/privacy">
                                <a>more information</a>
                            </Link>
                        </div>
                    </div>
                    <button className="btn btn-secondary" onClick={event => {
                        setShowCookieBar(false);
                    }}>
                        Accept Cookies
                    </button>
                    <button className="pl-4 btn btn-ghost" onClick={event => {
                        setShowCookieBar(false);
                    }}>
                        Only necessary Cookies
                    </button>
                </div>
            }
        </div>


    );
}

export default CookieBar

