import React, {useEffect, useState} from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps} from "next";


interface IProps {
    pollData: definitions["polls"],
    pollQuestions: definitions["poll_questions"][],
    pollOptions: definitions["poll_options"][],
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
    const poll = await supabase
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


    console.log("blub" + allPollOptions.data)
    return {
        props: {
            pollData: poll.data,
            pollQuestions: allQuestions.data,
            pollOptions: allPollOptions.data
        },
    };

}


const poll = (props: IProps) => {

    const [optionsData,setOptionsData] = useState(props.pollOptions)
    let mySubscription = [null];





    const handleNewOptionsUpdate = (payload) => {
        let optionsTemp = [...optionsData];
        optionsTemp[optionsTemp.findIndex(x => x.id == payload.new.id)] = payload.new;
        console.log("after:" +JSON.stringify(optionsData));
        console.log("Before:" + JSON.stringify(optionsTemp));
        setOptionsData(optionsTemp);

    };

    useEffect(() => {

        props.pollOptions.forEach((value, index) =>
        {
            let subTemp =  supabase
                .from('poll_options:id=eq.' + value.id)
                .on('*', payload => {
                    handleNewOptionsUpdate(payload);
                })
                .subscribe();
            mySubscription.push(subTemp);
        })




        return () => {
            mySubscription.forEach(sub => {
                supabase.removeSubscription(sub);
            })
            console.log("Remove supabase subscription by useEffect unmount");
        };
    }, [])




    function getVotePercentage( ): number {

        return 1;
    }


    return (
        <div>

            {props.pollData.poll_name}


            {props.pollQuestions.map((pollque, index) =>

                <div key={index}>
                    {pollque.question}


                    <div className="p-6 space-y-2 artboard phone">
                        {optionsData.filter(value => value.poll_question === pollque.id).map((value, index) =>

                            <div key={index}>
                                <div>
                                    {value.option}
                                </div>
                                <progress className="progress progress-primary" value={value.votes} max="5"></progress>
                            </div>
                        )}
                    </div>


                </div>
            )}



        </div>


    );
}

export default poll
