import React from 'react'
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
        .eq("uuid",id.toString());

    return{
        props:{
            allPolls:allPolls,
        },
    };

}


const poll = (props: IProps) => {

    return (
        <div>
            {props.allPolls.poll_name}
            {JSON.stringify(props.allPolls,null,2)}
        </div>


    );
}

export default poll
