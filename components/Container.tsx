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

        <div className={"w-screen flex flex-col h-screen min-h-full"}>

            <Head>
                <title>Social Poll</title>
                <meta name="description" content="Your Favorite Social Poll Maker"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={"max-w-screen-xl flex-grow self-center flex flex-col px-6 md:px-14 xl:px-64 mt-24 md:mt-28 xl:mt-32 "}>
                <Header/>
                    {children}
                <CookieBar/>
            </main>

            <Footer/>
        </div>
    );
};

export default Container;
