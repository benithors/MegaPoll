import React from 'react';
import { IPollOptionWrapper, IPollQuestionWrapper } from '../../lib/interfaces';

interface IProps {
  pollOptionIndex: number;
  pollQuestionIndex: number;
  pollOptionWrapper: IPollOptionWrapper;
  setOptionsData: React.Dispatch<React.SetStateAction<IPollQuestionWrapper[]>>;
  multiPoll: boolean;
}

const SinglePollOptionBox = (props: IProps) => {
  function handleClick(checked: boolean) {
    //set checkbox to true
    props.setOptionsData((prevState) => {
      const newState = [...prevState];
      if (!props.multiPoll) {
        newState[props.pollQuestionIndex].pollOptionsWrapper.forEach(
          (pollOption) => {
            pollOption.checkBox = false;
          }
        );
      }
      newState[props.pollQuestionIndex].pollOptionsWrapper[
        props.pollOptionIndex
      ].checkBox = checked;
      return newState;
    });
  }

  return (
    <input
      onChange={(e) => handleClick(e.target.checked)}
      checked={props.pollOptionWrapper.checkBox}
      type={props.multiPoll ? 'radio' : 'checkbox'}
      className={
        'border-2 border-primary ' +
        (props.multiPoll
          ? 'checkbox checkbox-md checked:checkbox-primary'
          : 'radio radio-md checked:radio-primary')
      }
    />
  );
};

export default SinglePollOptionBox;
