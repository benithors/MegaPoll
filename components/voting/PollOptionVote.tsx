import React, { useEffect } from 'react';
import VoteBar from './VoteBar';
import { IPollOptionWrapper, IPollQuestionWrapper } from '../../lib/interfaces';
import PollOptionVoters from './PollOptionVoters';
import SinglePollOptionBox from './SinglePollOptionBox';
import { definitions } from '../../types/database';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  pollQ: IPollQuestionWrapper;
  user;
  setOptionsData: React.Dispatch<React.SetStateAction<IPollQuestionWrapper[]>>;
  pollOptionIndex: number;
  pollQuestionIndex: number;
}

const PollOptionVote = (props: IProps) => {
  const handleNewOptionsUpdate = (payload: {
    commit_timestamp?: string;
    eventType?: 'INSERT' | 'UPDATE' | 'DELETE';
    schema?: string;
    table?: string;
    new: definitions['poll_option_votes'];
    old?: any;
    errors?: string[];
  }) => {
    props.setOptionsData((prevState) => {
      let prevStatePollQuestionWrapper = prevState.slice();
      prevStatePollQuestionWrapper[props.pollQuestionIndex].pollOptionsWrapper[
        props.pollOptionIndex
      ].pollOptionVotes = {
        poll_option: payload.new.poll_option,
        id: payload.new.id,
        votes: payload.new.votes,
        poll_instance: payload.new.poll_instance,
        top_profile_1: payload.new.top_profile_1,
        top_profile_2: payload.new.top_profile_2,
        top_profile_3: payload.new.top_profile_3
      };
      return [...prevStatePollQuestionWrapper];
    });
  };

  let realtimeSub;
  useEffect(() => {
    realtimeSub = supabaseClient
      .from(
        'poll_option_votes:id=eq.' + props.pollOptionWrapper.pollOptionVotes.id
      )
      .on('UPDATE', (payload) => {
        handleNewOptionsUpdate(payload);
      })
      .subscribe();

    return () => {
      supabaseClient.removeSubscription(realtimeSub).catch((e) => {
        console.log('error removing subscription', e);
      });
    };
  }, []);
  return (
    <div className={'border-t-2 '}>
      <div>{props.pollOptionWrapper.pollOption.option}</div>
      <div className={'flex w-full flex-row items-center'}>
        <div className={'w-full ' + (!props.pollQ.voted && 'invisible')}>
          <VoteBar
            user={props.user}
            pollOptionWrapper={props.pollOptionWrapper}
            pollOptionWrapperArray={props.pollQ.pollOptionsWrapper}
          />
        </div>
        <div className={'flex h-14 w-2/6 flex-row justify-end'}>
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
