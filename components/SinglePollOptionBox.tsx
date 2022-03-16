import React from 'react'
import {pollOption} from "./CheckboxForm";


interface IProps {
    checkBoxes: pollOption[];
    setCheckBoxes: React.Dispatch<React.SetStateAction<pollOption[]>>;
    idx: number;
    multiPoll:boolean
}

const SinglePollOptionBox = (props: IProps) => {
    const handleClick = () => {

        let pollOptions = [...props.checkBoxes];
        const pollOption = pollOptions[props.idx];
             const pollOptionCheckBoxBool:boolean = !pollOption.checkBox;
        if(props.multiPoll){
            pollOptions.forEach((value, index) => {
                const pollOption1 = value;
                pollOption1.checkBox = false;
                pollOptions[index] = pollOption1;
            })

        }
        pollOption.checkBox = pollOptionCheckBoxBool;
        pollOptions[props.idx] = pollOption;
        props.setCheckBoxes(pollOptions);
    }

    return (
        <div className={"flex flex-row justify-between"}>
            {props.checkBoxes[props.idx].pollOption.option}
            <input onChange={handleClick} checked={props.checkBoxes[props.idx].checkBox} type={"checkbox"}
                   className="checkbox checkbox-md"/>
        </div>


    );
}

export default SinglePollOptionBox
