import React, {useEffect, useState} from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";
import {checkCookies, getCookie, setCookies} from 'cookies-next';
import {v4 as uuidv4} from 'uuid';
import CheckboxForm from "../../components/CheckboxForm";
import Image from 'next/image'

interface IProps {
    pollData: definitions["polls"],
    pollQuestionsWrapper: IPollQuestion[],
}

export interface IPollQuestion {
    pollQuestion: definitions["poll_questions"];
    pollOptions: definitions["poll_options"][]
    voted: boolean;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params.id;
    const {req, res} = context;
    const pollData = await supabase
        .from<definitions["polls"]>("polls")
        .select("*")
        .eq("uuid", id.toString()).single();


    //first we get the question
    const allQuestions = await supabase
        .from<definitions["poll_questions"]>("poll_questions")
        .select("*")
        .eq("poll", pollData.data.id);


    let questionWrapper: IPollQuestion[] = [];

    //then we check if the user is logged in
    //if not we check if there is a cookie
    if (!checkCookies('voter', context)) {
        setCookies('voter', uuidv4(), {req, res, maxAge: 604800});//a week
    }
        //if there is one we have to check in the db if there is an entry in profiles_2_poll_options
    //for a profile option which is connected to the question
    else {
        for (const pollQuestion of allQuestions.data) {
            const allPollOptions = await supabase
                .from<definitions["poll_options"]>("poll_options")
                .select("*")
                .eq("poll_question", pollQuestion.id);

            const pollOptionsVoted = await supabase
                .from<definitions["poll_options_voted"]>("poll_options_voted")
                .select("*")
                .eq("poll_question", pollQuestion.id)
                .eq("cookie_identifier", getCookie('voter', context));
            let didVote = false;
            console.log(pollOptionsVoted);
            if (pollOptionsVoted.data) {
                didVote = pollOptionsVoted.data.some(value => value.voted);
            }

            const pollQuestionTemp: IPollQuestion = {
                pollOptions: allPollOptions.data,
                pollQuestion: pollQuestion,
                voted: didVote
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

    const [optionsData, setOptionsData] = useState<IPollQuestion[]>(props.pollQuestionsWrapper)
    let mySubscription = [null];

    const handleNewOptionsUpdate = (payload: { commit_timestamp?: string; eventType?: "INSERT" | "UPDATE" | "DELETE"; schema?: string; table?: string; new: definitions["poll_options"]; old?: any; errors?: string[]; }) => {

        setOptionsData(prevState => {
            let prevStatePollQuestionWrapper = prevState.slice();
            let questionIdx = prevStatePollQuestionWrapper.findIndex(value => value.pollQuestion.id === payload.new.poll_question);


            let iPollQuestion = prevStatePollQuestionWrapper[questionIdx];
            let optionIdx = iPollQuestion.pollOptions.findIndex(x =>
                x.id == payload.new.id);


            iPollQuestion.pollOptions[optionIdx] = {
                option: payload.new.option,
                id: payload.new.id,
                votes: payload.new.votes,
                poll_question: payload.new.poll_question
            };
            prevStatePollQuestionWrapper[questionIdx] = iPollQuestion;
            return [...prevStatePollQuestionWrapper]
        });

    };


    useEffect(() => {

        props.pollQuestionsWrapper.forEach((question) => {
            question.pollOptions.forEach(option => {
                let subTemp = supabase
                    .from('poll_options:id=eq.' + option.id)
                    .on('*', payload => {
                        handleNewOptionsUpdate(payload);
                    })
                    .subscribe();
                mySubscription.push(subTemp);
            })
        })


        return () => {
            mySubscription.forEach(sub => {
                supabase.removeSubscription(sub);
                console.log("Remove supabase subscription by useEffect unmount");
            })

        };
    }, [])  //todo need to figure out why removing the deps array breaks the updates


    function getVotePercentage(value: definitions["poll_options"], options: definitions["poll_options"][]): number {
        if (value.votes === 0) {
            return 0
        }
        return (100 * value.votes) / options.reduce((a, b) => +a + +b.votes, 0);
    }


    return (
        <div className={"w-full pt-16 px-20"}>

            <h1 className={"font-medium leading-tight text-5xl"}>
                {props.pollData.poll_name}

            </h1>
            <h2 className={"font-medium leading-tight text-2xl pt-16"}>
                {props.pollData.poll_description}

            </h2>
            <Image
                src={props.pollData.cover_image}
                alt="Poll cover"
                width={500}
                height={500}
            />

            <div className="divider"></div>
            {optionsData.map((pollQ, index) => {
                    return <div key={index} className={"pb-12"}>
                        {pollQ.pollQuestion.question}

                        {
                            pollQ.voted ?

                                <div className="p-6 space-y-2 artboard  w-full " key={index}>
                                    {pollQ.pollOptions.map((value, idx) =>
                                        <div key={idx}>
                                            <div>
                                                {value.option}

                                            </div>

                                            <div className={'flex flex-row justify-between'}>
                                                <div className={'w-2/4'}>
                                                    <progress className="progress progress-primary" value={getVotePercentage(value, pollQ.pollOptions)} max="100"/>
                                                </div>
                                                <div>
                                                    Votes {value.votes} | {getVotePercentage(value, pollQ.pollOptions).toFixed(1)}%
                                                </div>


                                            </div>


                                        </div>
                                    )}
                                </div>

                                :


                                <CheckboxForm key={index} pollQ={pollQ} setOptionsData={setOptionsData}/>

                        }


                    </div>;
                }
            )}


        </div>


    );
}

export default Poll
