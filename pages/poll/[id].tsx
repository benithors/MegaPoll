import React, {useEffect, useState} from 'react'
import {supabaseClient} from '@supabase/supabase-auth-helpers/nextjs';
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";
import {checkCookies, setCookies} from 'cookies-next';
import {v4 as uuidv4} from 'uuid';
import CheckboxForm from "../../components/CheckboxForm";
import Image from 'next/image'
import Container from "../../components/Container";
import Creator from "../../components/Creator";

interface IProps {
    pollData: definitions["polls"],
    pollQuestionsWrapper: IPollQuestionWrapper[],
}

export interface IPollOptionWrapper {
    pollOptionAnswer: definitions["poll_options_answers"];
    pollOption: definitions["poll_options"];
}

export interface IPollQuestionWrapper {
    pollQuestion: definitions["poll_questions"];
    pollOptionsWrapper: IPollOptionWrapper[];
    voted: boolean;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params.id;
    const {req, res} = context;

    const pollInstanceData = await supabaseClient
        .from<definitions["poll_instance"]>("poll_instance")
        .select("*")
        .eq("url", id.toString()).single();
    const pollData = await supabaseClient
        .from<definitions["polls"]>("polls")
        .select("*")
        .eq("id", pollInstanceData.data.poll).single();


    //first we get the question
    const allQuestions = await supabaseClient
        .from<definitions["poll_questions"]>("poll_questions")
        .select("*")
        .eq("poll", pollData.data.id);


    let questionWrapper: IPollQuestionWrapper[] = [];

    //then we check if the user is logged in
    //if not we check if there is a cookie
    if (!checkCookies('voter', context)) {
        setCookies('voter', uuidv4(), {req, res, maxAge: 604800});//a week
    }
        //if there is one we have to check in the db if there is an entry in profiles_2_poll_options
    //for a profile option which is connected to the question
    else {

        //we gather all poll_question ids, so we can get all poll_options
        const allPollOptions = await supabaseClient
            .from<definitions["poll_options"]>("poll_options")
            .select("*")
            .in("poll_question", allQuestions.data.map(value => value.id));

        const pollAnswersOptions = await supabaseClient
            .from<definitions["poll_options_answers"]>("poll_options_answers")
            .select("*")
            .in("poll_option", allPollOptions.data.map(value => value.id));


        let pollOptionWrapper: IPollOptionWrapper[] = []
        allPollOptions.data.forEach(pollOption => {

            let pollOptionAnswer = pollAnswersOptions.data.find(answer => answer.poll_option === pollOption.id);


            pollOptionWrapper.push({
                pollOptionAnswer: pollOptionAnswer,
                pollOption: pollOption
            });
        });


        for (const pollQuestion of allQuestions.data) {
            const pollQuestionTemp: IPollQuestionWrapper = {
                pollOptionsWrapper: pollOptionWrapper.filter(value => value.pollOption.poll_question === pollQuestion.id),
                pollQuestion: pollQuestion,
                voted: false //TODO BT need to implement logic that checks if the user already voted, would also be good to see what the user voted for?
            }
            questionWrapper.push(pollQuestionTemp)
        }
    }


    return {
        props: {
            pollData: pollData.data,
            pollQuestionsWrapper: questionWrapper
        },
    }


}


const Poll = (props: IProps) => {


    const [optionsData, setOptionsData] = useState<IPollQuestionWrapper[]>(props.pollQuestionsWrapper);
    let mySubscription = [null];
    const handleNewOptionsUpdate = (payload: { commit_timestamp?: string; eventType?: "INSERT" | "UPDATE" | "DELETE"; schema?: string; table?: string; new: definitions["poll_options_answers"]; old?: any; errors?: string[]; }) => {
        console.log("update incoming ",
            payload)
        setOptionsData(prevState => {
            let prevStatePollQuestionWrapper = prevState.slice();

            let questionIdx = prevStatePollQuestionWrapper.findIndex(pollQuestionWrapper => pollQuestionWrapper.pollOptionsWrapper.some(pollOptionWrapper => pollOptionWrapper.pollOptionAnswer.id === payload.new.id));
            console.log("questionIdx : ", questionIdx);
            console.log("prevStatePollQuestionWrapper : ", prevStatePollQuestionWrapper)
            let iPollQuestion = prevStatePollQuestionWrapper[questionIdx];
            let optionIdx = iPollQuestion.pollOptionsWrapper.findIndex(optionWrapper =>
                optionWrapper.pollOptionAnswer.id === payload.new.id);

            console.log("optionIdx", optionIdx);
            console.log("pollOptionsWrapper", iPollQuestion.pollOptionsWrapper);


            iPollQuestion.pollOptionsWrapper[optionIdx].pollOptionAnswer = {
                poll_option: payload.new.poll_option,
                id: payload.new.id,
                votes: payload.new.votes,
                poll_instance: payload.new.poll_instance
            };
            prevStatePollQuestionWrapper[questionIdx] = iPollQuestion;
            return [...prevStatePollQuestionWrapper]
        });

    };

    // load intial data and set up listeners
    useEffect(() => {

        props.pollQuestionsWrapper.forEach((question) => {
            question.pollOptionsWrapper.forEach(optionWrapper => {
                let subTemp = supabaseClient
                    .from('poll_options_answers:id=eq.' + optionWrapper.pollOptionAnswer.id)
                    .on('UPDATE', payload => {
                        handleNewOptionsUpdate(payload);
                    })
                    .subscribe();
                mySubscription.push(subTemp);
            })
        })


        return () => {
            mySubscription.forEach(sub => {
                supabaseClient.removeSubscription(sub);
                console.log("Remove supabase subscription by useEffect unmount");
            })

        };
    }, [])

    //todo bt reimplement this
    function getVotePercentage(value: definitions["poll_options"], options: definitions["poll_options"][]): number {
        if (value.votes === 0) {
            return 0
        }
        return (100 * value.votes) / options.reduce((a, b) => +a + +b.votes, 0);
    }


    return (
        <Container>
            <div className={"w-full pt-16 px-20"}>

                <h1 className={"font-medium leading-tight text-5xl"}>
                    {props.pollData.poll_name}

                </h1>
                <h2 className={"font-medium leading-tight text-2xl pt-16"}>
                    {props.pollData.poll_description}

                </h2>

                {props.pollData.cover_image ?
                    <Image
                        src={props.pollData.cover_image}
                        alt="Poll cover"
                        width={500}
                        height={500}
                    />
                    :
                    <></>

                }

                <div className="divider"></div>
                {optionsData.map((pollQ, index) => {
                        return <div key={index} className={"pb-12"}>
                            <h1 className={"text-4xl"}>

                                {pollQ.pollQuestion.question}
                            </h1>

                            {
                                pollQ.voted ?

                                    <div className="p-6 space-y-2 artboard  w-full " key={index}>
                                        {pollQ.pollOptionsWrapper.map((value, idx) =>
                                            <div key={idx}>
                                                <div>
                                                    {value.pollOption.option}

                                                </div>

                                                <div className={'flex flex-row justify-between'}>
                                                    <div className={'w-2/4'}>
                                                        <progress className="progress progress-primary" value={100} max="100"/>
                                                    </div>
                                                    <div>
                                                        Votes {value.pollOptionAnswer.votes}
                                                    </div>


                                                </div>


                                            </div>
                                        )}
                                    </div>

                                    :


                                    <CheckboxForm key={index} pollQ={pollQ} setOptionsData={setOptionsData}/>

                            }

                            <Creator creator={props.pollData.creator}/>
                        </div>;
                    }
                )}


            </div>


        </Container>


    );
}

export default Poll
