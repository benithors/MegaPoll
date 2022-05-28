import React from 'react';
import Image from 'next/image';
import { definitions } from '../types/database';
import CountUp from 'react-countup';
import Link from 'next/link';
import { createFromTemplate } from '../lib/pollUtil';
import { NextRouter } from 'next/router';

interface IProps {
  poll: definitions['front_page'];
  openInstance;
  router: NextRouter;
}

const PollPreviewCard = (props: IProps) => {
  return (
    <div
      className={
        'stream__thumbnail flex w-full flex-col bg-primary-content shadow-2xl  md:p-4'
      }
    >
      <div className={'relative mb-2 flex h-64 flex-col md:mb-8 md:px-3'}>
        <div
          className={
            'text-1xl absolute  right-1 top-1 z-10  -translate-y-5 rounded-md bg-gradient-to-r from-primary to-secondary p-1 md:-translate-y-10'
          }
        >
          <CountUp end={props.poll.votes} duration={3} /> Votes
        </div>
        <Link
          href={{
            pathname: '/[id]',
            query: { id: props.poll.poll_instance }
          }}
        >
          <button className={'relative h-full w-full'}>
            <Image
              src={props.poll.cover_image}
              alt={props.poll.poll_name}
              objectFit={'cover'}
              layout={'fill'}
              className={
                'md:transform-gpu md:rounded md:transition md:duration-300 md:hover:brightness-125 '
              }
            />
          </button>
        </Link>
      </div>
      <div className="flex grow flex-col items-center text-center">
        <div className={'sm:grow'}>
          <h2 className="card-title font-bold">{props.poll.poll_name}</h2>
        </div>
        <div className="flex w-full flex-col">
          <button
            onClick={() =>
              createFromTemplate(props.poll.poll_template, props.router)
            }
            className="btn glass mb-4 w-full rounded-none md:rounded-md"
          >
            Clone this Poll!
          </button>
          <button
            onClick={() => props.openInstance(props.poll.poll_instance)}
            className="btn btn-primary w-full rounded-none md:rounded-md"
          >
            Vote HERE!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PollPreviewCard;
