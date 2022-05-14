import React, { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../../types/database";
import { checkCookies, getCookie, setCookies } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import Container from "../../components/structure/Container";
import { useRouter } from "next/router";
import { useUser } from "@supabase/supabase-auth-helpers/react";
import { isErrorWithMessage } from "../../lib/errorUtil";
import { createFromTemplate } from "../../lib/pollUtil";
import Title from "../../components/generic/Title";
import PollOptionQuestion from "../../components/voting/PollOptionQuestion";
import {
  IPollInstanceData,
  IPollOptionWrapper,
  IPollQuestionWrapper,
} from "../../lib/interfaces";
import VoteCreator from "components/voting/VoteCreator";
import CopyUrlButton from "../../components/generic/CopyUrlButton";
import PaddingContainer from "../../components/structure/PaddingContainer";
import { NextSeo } from "next-seo";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id as string;
  const pollInstanceData = await supabaseClient
    .from<definitions["poll_instances"]>("poll_instances")
    .select("*")
    .eq("id", id as string)
    .single();
  const pollTemplateData = await supabaseClient
    .from<definitions["poll_templates"]>("poll_templates")
    .select("*")
    .eq("id", pollInstanceData.data.poll_template)
    .single();

  return {
    props: {
      pollTemplateData: pollTemplateData.data,
      pollInstanceData: pollInstanceData.data,
    },
  };
};
interface IProps {
  pollTemplateData: definitions["poll_templates"];
  pollInstanceData: definitions["poll_instances"];
}
const Poll = (props: IProps) => {
  const { user } = useUser();
  const [optionsData, setOptionsData] = useState<IPollQuestionWrapper[]>(null);
  const router = useRouter();

  async function loadInitialOptionData() {
    const allQuestions = await supabaseClient
      .from<definitions["poll_questions"]>("poll_questions")
      .select("*")
      .eq("poll_template", props.pollTemplateData.id);

    let questionWrapper: IPollQuestionWrapper[] = [];

    if (!checkCookies("voter")) {
      setCookies("voter", uuidv4());
    }

    const iPollRpcInstanceData = await supabaseClient.rpc<IPollInstanceData>(
      "get_poll_instance_data",
      {
        provided_poll_instance: router.query.id,
        provided_cookie: getCookie("voter"),
        provided_profile: user ? user.id : null,
      }
    );
    if (isErrorWithMessage(iPollRpcInstanceData.error)) {
      console.log(iPollRpcInstanceData.error);
    }

    let pollOptionWrapper: IPollOptionWrapper[] = [];
    iPollRpcInstanceData.data.forEach((value) => {
      pollOptionWrapper.push({
        pollOptionVotes: {
          id: value.poll_option_votes_id,
          poll_option: value.poll_option_id,
          poll_instance: router.query.id as string,
          votes: value.poll_option_votes_votes,
          top_profile_1: value.top_profile_1,
          top_profile_2: value.top_profile_2,
          top_profile_3: value.top_profile_3,
        },
        pollOption: {
          option: value.option,
          id: value.poll_option_id,
          poll_question: value.poll_question,
        },
        voted: value.voted,
        checkBox: false,
      });
    });

    for (const pollQuestion of allQuestions.data) {
      let wrappers = pollOptionWrapper.filter(
        (value) => value.pollOption.poll_question === pollQuestion.id
      );
      const pollQuestionTemp: IPollQuestionWrapper = {
        pollOptionsWrapper: wrappers,
        pollQuestion: pollQuestion,
        voted: wrappers.some((value) => value.voted),
      };
      questionWrapper.push(pollQuestionTemp);
    }

    setOptionsData([...questionWrapper]);
  }

  // load intial data and set up listeners
  //todo this could be reworked to only load the data once, right now it gets reloaded once the user is logged in
  useEffect(() => {
    //check in session storage if there is an sb-providr-token, if so we need to wait for user to be logged in to fetch data
    if (!router.isReady) {
      return;
    }

    async function loadData() {
      await loadInitialOptionData();
    }

    loadData();
  }, [router.isReady, user]);

  return (
    <Container>
      <NextSeo
        title={props.pollTemplateData.poll_name}
        description="Socialpoll.me - Free realtime polls for you and your community"
        robotsProps={{
          nosnippet: true,
          notranslate: false,
          noimageindex: true,
          noarchive: false,
          maxSnippet: -1,
          maxImagePreview: "standard",
          maxVideoPreview: -1,
        }}
        twitter={{
          handle: "@socialpollme",
          site: "@socialpollme",
          cardType: "summary_large_image",
        }}
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: "https://www.socialpoll.me/poll/" + props.pollInstanceData.id,
          site_name: "SocialPoll",
          images: [
            {
              width: 400,
              url: props.pollTemplateData.cover_image,
              height: 400,
              alt: props.pollTemplateData.poll_name,
              type: "image/jpeg",
            },
          ],
        }}
      />
      <PaddingContainer className={""}>
        <div className={"flex flex-row justify-end"}>
          <CopyUrlButton />
        </div>

        <div>
          <h1 className={"break-words text-5xl font-medium leading-tight"}>
            <Title firstPart={props.pollTemplateData.poll_name} />
          </h1>
        </div>

        <div className="divider" />

        {optionsData ? (
          <>
            <div>
              {optionsData.map((pollQ: IPollQuestionWrapper, index: number) => {
                return (
                  <div key={index}>
                    <div className={"flex flex-col pb-12"}>
                      <PollOptionQuestion
                        setOptionsData={setOptionsData}
                        user={user}
                        pollQ={pollQ}
                        pollQuestionIndex={index}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="w-full animate-pulse ">
            <div className="h-5 w-2/4 rounded bg-slate-200 pt-12" />
            <div className={"ml-3 flex w-full flex-row"}>
              <div className={"w-2/3 "}>
                <div className="mt-3 h-3 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-1/3 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-2/4 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-1/4 rounded bg-slate-200" />
                <div className="mt-5 h-5 w-2/12 rounded bg-slate-200" />
              </div>
              <div className={"flex w-1/3 flex-col items-end"}>
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-5 h-5 w-2/3 rounded bg-slate-200" />
            <div className={"flex w-full flex-row"}>
              <div className={"w-2/3 "}>
                <div className="mt-3 h-3 w-2/3 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-1/3 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-2/4 rounded bg-slate-200" />
                <div className="mt-3 h-3 w-1/4 rounded bg-slate-200" />
                <div className="mt-5 h-5 w-2/12 rounded bg-slate-200" />
              </div>
              <div className={"flex w-1/3 flex-col items-end"}>
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-1/12 rounded bg-slate-200" />
              </div>
            </div>
          </div>
        )}
      </PaddingContainer>
      <div className={"mt-3 flex flex-row justify-center"}>
        <button
          onClick={() => createFromTemplate(props.pollTemplateData.id, router)}
          className="btn btn-accent mb-4 w-fit"
        >
          CLONE THIS POLL!
        </button>
      </div>

      <div className={"self-center"}>
        <VoteCreator creator={props.pollTemplateData.creator} />
      </div>
    </Container>
  );
};

export default Poll;
