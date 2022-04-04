import React, {useEffect, useState} from "react";
import Container from "../../components/Container";
import {useRouter} from "next/router";
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {isErrorWithMessage} from "../../lib/errorUtil";
import CheckboxForm from "../../components/CheckboxForm";

interface IProps {

}

export type PollInstanceData = {
    polltemplatetid: string,
    coverimage: string,
    pollname: string,
    creator: string,
    questionid: number,
    question: string,
    multipoll: boolean,
    optionid: number,
    option: string,
    voted: boolean
}


const Poll = (props: IProps) => {
    const router = useRouter()

    const [pollData, setPollData] = useState([null]);

    async function getData() {


        const {data, error} = await supabaseClient.rpc('get_poll_instance_data', {
            poll_instance: router.query.id,
            cookie: null,
            profile: null
        });
        if (isErrorWithMessage(error)) {
            console.log(error);
            return;
        } else {
            //group by question string and start the array at 0
            const groupedData = data.reduce((acc, cur) => {
                if (!acc[cur.question]) {
                    acc[cur.question] = [cur];
                } else {
                    acc[cur.question].push(cur);
                }
                return acc;
            }, {});


            //create a new array with the question as the key and the array of options as the value
            const newData = Object.keys(groupedData).map(key => ({
                question: key,
                options: groupedData[key]
            }));
            setPollData(newData);
            console.log("data", newData);
        }
    }

    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        getData();

    }, [router.isReady])

    return (
        <Container>
            {pollData !== null ?

                <div className={"w-full pt-16 px-20"}>


                    <div className="divider"></div>
                    <div>
                        data
                        {pollData.map((value, index) => {
                            return(
                                <div key={index}>

                                    <h1 className={"text-4xl"}>{value.question}</h1>

                                    {value.options.map((option, index) => {
                                        return(
                                            <div key={index}>
                                                <h1 className={"font-medium leading-tight text-2xl"}>
                                                    {option.option}
                                                </h1>
                                            </div>
                                        )
                                    })}

                                    <CheckboxForm
                                        key={index}
                                        pollQ={value}
                                        setOptionsData={setPollData}
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>

                /*  <Creator creator={props.pollData.creator} />*/
                :


                <div>Loading</div>
            }


        </Container>
    );


};


export default Poll;
