import React from "react";
import Image from "next/image";
import { definitions } from "../types/database";
import CountUp from "react-countup";
import Link from "next/link";
import { createFromTemplate } from "../lib/pollUtil";
import { NextRouter } from "next/router";

interface IProps {
  poll: definitions["front_page"];
  openInstance;
  router: NextRouter;
}

const PollPreviewCard = (props: IProps) => {
  return (
    <div
      className={
        "flex w-full flex-col shadow-2xl transition-all  md:transform md:p-4 md:duration-500 md:ease-in-out md:hover:scale-105 md:hover:bg-accent-content md:hover:bg-opacity-50"
      }
    >
      <div className={"relative mb-2 flex h-64 flex-col md:mb-8 md:px-3"}>
        <div
          className={
            "text-1xl absolute  right-1 top-1 z-10  -translate-y-5 rounded-md bg-secondary p-1 md:-translate-y-10"
          }
        >
          <CountUp end={props.poll.votes} duration={3} /> Votes
        </div>
        <button>
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
              className={
                "rounded md:transform-gpu md:transition md:duration-300 md:ease-in-out md:hover:scale-125 md:hover:brightness-125 "
              }
            />
          </Link>
        </button>
      </div>
      <div className="flex grow flex-col items-center text-center">
        <div className={"sm:grow"}>
          <h2 className="card-title font-bold">{props.poll.poll_name}</h2>
        </div>
        <div className="flex w-full flex-col">
          <button
            onClick={() =>
              createFromTemplate(props.poll.poll_template, props.router)
            }
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

export default PollPreviewCard;
