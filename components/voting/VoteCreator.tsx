import React, { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../../types/database";
import { isErrorWithMessage } from "../../lib/errorUtil";
import Image from "next/image";

interface IProps {
  creator: string;
}

const VoteCreator = (props: IProps) => {
  async function getAvatarForCreator() {
    const { data, error } = await supabaseClient
      .from<definitions["profiles"]>("profiles")
      .select("*")
      .eq("id", props.creator)
      .single();

    if (!isErrorWithMessage(error)) {
      setCreatorData({
        avatar_url: data.avatar_url,
        username: data.username,
        created_at: data.created_at,
        id: props.creator,
      });
    } else {
      console.error(error);
      //todo error handling
    }
  }

  useEffect(() => {
    getAvatarForCreator();
  }, []);

  const [creatorData, setCreatorData] = useState<definitions["profiles"]>();

  return (
    <div className={"pt-16"}>
      {creatorData ? (
        <div className={"tooltip text-center"} data-tip={creatorData.username}>
          <h1 className={"text-primary"}>Poll Creator</h1>
          <Image
            src={creatorData.avatar_url}
            alt="Avatar of the poll creator"
            width={75}
            height={75}
            className="rounded-full"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default VoteCreator;
