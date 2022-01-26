import React, {useEffect, useState} from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";
import {random} from "nanoid";
import {prefixes} from "next/dist/build/output/log";


interface IProps {
    pollData: definitions["polls"],
    pollQuestions: definitions["poll_questions"][],
    pollOptionsWrapper: IPollOption[],
}

interface IPollOption{
    pollOptions: definitions["poll_options"]
    lastUpdate : string;
}

/*
const allOptions = await supabase
    .from<definitions["poll_options"]>("poll_options")
    .select("*")
    .eq("poll_question", value.id.toString());
          allOptions.data.map(value1 => {
            myPollData.pollo.push(value1);
        })
*/


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


    let pollOptionDataWrapper:IPollOption[] =[];

allPollOptions.data.forEach((value, index) => {
    const temp:IPollOption = {
        pollOptions:value,
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


const poll = (props: IProps) => {

    const [optionsData,setOptionsData] = useState<IPollOption[]>(props.pollOptionsWrapper)
    let mySubscription = [null];




// the problem is that we don't have the "real" previous state
    // it seems like usestate is async, need to figure out a way to update the value properly
    const handleNewOptionsUpdate = (payload: { commit_timestamp?: string; eventType?: "INSERT" | "UPDATE" | "DELETE"; schema?: string; table?: string; new: any; old?: any; errors?: string[]; }) => {
        let optionsTemp = [...optionsData];

        let idx = optionsTemp.findIndex(x => x.pollOptions.id == payload.new.id);
        if(new Date(payload.commit_timestamp) > new Date(optionsTemp[idx].lastUpdate)) {
            console.log(payload.commit_timestamp)
            console.log(payload.new)

            const temp: IPollOption = {
                pollOptions: payload.new,
                lastUpdate: payload.commit_timestamp
            }
            optionsTemp[idx] = temp;

            setOptionsData(prevState => (

                [...optionsTemp]));
            console.log(JSON.stringify(optionsData))
        }else{
            console.log("throwing it away")
        }
    };

    useEffect(() => {

        props.pollOptionsWrapper.forEach((value, index) =>
        {
            let subTemp =  supabase
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
    }, [])



    function getVotePercentage(value, filteredOptions: IPollOption[]): number {
        let map = filteredOptions.map(value1 => value1.pollOptions);
        return (100 * value.pollOptions.votes) /  map.reduce((a, b) => +a + +b.votes, 0);
    }


    return (
        <div>

            {props.pollData.poll_name}


            {props.pollQuestions.map((pollque, index) => {
                const filteredOptions = optionsData.filter(value => value.pollOptions.poll_question === pollque.id);
                return <div key={index}>
                        {pollque.question}


                        <div className="p-6 space-y-2 artboard phone">
                            {filteredOptions.map((value, index) =>

                                <div key={index}>
                                    <div>
                                        {value.pollOptions.option} {value.pollOptions.votes}
                                    </div>

                                    <progress className="progress progress-primary" value={getVotePercentage(value,filteredOptions)} max="100"></progress>
                                </div>
                            )}
                        </div>


                    </div>;
                }
            )}



        </div>


    );
}

export default poll
