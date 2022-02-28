import React, {useState} from 'react'
import {useForm} from "react-hook-form";
import {IPollQuestion} from "../pages/poll/[id]";
import SingleCheckBox from "./SingleCheckBox";
import {definitions} from "../types/database";


interface IProps {
    pollQ: IPollQuestion;
    questionId: number,
    callback
}

export interface pollOption{
    checkBox:boolean,
    pollOption: definitions["poll_options"]
}

//problem: how do we parse the data so can create a proper query
const CheckboxForm = (props: IProps) => {
    const {register, handleSubmit, getValues} = useForm();
    const [checkBoxes,setCheckBoxes] = useState<pollOption[]>(getNewCheckBoxState);
    const onSubmit = data => {
        console.log(data)
    }

    function getNewCheckBoxState():pollOption[]
    {
        let pollOptionTemp:pollOption[] = [];
        props.pollQ.pollOptions.forEach((pollOption, idx) =>{
            const newElement:pollOption = {
                checkBox:false,
                pollOption:pollOption
            }
            pollOptionTemp.push(newElement)
        });
        return pollOptionTemp;
    }

    function submitQuestion()
    {
            console.log(props.questionId)
        checkBoxes.forEach(value => {
            console.log("value:" +value.pollOption.option + " = " + value.checkBox)
        })
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
