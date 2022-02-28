import React, {useState} from 'react'
import {definitions} from "../types/database";
import {pollOption} from "./CheckboxForm";


interface IProps {
    checkBoxes: pollOption[];
    setCheckBoxes: React.Dispatch<React.SetStateAction<pollOption[]>>;
    idx: number;

}

//todo needs rework right now it does not work on first click and line 16 & 17 are actually not needed
const SingleCheckBox = (props: IProps) => {
    const handleClick = () => {
        const pollOption = props.checkBoxes[props.idx];
        pollOption.checkBox = !pollOption.checkBox;
        props.setCheckBoxes(prevState => {
            const pollOptionsTemp = prevState.slice();
            const pollOptionTemp = pollOptionsTemp[props.idx];
            pollOptionTemp.checkBox = !pollOptionTemp.checkBox;
            pollOptionsTemp[props.idx] = pollOptionTemp;
            return [...pollOptionsTemp]
        })
    }

    return (
        <div className={"flex flex-row justify-between"}>
            {props.checkBoxes[props.idx].pollOption.option}
            <input onChange={handleClick} checked={props.checkBoxes[props.idx].checkBox} type="checkbox"
                   className="checkbox checkbox-md"/>
        </div>


    );
}

export default SingleCheckBox
