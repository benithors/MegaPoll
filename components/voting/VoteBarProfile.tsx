import React from "react";
import { definitions } from "../../types/database";

interface IProps {
  profile: definitions["profiles"];
}

//TODO replace with nextjs image alt and value
function VoteBarProfile(props: IProps) {
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

export default VoteBarProfile;
