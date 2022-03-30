import Link from "next/link";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../types/database";
import Image from "next/image";
import React from "react";
import { isErrorWithMessage, toErrorWithMessage } from "../lib/errorUtil";
import { useRouter } from "next/router";
import Container from "../components/Container";

function Home() {
  const router = useRouter();

  async function createFromTemplate(uuid: string) {
    const { data, error } = await supabaseClient.rpc(
      "fn_create_poll_from_template",
      { polluuid: uuid }
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

  return (
    <Container>
      <div className={"text-8xl"}>
        <h1>Social Poll</h1>
      </div>
      <div className={"mt-16 "}>
        <Link href="/create-poll">
          <button className="btn btn-ghost text-2xl">HOW TO USE?</button>
        </Link>

        <Link href="/create-poll">
          <button className="btn btn-primary text-2xl">CREATE POLL</button>
        </Link>
      </div>
      <div className={"flex flex-row pt-16"}></div>
    </Container>
  );
}

export default Home;
