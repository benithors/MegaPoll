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

    const [pollData, setPollData] = useState(props.pollData);
    const [newIncomingMessageTrigger, setNewIncomingMessageTrigger] =
        useState(null);
    let mySubscription = null;


    const handleNewMessage = (payload) => {
        setPollData(payload.new);
        setNewIncomingMessageTrigger(payload.new);
    };

    useEffect(() => {

        getMessagesAndSubscribe();


        return () => {
            supabase.removeSubscription(mySubscription);
            console.log("Remove supabase subscription by useEffect unmount");
        };
    }, [])


    const getMessagesAndSubscribe = async () => {
        if (!mySubscription) {
            mySubscription = supabase
                .from('polls:id=eq.' + pollData.id)
                .on('*', payload => {
                    handleNewMessage(payload);
                })
                .subscribe();
        }
    };


    return (
        <div>

            {pollData.poll_name}


            {props.pollQuestions.map((pollque, index) =>

                <div key={index}>
                    {pollque.question}


                    <div className="p-6 space-y-2 artboard phone">
                        {props.pollOptions.filter(value => value.poll_question === pollque.id).map((value, index) =>

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
