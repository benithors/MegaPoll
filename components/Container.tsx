import React from "react";
import Head from "next/head";
import Header from "./Header";
import CookieBar from "./CookieBar";
import Footer from "./Footer";

interface IProps {
    children: any;
    background?: string;
}

const Container = (props: IProps) => {
    const {children} = props;

    return (

        <div className={"w-screen flex flex-col h-screen min-h-full overflow-x-hidden bg-gradient-to-br from-primary  to-secondary relative"}>

            <Head>
                <title>Social Poll</title>
                <meta name="description" content="Your Favorite Social Poll Maker"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" className={'absolute top-40 w-full'} height="560" preserveAspectRatio="none" viewBox="0 0 1440 560">
                <g mask="url(&quot;#SvgjsMask1058&quot;)" fill="none">
                    <path d="M 0,244 C 96,210.4 288,72.8 480,76 C 672,79.2 768,262.2 960,260 C 1152,257.8 1344,104 1440,65L1440 560L0 560z" className={'fill-primary'}></path>
                    <path d="M 0,417 C 288,435.6 1152,491.4 1440,510L1440 560L0 560z" className={'fill-secondary'}></path>
                </g>
                <defs>
                    <mask id="SvgjsMask1058">
                        <rect width="1440" height="560" fill="#ffffff"></rect>
                    </mask>
                </defs>
            </svg>

            <main className={"max-w-screen-xl flex-grow self-center flex flex-col px-6 md:px-14 xl:px-64 mt-24 md:mt-28 xl:mt-32  z-10"}>
                <Header/>
                {children}
                <CookieBar/>


            </main>


            <Footer/>
        </div>
    );
};

export default Container;
