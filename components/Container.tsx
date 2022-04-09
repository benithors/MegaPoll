import React from "react";
import Head from "next/head";
import Header from "./Header";
import CookieBar from "./CookieBar";

interface IProps {
    children: any;
    background?: string;
}

const Container = (props: IProps) => {
    const {children} = props;

    return (

        <div className={"w-screen " + props.background}>

            <Head>
                <title>Social Poll</title>
                <meta name="description" content="Your Favorite Social Poll Maker"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={"flex flex-col h-screen px-14 xl:px-64 overflow-x-hidden"}>
                <Header/>
                <div className={"mt-32 flex flex-col"}>
                    {children}
                </div>
                <CookieBar/>
            </main>
        </div>
    );
};

export default Container;
