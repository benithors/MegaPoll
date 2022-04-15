import React from "react";
import Image from "next/image";
import { definitions } from "../types/database";
import CountUp from "react-countup";
import Link from "next/link";

interface IProps {
  poll: definitions["front_page"];
  openInstance;
  createFromTemplate;
}

const PollCard = (props: IProps) => {
  return (
    <div
      className={
        "flex w-full flex-col rounded-2xl md:bg-primary-content md:p-4"
      }
    >
      <div className={"relative mb-2 flex h-64 flex-col md:mb-8 md:px-3"}>
        <div
          className={
            "text-1xl absolute right-1 top-1 z-10  -translate-y-5 rounded-md bg-secondary p-1 md:-translate-y-10"
          }
        >
          <CountUp end={props.poll.votes} duration={3} /> Votes
        </div>
        <Link
          href={{
            pathname: "/poll/[id]",
            query: { id: props.poll.poll_instance },
          }}
        >
          <Image
            src={props.poll.cover_image}
            alt={props.poll.poll_description}
            objectFit={"cover"}
            layout={"fill"}
            className={"rounded"}
          />
        </Link>
      </div>
      <div className="flex grow flex-col items-center text-center">
        <div className={"sm:grow"}>
          <h2 className="card-title font-bold">{props.poll.poll_name}</h2>
        </div>
        <div className="flex w-full flex-col">
          <button
            onClick={() => props.createFromTemplate(props.poll.poll_template)}
            className="btn glass mb-4 w-full"
          >
            Copy template!
          </button>
          <button
            onClick={() => props.openInstance(props.poll.poll_instance)}
            className="btn btn-primary w-full"
          >
            Vote HERE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollCard;