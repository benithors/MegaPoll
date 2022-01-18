import React from 'react'
import {useRouter} from "next/router";
import {supabase} from "../../utils/SupabaseClient";


interface IProps {

}

export async function getStaticProps(){
    const {data: polls,error} = await supabase.from('poll_questions').select('*')



    return{
        props:{
            polls,
        },
    };

}

const Poll = ({polls}) => {
    const router = useRouter()
    const { pid } = router.query
    return (
        <div>
asd
            {JSON.stringify(polls,null,2)}
        </div>


    );
}

export default Poll
