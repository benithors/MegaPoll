import React from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";
import {GetServerSideProps,NextPageContext } from "next";


interface Context extends NextPageContext {
    // any modifications to the default context, e.g. query types
}

interface IProps {
    allPolls:definitions["polls"],
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const allPolls = await supabase
        .from<definitions["polls"]>("polls")
        .select("*")
        .eq("uuid",context.params?.id as string );










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
