import React, { useState } from "react";
import { IPollQuestionWrapper } from "../pages/poll/[id]";
import SinglePollOptionBox from "./SinglePollOptionBox";
import { definitions } from "../types/database";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { getCookie } from "cookies-next";
import { useToasts } from "react-toast-notifications";
import { useUser } from "@supabase/supabase-auth-helpers/react";

interface IProps {
  pollQ: IPollQuestionWrapper;
  setOptionsData: React.Dispatch<React.SetStateAction<IPollQuestionWrapper[]>>;
}

export interface PollOption {
  checkBox: boolean;
  pollOption: definitions["poll_options"];
  pollOptionAnswer: definitions["poll_options_answers"];
}

//problem: how do we parse the data so can create a proper query
const CheckboxForm = (props: IProps) => {
  const [checkBoxes, setCheckBoxes] =
    useState<PollOption[]>(getNewCheckBoxState);

  function getNewCheckBoxState(): PollOption[] {
    let pollOptionTemp: PollOption[] = [];
    props.pollQ.pollOptionsWrapper.forEach((pollOptionWrapper) => {
      const newElement: PollOption = {
        checkBox: false,
        pollOption: pollOptionWrapper.pollOption,
        pollOptionAnswer: pollOptionWrapper.pollOptionAnswer,
      };
      pollOptionTemp.push(newElement);
    });
    return pollOptionTemp;
  }

  const { addToast } = useToasts();

  const { user, error } = useUser();
  //TODO BT need to validate
  //If there is a cookie identifier, if not maybe create one ?
  //need think about how do we make sure there are no duplicates!
  async function submitQuestion() {
    //gather all the checkboxes that have a true value
    //if there are none throw an error
    const pollOptions = checkBoxes.filter((value) => value.checkBox);
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
        iPollQuestion.voted = true;
        iPollQuestions[idx] = iPollQuestion;
        return iPollQuestions;
      });

      let insertDataArr = [];
      for (const checkbox of pollOptions) {
        const insertData = {
          profile: user ? user.id : null,
          poll_option_answers: checkbox.pollOptionAnswer.id,
          poll_question: checkbox.pollOption.poll_question,
          cookie_identifier: getCookie("voter").toString(),
        };
        insertDataArr.push(insertData);
      }

      //by returning minimal we don't get the inserted row
      //we dont want the inserted row since, otherwise we would have to setup a select policy for row level security
      const { data, error } = await supabaseClient
        .from<definitions["profiles_2_poll_options"]>("profiles_2_poll_options")
        .insert(insertDataArr, { returning: "minimal" });
      console.log(data);

      if (error) {
        console.log(error);
        addToast("Something went wrong, try it later again", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  }

  return (
    <div>
      {checkBoxes.map((pollOption, idx) => (
        <SinglePollOptionBox
          key={idx}
          multiPoll={props.pollQ.pollQuestion.multipoll}
          setCheckBoxes={setCheckBoxes}
          checkBoxes={checkBoxes}
          idx={idx}
        />
      ))}
      <button className="btn btn-sm mt-4" onClick={submitQuestion}>
        submit
      </button>
    </div>
  );
};

export default CheckboxForm;
