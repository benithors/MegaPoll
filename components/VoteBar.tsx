import React, {useEffect, useState} from "react";
import {IPollOptionWrapper} from "../pages/poll/[id]";
import {definitions} from "../types/database";
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {getErrorMessage, isErrorWithMessage} from "../lib/errorUtil";

interface IProps {
    pollOptionWrapper: IPollOptionWrapper;
    user
    pollOptionWrapperArray: IPollOptionWrapper[]
}

const VoteBar = (props: IProps) => {


    function getVotePercentage(
        votes: number, pollOptionsWrapper: IPollOptionWrapper[]): number {
        if (votes === 0) {
            return 0;
        }
        return (100 * votes) / pollOptionsWrapper.reduce((a, b) => +a + +b.pollOptionVotes.votes, 0);
    }

    const [profile1, setProfile1] = useState<definitions['profiles']>();
    const [profile2, setProfile2] = useState<definitions['profiles']>();
    const [profile3, setProfile3] = useState<definitions['profiles']>();

    useEffect(() => {
        async function loadData() {
            const {data, error} = await supabaseClient.from<definitions['profiles']>('profiles').select('*').eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_1).single();
            if (isErrorWithMessage(error)) {
                getErrorMessage(error);
            } else {
                setProfile1(data);
            }
        }

        loadData();
    }, [props.pollOptionWrapper.pollOptionVotes.top_profile_1])


    useEffect(() => {
        async function loadData() {
            const {data, error} = await supabaseClient.from<definitions['profiles']>('profiles').select('*').eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_2).single();
            if (isErrorWithMessage(error)) {
                getErrorMessage(error);
            } else {
                setProfile2(data);
            }
        }

        loadData();
    }, [props.pollOptionWrapper.pollOptionVotes.top_profile_2])


    useEffect(() => {
        async function loadData() {
            const {data, error} = await supabaseClient.from<definitions['profiles']>('profiles').select('*').eq('id', props.pollOptionWrapper.pollOptionVotes.top_profile_3).single();
            if (isErrorWithMessage(error)) {
                getErrorMessage(error);
            } else {
                setProfile3(data);
            }
        }

        loadData();
    }, [props.pollOptionWrapper.pollOptionVotes.top_profile_3])
    return (
        <div>
            <div>{props.pollOptionWrapper.pollOption.option}</div>
            <div className={"flex flex-row justify-between"}>
                <div className={"w-2/4"}>
                    <progress
                        className="progress progress-primary"
                        value={getVotePercentage(props.pollOptionWrapper.pollOptionVotes.votes, props.pollOptionWrapperArray)}
                        max="100"
                    />
                </div>
                <div>
                </div>
                <div className="avatar-group -space-x-6">

                    {profile1 ?

                        <div className="avatar">
                            <div className="w-12">
                                <img src={profile1.avatar_url}/>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {profile2 ?

                        <div className="avatar">
                            <div className="w-12">
                                <img src={profile2.avatar_url}/>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    {profile3 ?
                        <div className="avatar">
                            <div className="w-12">
                                <img src={profile3.avatar_url}/>
                            </div>
                        </div>
                        :
                        <></>
                    }
                    <div className="avatar placeholder">
                        <div className="w-12 bg-neutral-focus text-neutral-content">
                            <span>+{props.pollOptionWrapper.pollOptionVotes.votes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default VoteBar;
