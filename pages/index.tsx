import Link from "next/link";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../types/database";
import React from "react";
import { isErrorWithMessage, toErrorWithMessage } from "../lib/errorUtil";
import { useRouter } from "next/router";
import Container from "../components/Container";
import PollCard from "../components/PollCard";
import Title from "../components/Title";
import PaddingContainer from "../components/PaddingContainer";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const { data, error } = await supabaseClient
    .from<definitions["front_page"]>("front_page")
    .select("*");

  //todo BT handle error
  return {
    props: {
      frontPage: data,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 3600 seconds
    revalidate: 3600, // In seconds
  };
}

interface IProps {
  frontPage: definitions["front_page"][];
}

function Home(props: IProps) {
  const router = useRouter();

  async function createFromTemplate(id: number) {
    const { data, error } = await supabaseClient.rpc(
      "fn_create_poll_from_template",
      { provided_poll_template: id }
    );
    if (isErrorWithMessage(error)) {
      console.log(toErrorWithMessage(error));
      //todo bt add error for user
      return;
    }

    console.log(data);

    router.push({
      pathname: "/poll/[id]",
      query: { id: data.toString() },
    });
  }

  function openInstance(poll_instance: string) {
    router.push({
      pathname: "/poll/[id]",
      query: { id: poll_instance },
    });
  }

  return (
    <Container>
      <Title firstPart={"Share Your"} secondPart={"Opinion"} />
      <button className="btn btn-accent z-10 mt-4 md:mt-14 mb-8 self-center text-2xl">
        <Link href="/create-poll">CREATE A POLL</Link>
      </button>
      <PaddingContainer
        className={
          "grid w-full md:w-11/12 grid-cols-1 gap-4 self-center rounded-2xl bg-white bg-opacity-10 pt-16 backdrop-blur-2xl sm:grid-cols-2 md:grid-cols-3"
        }
      >
        {props.frontPage.map((value: definitions["front_page"], index) => {
          return (
            <PollCard
              key={index}
              poll={value}
              openInstance={openInstance}
              createFromTemplate={createFromTemplate}
            />
          );
        })}
      </PaddingContainer>
    </Container>
  );
}

export default Home;
