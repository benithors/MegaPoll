import React, {useEffect, useState} from "react";
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";
import {checkCookies, getCookie, setCookies} from "cookies-next";
import {v4 as uuidv4} from "uuid";
import CheckboxForm from "../../components/CheckboxForm";
import Image from "next/image";
import Container from "../../components/Container";
import Creator from "../../components/Creator";
import {useRouter} from "next/router";
import {useUser} from "@supabase/supabase-auth-helpers/react";
import {isErrorWithMessage} from "../../lib/errorUtil";
import VoteBar from "../../components/VoteBar";


interface IProps {
    pollData: definitions["poll_templates"];
}

export interface IPollOptionWrapper {
    pollOptionVotes: definitions["poll_option_votes"];
    pollOption: definitions["poll_options"];
    voted: boolean;
}

export interface IPollQuestionWrapper {
    pollQuestion: definitions["poll_questions"];
    pollOptionsWrapper: IPollOptionWrapper[];
    voted: boolean;
}


export interface IPollInstanceData {
    voted: boolean,
    poll_option_id: number,
    option: string,
    poll_question: number,
    poll_option_votes_id: number,
    poll_option_votes_instance: string,
    poll_option_votes_votes: number,
    top_profile_1: string,
    top_profile_2: string,
    top_profile_3: string
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params.id;
    const pollInstanceData = await supabaseClient
        .from<definitions["poll_instances"]>("poll_instances")
        .select("*")
        .eq("id", id.toString())
        .single();
    const pollTemplateData = await supabaseClient
        .from<definitions["poll_templates"]>("poll_templates")
        .select("*")
        .eq("id", pollInstanceData.data.poll_template)
        .single();

    return {
        props: {
            pollData: pollTemplateData.data,
        },
    };
};


const Poll = (props: IProps) => {

    const {user, error} = useUser();
    const [optionsData, setOptionsData] = useState<IPollQuestionWrapper[]>(
        null
    );
    const router = useRouter();


    async function loadInitialOptionData() {
        //first we get the question
        const allQuestions = await supabaseClient
            .from<definitions["poll_questions"]>("poll_questions")
            .select("*")
            .eq("poll_template", props.pollData.id);

        let questionWrapper: IPollQuestionWrapper[] = [];


        if (!checkCookies("voter")) {
            setCookies("voter", uuidv4(), {maxAge: 604800}); //a week
        }

        const {data, error} = await supabaseClient.rpc<IPollInstanceData>("get_poll_instance_data", {
            provided_poll_instance: router.query.id,
            provided_cookie: getCookie("voter"),
            provided_profile: user ? user.id : null,
        });
        if (isErrorWithMessage(error)) {
            console.log(error);
        }


        let pollOptionWrapper: IPollOptionWrapper[] = [];
        data.forEach((value) => {
            pollOptionWrapper.push({
                pollOptionVotes: {
                    id: value.poll_option_votes_id,
                    poll_option: value.poll_option_id,
                    poll_instance: router.query.id as string,
                    votes: value.poll_option_votes_votes,
                    top_profile_1: value.top_profile_1,
                    top_profile_2: value.top_profile_2,
                    top_profile_3: value.top_profile_3
                },
                pollOption: {
                    option: value.option,
                    id: value.poll_option_id,
                    poll_question: value.poll_question,
                },
                voted: value.voted,
            });
            let subTemp = supabaseClient
                .from(
                    "poll_option_votes:id=eq." + value.poll_option_votes_id
                )
                .on("UPDATE", (payload) => {
                    handleNewOptionsUpdate(payload);
                })
                .subscribe();
            mySubscription.push(subTemp);
        })

        //check if the voter cookie has been set and if not create one

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


        setOptionsData(prevState => [...questionWrapper]);

    }


    let mySubscription = [null];
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

        return () => {
            mySubscription.forEach((sub) => {
                supabaseClient.removeSubscription(sub).catch(e => {
                    console.log("error removing subscription", e);
                });
            });
        };
    }, [router.isReady, user]);





    const handleNewOptionsUpdate = (payload: {
        commit_timestamp?: string;
        eventType?: "INSERT" | "UPDATE" | "DELETE";
        schema?: string;
        table?: string;
        new: definitions["poll_option_votes"];
        old?: any;
        errors?: string[];
    }) => {
        setOptionsData((prevState) => {
            let prevStatePollQuestionWrapper = prevState.slice();

            let questionIdx = prevStatePollQuestionWrapper.findIndex(
                (pollQuestionWrapper) =>
                    pollQuestionWrapper.pollOptionsWrapper.some(
                        (pollOptionWrapper) =>
                            pollOptionWrapper.pollOptionVotes.id === payload.new.id
                    )
            );

            let iPollQuestion = prevStatePollQuestionWrapper[questionIdx];
            let optionIdx = iPollQuestion.pollOptionsWrapper.findIndex(
                (optionWrapper) => optionWrapper.pollOptionVotes.id === payload.new.id
            );

            iPollQuestion.pollOptionsWrapper[optionIdx].pollOptionVotes = {
                poll_option: payload.new.poll_option,
                id: payload.new.id,
                votes: payload.new.votes,
                poll_instance: payload.new.poll_instance,
                top_profile_1: payload.new.top_profile_1,
                top_profile_2: payload.new.top_profile_2,
                top_profile_3: payload.new.top_profile_3
            };
            prevStatePollQuestionWrapper[questionIdx] = iPollQuestion;
            return [...prevStatePollQuestionWrapper];
        });
    };
    return (
        <Container>
            <div className={"w-full pt-16 px-20"}>
                <h1 className={"font-medium leading-tight text-5xl"}>
                    {props.pollData.poll_name}
                </h1>
                <h2 className={"font-medium leading-tight text-2xl pt-16"}>
                    {props.pollData.poll_description}
                </h2>

                {props.pollData.cover_image ? (
                    <Image
                        src={props.pollData.cover_image}
                        alt="Poll cover"
                        width={500}
                        height={500}
                    />
                ) : (
                    <></>
                )}

                <div className="divider"></div>

                {optionsData ?
                    <div>
                        {optionsData.map((pollQ, index) => {
                            return (
                                <div key={index} className={"pb-12"}>
                                    <h1 className={"text-4xl"}>{pollQ.pollQuestion.question}</h1>

                                    {pollQ.voted ? (
                                        <div className="p-6 space-y-2 artboard  w-full " key={index}>
                                            {pollQ.pollOptionsWrapper.map((value, idx) => (
                                            <VoteBar key={idx} pollOptionWrapper={value} user={user} pollOptionWrapperArray={pollQ.pollOptionsWrapper}/>
                                            ))}
                                        </div>
                                    ) : (
                                        <CheckboxForm
                                            key={index}
                                            pollQ={pollQ}
                                            setOptionsData={setOptionsData}
                                        />
                                    )}
                                </div>
                            );
                        })
                        }

                    </div>


                    :

                    <div>loading</div>
                }


            </div>

            <Creator creator={props.pollData.creator}/>
        </Container>
    );
};

export default Poll;

