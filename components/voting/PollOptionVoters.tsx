import React, { useEffect, useState } from "react";
import { IconUser } from "@supabase/ui";
import { definitions } from "../../types/database";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { getErrorMessage, isErrorWithMessage } from "../../lib/errorUtil";
import VoteBarProfile from "./VoteBarProfile";
import { IPollOptionWrapper } from "../../lib/interfaces";

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  user;
}

const PollOptionVoters = (props: IProps) => {
  const [profile1, setProfile1] = useState<definitions["profiles"]>();
  const [profile2, setProfile2] = useState<definitions["profiles"]>();
  const [profile3, setProfile3] = useState<definitions["profiles"]>();

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient
        .from<definitions["profiles"]>("profiles")
        .select("*")
        .eq("id", props.pollOptionWrapper.pollOptionVotes.top_profile_1)
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
        .from<definitions["profiles"]>("profiles")
        .select("*")
        .eq("id", props.pollOptionWrapper.pollOptionVotes.top_profile_2)
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

  function getVoteNumber() {
    let votes = props.pollOptionWrapper.pollOptionVotes.votes;
    if (profile1) {
      votes -= 1;
    }
    if (profile2) {
      votes -= 1;
    }
    if (profile3) {
      votes -= 1;
    }
    return votes;
  }

  function displayUserIcon() {
    if (props.pollOptionWrapper.voted) {
      if (props.user) {
        if (
          (profile1 && profile1.id === props.user.id) ||
          (profile2 && profile2.id === props.user.id) ||
          (profile3 && profile3.id === props.user.id)
        ) {
          return false;
        } else {
          return true;
        }
      } else {
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
              className={"rounded-full bg-secondary stroke-white stroke-2"}
              size={48}
            />
          </div>
        </div>
      )}

      {getVoteNumber() >= 1 && (
        <div className="placeholder avatar">
          <div className="h-12 w-12 rounded-full bg-neutral-focus text-neutral-content">
            <span>+{getVoteNumber()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PollOptionVoters;
