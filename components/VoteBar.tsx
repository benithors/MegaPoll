import React, { useEffect, useState } from "react";
import { IPollOptionWrapper } from "../pages/poll/[id]";
import { definitions } from "../types/database";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { getErrorMessage, isErrorWithMessage } from "../lib/errorUtil";
import { IconUser } from "@supabase/ui";

interface IProps {
  pollOptionWrapper: IPollOptionWrapper;
  user;
  pollOptionWrapperArray: IPollOptionWrapper[];
}
//TODO replace with nextjs image alt and value
function VoteBarProfile(props: { profile: definitions["profiles"] }) {
  return (
    <div className="tooltip" data-tip={props.profile.username}>
      <div className="w-12">
        <img
          className={"rounded-full"}
          src={props.profile.avatar_url}
          alt={props.profile.username}
        />
      </div>
    </div>
  );
}

const VoteBar = (props: IProps) => {
  function getVotePercentage(
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

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabaseClient
        .from<definitions["profiles"]>("profiles")
        .select("*")
        .eq("id", props.pollOptionWrapper.pollOptionVotes.top_profile_3)
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
  let votePercentage = getVotePercentage(
    props.pollOptionWrapper.pollOptionVotes.votes,
    props.pollOptionWrapperArray
  );
  return (
    <div>
      <div className={""}>{props.pollOptionWrapper.pollOption.option}</div>
      <div className={"flex flex-row justify-between"}>
        <div className={"flex w-2/4 flex-row items-center"}>
          <div
            className={
              "h-4 bg-primary pr-1 opacity-90 drop-shadow-2xl transition-[width]"
            }
            style={{ width: `${votePercentage}%` }}
          />
          <div className={"pl-1"}>{votePercentage.toFixed(1)}%</div>
          {props.pollOptionWrapper.pollOptionVotes.id}
        </div>
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
      </div>
    </div>
  );
};

export default VoteBar;
