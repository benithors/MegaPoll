import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {IPollQuestion} from "../pages/poll/[id]";
import SingleCheckBox from "./SingleCheckBox";
import {definitions} from "../types/database";
import {supabase} from "../utils/SupabaseClient";
import {getCookie} from "cookies-next";


interface IProps {
    pollQ: IPollQuestion;
    questionId: number,
    callback
}

export interface pollOption {
    checkBox: boolean,
    pollOption: definitions["poll_options"]
}

//problem: how do we parse the data so can create a proper query
const CheckboxForm = (props: IProps) => {
    const {register, handleSubmit, getValues} = useForm();
    const [checkBoxes, setCheckBoxes] = useState<pollOption[]>(getNewCheckBoxState);
    const onSubmit = data => {
        console.log(data)
    }

    function getNewCheckBoxState(): pollOption[] {
        let pollOptionTemp: pollOption[] = [];
        props.pollQ.pollOptions.forEach((pollOption, idx) => {
            const newElement: pollOption = {
                checkBox: false,
                pollOption: pollOption
            }
            pollOptionTemp.push(newElement)
        });
        return pollOptionTemp;
    }

    //TODO BT need to validate
    //If there is a cookie identifier, if not maybe create one ?
    //need think about how do we make sure there are no duplicates!
    //need to rewrite to for bulk create https://supabase.com/docs/reference/javascript/insert#bulk-create
    async function submitQuestion() {
        for (const checkbox of checkBoxes) {
            if (checkbox.checkBox) {
                const {data, error} = await supabase.from<definitions["profiles_2_poll_options"]>("profiles_2_poll_options")
                    .insert([
                        {
                            poll_option:checkbox.pollOption.id,
                            poll_question: checkbox.pollOption.poll_question,
                            cookie_identifier: getCookie('voter').toString()
                        }
                    ]);
                if(error){
                    console.log(error);
                }
            }

        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {checkBoxes.map((pollOption, idx) =>

                    <SingleCheckBox key={idx} setCheckBoxes={setCheckBoxes} checkBoxes={checkBoxes} idx={idx}/>
                )}
                <button className="btn btn-sm mt-4" onClick={submitQuestion}>submit</button>
            </form>
        </div>


    );
}

export default CheckboxForm
