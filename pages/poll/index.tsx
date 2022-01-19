import React from 'react'
import {useRouter} from "next/router";
import {supabase} from "../../utils/SupabaseClient";

import { definitions } from "../../types/database/index";
interface IProps {
allPollsy:definitions["polls"],
    something:string
}

export async function getStaticProps(){

   const allPolls = await supabase
        .from<definitions["polls"]>("polls")
        .select("*");



    return{
        props:{
            allPollsy:allPolls,
            something:'future'
        },
    };

}

const Poll = (props:IProps) => {
    const router = useRouter()
    const { pid } = router.query
    return (
        <div>
asd
            {JSON.stringify(props.allPollsy,null,2)}
        </div>


    );
}

export default Poll
