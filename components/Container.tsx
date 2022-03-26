import React from 'react'
import Head from "next/head";
import Header from "./Header";

const Container = (props) => {
    const {children} = props;
    return (
        <div>
            <Head>
                <title>Social Poll</title>
                <meta name="description" content="Your Favorite Social Poll Maker"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={"flex flex-col h-screen px-14 xl:px-64"}>

                <Header/>
                <div className={"mt-32"}>

                    {children}
                </div>
            </main>

        </div>


    );
}

export default Container
