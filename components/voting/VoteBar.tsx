import React from "react";
import { getVotePercentage } from "../../lib/pollUtil";
import { IPollOptionWrapper } from "../../lib/interfaces";

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  user;
  pollOptionWrapperArray: IPollOptionWrapper[];
}

const VoteBar = (props: IProps) => {
  let votePercentage = getVotePercentage(
    props.pollOptionWrapper.pollOptionVotes.votes,
    props.pollOptionWrapperArray
  );

  return (
    <div className={"flex flex-row justify-between"}>
      <div className={"flex w-full flex-row items-center"}>
        <div
          className={
            "h-4 bg-primary pr-1 opacity-90 drop-shadow-2xl transition-[width]"
          }
          style={{ width: `${votePercentage}%` }}
        />
        <div className={"pl-1"}>{votePercentage.toFixed(1)}%</div>
      </div>
    </div>
  );
};

export default VoteBar;
