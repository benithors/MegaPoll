import React, { useState } from "react";
import PollOptionVote from "./PollOptionVote";
import { IPollQuestionWrapper } from "../../lib/interfaces";
import { getCookie } from "cookies-next";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import SinglePollOptionBox from "./SinglePollOptionBox";

interface IProps {
  pollQ: IPollQuestionWrapper;
  user;
  setOptionsData: React.Dispatch<React.SetStateAction<IPollQuestionWrapper[]>>;
  pollQuestionIndex: number;
}

const PollOptionQuestion = (props: IProps) => {
  const { addToast } = useToasts();
  //TODO BT need to validate
  //If there is a cookie identifier, if not maybe create one ?
  //need think about how do we make sure there are no duplicates!
  async function submitQuestion() {
    //gather all the checkboxes that have a true value
    //if there are none throw an error
    const pollOptions = props.pollQ.pollOptionsWrapper.filter(
      (value) => value.checkBox
    );
    if (pollOptions.length === 0) {
      addToast("Select an option before submitting!", {
        appearance: "warning",
        autoDismiss: true,
      });
    } else {
      //we need to update voted to true so the vote form is replaced by the vote stats
      props.setOptionsData((prevState) => {
        const iPollQuestions = prevState.slice();
        const idx = iPollQuestions.findIndex(
          (value) => value.pollQuestion.id === props.pollQ.pollQuestion.id
        );

        const iPollQuestion = iPollQuestions[idx];
        // update iPollQuestion with the new pollOptionVotes
        iPollQuestion.pollOptionsWrapper.forEach((pollOptionWrapper) => {
          const pollOption = pollOptions.find(
            (value) => value.pollOption.id === pollOptionWrapper.pollOption.id
          );
          if (pollOption) {
            pollOptionWrapper.voted = true;
          }
        });
        iPollQuestion.voted = true;
        iPollQuestions[idx] = iPollQuestion;
        return iPollQuestions;
      });

      let insertDataArr = [];
      for (const checkbox of pollOptions) {
        const insertData = {
          profile: props.user ? props.user.id : null,
          poll_option_vote: checkbox.pollOptionVotes.id,
          user_cookie: getCookie("voter").toString(),
        };
        insertDataArr.push(insertData);
      }
      await axios.post("/api/vote", insertDataArr);
      //TODO check for errors
    }
  }

  return (
    <>
      <h1 className={"break-words text-4xl text-secondary"}>
        {props.pollQ.pollQuestion.question}
      </h1>
      {props.pollQ.pollOptionsWrapper.map((pollOption, idx) => (
        <PollOptionVote
          setOptionsData={props.setOptionsData}
          user={props.user}
          pollQ={props.pollQ}
          key={idx}
          pollOptionWrapper={pollOption}
          pollOptionIndex={idx}
          pollQuestionIndex={props.pollQuestionIndex}
        />
      ))}
      <button
        className={
          "btn btn-primary btn-sm mt-4 w-2/4 self-end md:w-1/4 " +
          (props.pollQ.voted && "invisible")
        }
        onClick={submitQuestion}
      >
        submit
      </button>
    </>
  );
};

export default PollOptionQuestion;
