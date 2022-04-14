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
  const { children } = props;

  return (
    <div
      className={
        "relative flex h-full min-h-full w-full flex-col bg-gradient-to-br  from-primary-content to-primary"
      }
    >
      <Head>
        <title>Social Poll</title>
        <meta name="description" content="Your Favorite Social Poll Maker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <div
          className={
            "mt-24 flex max-w-screen-xl flex-grow flex-col  self-center md:mt-12 xl:mt-32"
          }
        >
          {children}
        </div>
      </main>

      <Footer />

      <CookieBar />
    </div>
  );
};

export default Container;
