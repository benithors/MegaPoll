import React, {useEffect, useState} from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";


interface IProps {
    pollData: definitions["polls"],
    pollQuestions: definitions["poll_questions"][],
    pollOptionsWrapper: IPollOption[],
}

interface IPollOption {
    pollOptions: definitions["poll_options"]
    lastUpdate: string;
}


export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params.id;
    const pollData = await supabase
        .from<definitions["polls"]>("polls")
        .select("*")
        .eq("id", id.toString()).single();

    const allQuestions = await supabase
        .from<definitions["poll_questions"]>("poll_questions")
        .select("*")
        .eq("poll", id.toString());


    const allPollOptions = await supabase
        .from<definitions["poll_options"]>("poll_options")
        .select("*")
        .in("poll_question", allQuestions.data.map(a => a.id));


    let pollOptionDataWrapper: IPollOption[] = [];

    allPollOptions.data.forEach((value) => {
        const temp: IPollOption = {
            pollOptions: value,
            lastUpdate: new Date().toISOString()
        }
        pollOptionDataWrapper.push(temp);
    })


    console.log("blub" + allPollOptions.data)
    return {
        props: {
            pollData: pollData.data,
            pollQuestions: allQuestions.data,
            pollOptionsWrapper: pollOptionDataWrapper
        },
    }


}


const Poll = (props: IProps) => {

    const [optionsData, setOptionsData] = useState<IPollOption[]>(props.pollOptionsWrapper)
    let mySubscription = [null];


    const handleNewOptionsUpdate = (payload: { commit_timestamp?: string; eventType?: "INSERT" | "UPDATE" | "DELETE"; schema?: string; table?: string; new: any; old?: any; errors?: string[]; }) => {

        setOptionsData(prevState => {
            let iPollOptions = prevState.slice();
            let idx = iPollOptions.findIndex(x => x.pollOptions.id == payload.new.id);
            const temp: IPollOption = {
                pollOptions: payload.new,
                lastUpdate: payload.commit_timestamp
            }
            iPollOptions[idx] = temp;
            return [...iPollOptions]
        });

    };

    useEffect(() => {

        props.pollOptionsWrapper.forEach((value) => {
            let subTemp = supabase
                .from('poll_options:id=eq.' + value.pollOptions.id)
                .on('*', payload => {
                    handleNewOptionsUpdate(payload);
                })
                .subscribe();
            mySubscription.push(subTemp);
        })


        return () => {
            mySubscription.forEach(sub => {
                supabase.removeSubscription(sub);
                console.log("Remove supabase subscription by useEffect unmount");
            })

        };
    }, [])  //todo need to figure out why removing the deps array breaks the updates



    function getVotePercentage(value, filteredOptions: IPollOption[]): number {
        if (value.pollOptions.votes === 0) {
            return 0
        }
        let map = filteredOptions.map(value1 => value1.pollOptions);
        return (100 * value.pollOptions.votes) / map.reduce((a, b) => +a + +b.votes, 0);
    }


    return (
        <div className={"w-full pt-16 px-20"}>


            {props.pollQuestions.map((pollque, index) => {
                    const filteredOptions = optionsData.filter(value => value.pollOptions.poll_question === pollque.id);
                    return <div key={index}>
                        {pollque.question}


                        <div className="p-6 space-y-2 artboard  w-full ">
                            {filteredOptions.map((value, idx) =>
                                <div key={idx}>
                                    <div>
                                        {value.pollOptions.option}
                                    </div>

                                    <div className={'flex flex-row justify-between'}>
                                        <div className={'w-2/4'}>

                                            <progress className="progress progress-primary" value={getVotePercentage(value, filteredOptions)} max="100"></progress>
                                        </div>
                                        <div>
                                            Votes {value.pollOptions.votes} | {getVotePercentage(value, filteredOptions).toFixed(1)}%
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>;
                }
            )}


        </div>


    );
}

export default Poll
