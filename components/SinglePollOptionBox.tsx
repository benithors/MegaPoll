import React from "react";
import { PollOption } from "./CheckboxForm";

interface IProps {
  checkBoxes: PollOption[];
  setCheckBoxes: React.Dispatch<React.SetStateAction<PollOption[]>>;
  idx: number;
  multiPoll: boolean;
}

const SinglePollOptionBox = (props: IProps) => {
  const handleClick = () => {
    let pollOptions = [...props.checkBoxes];
    const pollOption = pollOptions[props.idx];
    const pollOptionCheckBoxBool: boolean = !pollOption.checkBox;
    if (props.multiPoll) {
      pollOptions.forEach((value, index) => {
        const pollOption1 = value;
        pollOption1.checkBox = false;
        pollOptions[index] = pollOption1;
      });
    }
    pollOption.checkBox = pollOptionCheckBoxBool;
    pollOptions[props.idx] = pollOption;
    props.setCheckBoxes(pollOptions);
  };

  return (
    <div className={"flex flex-row justify-between"}>
      {props.checkBoxes[props.idx].pollOption.option}
      <div>
        <input
          onChange={handleClick}
          checked={props.checkBoxes[props.idx].checkBox}
          type={props.multiPoll ? "radio" : "checkbox"}
          className={
            props.multiPoll
              ? "radio radio-md checked:radio-primary"
              : "checkbox checkbox-md checked:checkbox-primary"
          }
        />
      </div>
    </div>
  );
};

export default SinglePollOptionBox;
