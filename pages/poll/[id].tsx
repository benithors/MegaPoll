import React from 'react'
import {supabase} from "../../utils/SupabaseClient";
import {definitions} from "../../types/database";


interface IProps {
    allPolls:definitions["polls"],
    something:string
}

export async function getServerSideProps ({ params }) {
    const allPolls = await supabase
        .from<definitions["polls"]>("polls")
        .select("*").eq("uuid", params.id);



    return{
        props:{
            allPolls:allPolls,
            something:params.id
        },
    };

}


const poll = (props: IProps) => {

    return (
        <div>
            {props.allPolls.poll_name}
        </div>


    );
}

export default poll
