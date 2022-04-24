import { isEmpty } from "./stringUtils";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { isErrorWithMessage, toErrorWithMessage } from "./errorUtil";
import { NextRouter } from "next/router";
import { IPollOptionWrapper } from "./interfaces";

export interface IPollQuestionCreation {
  pollQuestion: string;
  pollOptions: string[];
  multiPoll: boolean;
}

export function areThereValidOption(
  cleanedPollQuestionCreation: IPollQuestionCreation
): boolean {
  return (
    cleanedPollQuestionCreation != undefined &&
    cleanedPollQuestionCreation.pollOptions != undefined &&
    cleanedPollQuestionCreation.pollOptions.filter((value) => !isEmpty(value))
      .length > 1
  );
}

export function cleanPollQuestionCreation(
  pollQuestionCreations: IPollQuestionCreation[]
): IPollQuestionCreation[] {
  //remove all question that have an empty question string
  pollQuestionCreations = pollQuestionCreations.filter(
    (pollQuestionCreation) => !isEmpty(pollQuestionCreation.pollQuestion)
  );
  pollQuestionCreations.forEach((pollQuestionCreation) => {
    pollQuestionCreation.pollOptions = pollQuestionCreation.pollOptions.filter(
      (option) => !isEmpty(option)
    );
  });
  return pollQuestionCreations;
}

export function copyPoll(
  original: IPollQuestionCreation[],
  copyTo: IPollQuestionCreation[]
) {
  original.forEach((value) => {
    let pollOptionCopy: string[] = [];
    value.pollOptions.forEach((pollOption) => {
      pollOptionCopy.push(pollOption);
    });
    const pollQuestion: string = value.pollQuestion;
    const multiPoll = value.multiPoll;
    const temp: IPollQuestionCreation = {
      pollQuestion: pollQuestion,
      pollOptions: pollOptionCopy,
      multiPoll: multiPoll,
    };
    copyTo.push(temp);
  });

  return copyTo;
}

export async function createFromTemplate(id: number, router: NextRouter) {
  const { data, error } = await supabaseClient.rpc(
    "fn_create_poll_from_template",
    { provided_poll_template: id }
  );
  if (isErrorWithMessage(error)) {
    console.log(toErrorWithMessage(error));
    //todo bt add error for user
    return;
  }
  router.push({
    pathname: "/poll/[id]",
    query: { id: data.toString() },
  });
}

export function getVotePercentage(
  votes: number,
  pollOptionsWrapper: IPollOptionWrapper[]
): number {
  if (votes === 0) {
    return 0;
  }
  return (
    (100 * votes) /
    pollOptionsWrapper.reduce((a, b) => +a + +b.pollOptionVotes.votes, 0)
  );
}
