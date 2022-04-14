import React from "react";
import { isEmpty } from "../lib/stringUtils";
import { IPollQuestionCreation } from "../lib/pollUtil";

interface IProps {
  pollQuestionFormData: IPollQuestionCreation[];
  setPollOptions: React.Dispatch<React.SetStateAction<IPollQuestionCreation[]>>;
  pollQuestionIndex: number;
}

function increaseArraySize(
  setArray: React.Dispatch<React.SetStateAction<IPollQuestionCreation[]>>,
  index: number,
  e: { target: { value: string } },
  pollQuestionIndex
) {
  setArray((prevState) => {
    let pollQuestionCreationArr = prevState.slice();
    let pollQuestionCreation = pollQuestionCreationArr[pollQuestionIndex];
    let pollOptions = pollQuestionCreation.pollOptions;
    pollOptions[index] = e.target.value;
    //we need to check if the last element in poll has some string in it
    //if this is so we need to append +1 on poll so that another poll can be added
    const lastPollOption = pollOptions[pollOptions.length - 1];

    if (!isEmpty(lastPollOption) && pollOptions.length < 15) {
      pollOptions.push("");
    }
    pollQuestionCreation.pollOptions = pollOptions;
    pollQuestionCreationArr[pollQuestionIndex] = pollQuestionCreation;
    return pollQuestionCreationArr;
  });
}

const CreatePollInput = (props: IProps) => {
  return (
    <>
      {props.pollQuestionFormData[props.pollQuestionIndex].pollOptions.map(
        (value, index) => {
          return (
            <input
              key={index}
              value={value || ""}
              onChange={(event) =>
                increaseArraySize(
                  props.setPollOptions,
                  index,
                  event,
                  props.pollQuestionIndex
                )
              }
              type="text"
              placeholder="Type your poll option"
              className="input-bordered input-secondary input
                                  mt-2"
            />
          );
        }
      )}
    </>
  );
};

export default CreatePollInput;
