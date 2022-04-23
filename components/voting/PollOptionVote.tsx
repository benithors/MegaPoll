import React from "react";
import VoteBar from "./VoteBar";
import { IPollOptionWrapper, IPollQuestionWrapper } from "../../lib/interfaces";
import PollOptionVoters from "./PollOptionVoters";
import SinglePollOptionBox from "./SinglePollOptionBox";

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  pollQ: IPollQuestionWrapper;
  user;
  setOptionsData: React.Dispatch<React.SetStateAction<IPollQuestionWrapper[]>>;
  pollOptionIndex: number;
  pollQuestionIndex: number;
}

const PollOptionVote = (props: IProps) => {
  return (
    <div className={"border-t-2 "}>
      <div>{props.pollOptionWrapper.pollOption.option}</div>
      <div className={"flex w-full flex-row items-center"}>
        <div className={"w-full " + (!props.pollQ.voted && "invisible")}>
          <VoteBar
            user={props.user}
            pollOptionWrapper={props.pollOptionWrapper}
            pollOptionWrapperArray={props.pollQ.pollOptionsWrapper}
          />
        </div>
        <div className={"h-14 w-2/6"}>
          {props.pollQ.voted ? (
            <PollOptionVoters
              pollOptionWrapper={props.pollOptionWrapper}
              user={props.user}
            />
          ) : (
            <SinglePollOptionBox
              pollQuestionIndex={props.pollQuestionIndex}
              pollOptionIndex={props.pollOptionIndex}
              multiPoll={props.pollQ.pollQuestion.multipoll}
              setOptionsData={props.setOptionsData}
              pollOptionWrapper={props.pollOptionWrapper}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PollOptionVote;
