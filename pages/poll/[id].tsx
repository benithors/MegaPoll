import React, {useEffect, useState} from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps } from "next";




interface IProps {
    allPolls:definitions["polls"],
}

export const getServerSideProps: GetServerSideProps = async (context) => {

    const id = context.params.id;
    const allPolls = await supabase
        .from<definitions["polls"]>("polls")
        .select("*")
        .eq("id",id.toString());

    return{
        props:{
            allPolls:allPolls,
        },
    };

}



const poll = (props: IProps) => {

    const [pollData, setPollData] = useState(props.allPolls.data[0].poll_name);

    const mySubscription = supabase
        .from('*')
        .on('*', payload => {

            setPollData(payload.new.poll_name);
            console.log('Change received!', payload);
        })
        .subscribe()


    useEffect(() => {

    })


    return (
        <div>
            {pollData}
        </div>


    );
}

export default poll
