import React from 'react'
import {pollOption} from "./CheckboxForm";


interface IProps {
    checkBoxes: pollOption[];
    setCheckBoxes: React.Dispatch<React.SetStateAction<pollOption[]>>;
    idx: number;
}

const SingleCheckBox = (props: IProps) => {
    const handleClick = () => {
        const pollOptions = [...props.checkBoxes];
        const pollOption = pollOptions[props.idx];
        pollOption.checkBox = !pollOption.checkBox;
        pollOptions[props.idx] = pollOption;
        props.setCheckBoxes(pollOptions);
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
