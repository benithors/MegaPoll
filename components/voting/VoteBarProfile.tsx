import React from "react";
import { definitions } from "../../types/database";

import Image from "next/image";
interface IProps {
  profile: definitions["profiles"];
}

function VoteBarProfile(props: IProps) {
  return (
    <div className="tooltip h-12 w-12" data-tip={props.profile.username}>
      <div className="relative h-full w-full">
        <Image
          className={"rounded-full"}
          src={props.profile.avatar_url}
          alt={"Creator of poll " + props.profile.username}
          layout={"fill"}
        />
      </div>
    </div>
  );
}

export default VoteBarProfile;
