import React, { useEffect, useState } from 'react';
import { IconUser } from '@supabase/ui';
import { definitions } from '../../types/database';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { getErrorMessage, isErrorWithMessage } from '../../lib/errorUtil';
import VoteBarProfile from './VoteBarProfile';
import { IPollOptionWrapper } from '../../lib/interfaces';

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  user;
}

const PollOptionVoters = (props: IProps) => {
  const [profile1, setProfile1] = useState<definitions['profiles']>();
  const [profile2, setProfile2] = useState<definitions['profiles']>();
  const [profile3, setProfile3] = useState<definitions['profiles']>();

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('*')
        .eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_1)
        .single();
      if (isErrorWithMessage(error)) {
        getErrorMessage(error);
      } else {
        setProfile1(data);
      }
    }

    if (!props.pollOptionWrapper.pollOptionVotes.top_profile_1) {
      return;
    }

    loadData();
  }, [props.pollOptionWrapper.pollOptionVotes.top_profile_1]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('*')
        .eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_2)
        .single();
      if (isErrorWithMessage(error)) {
        getErrorMessage(error);
      } else {
        setProfile2(data);
      }
    }

    if (!props.pollOptionWrapper.pollOptionVotes.top_profile_2) {
      return;
    }
    loadData();
  }, [props.pollOptionWrapper.pollOptionVotes.top_profile_2]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient
        .from<definitions['profiles']>('profiles')
        .select('*')
        .eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_3)
        .single();
      if (isErrorWithMessage(error)) {
        getErrorMessage(error);
      } else {
        setProfile3(data);
      }
    }

    if (!props.pollOptionWrapper.pollOptionVotes.top_profile_3) {
      return;
    }
    loadData();
  }, [props.pollOptionWrapper.pollOptionVotes.top_profile_3]);

  function displayUserIcon() {
    if (props.pollOptionWrapper.voted) {
      if (props.user) {
        //dont display the icon if the user icon is already displayed as top voter, otherwise we have duplicate icons
        if (
          (profile1 && profile1.id === props.user.id) ||
          (profile2 && profile2.id === props.user.id) ||
          (profile3 && profile3.id === props.user.id)
        ) {
          return false;
        } else {
          //if user is logged in, but no top voter, display the user icon
          return true;
        }
      } else {
        //if user is not logged in, but voted for something, display
        return true;
      }
    }
    return false;
  }

  return (
    <div className="flex -space-x-3">
      {profile1 && <VoteBarProfile profile={profile1} />}
      {profile2 && <VoteBarProfile profile={profile2} />}
      {profile3 && <VoteBarProfile profile={profile3} />}
      {displayUserIcon() && (
        <div className="tooltip" data-tip="YOU">
          <div className="w-12">
            <IconUser
              className={'rounded-full bg-secondary stroke-white stroke-2'}
              size={48}
            />
          </div>
        </div>
      )}

      <div className="placeholder avatar">
        <div className="text-2xs h-12 w-12 rounded-full bg-neutral-focus text-neutral-content">
          {props.pollOptionWrapper.pollOptionVotes.votes}
        </div>
      </div>
    </div>
  );
};

export default PollOptionVoters;
