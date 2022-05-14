import { definitions } from '../types/database';

export interface IPollOptionWrapper {
  pollOptionVotes: definitions['poll_option_votes'];
  pollOption: definitions['poll_options'];
  voted: boolean;
  checkBox: boolean;
}

export interface PollOption {
  pollOptionVote: definitions['poll_option_votes'];
  pollOption: definitions['poll_options'];
  checkBox: boolean;
}
declare global {
  interface Window {
    adsbygoogle: any;
  }
}

window.adsbygoogle = window.adsbygoogle || {};

export interface IPollQuestionWrapper {
  pollQuestion: definitions['poll_questions'];
  pollOptionsWrapper: IPollOptionWrapper[];
  voted: boolean;
}

export interface IPollInstanceData {
  voted: boolean;
  poll_option_id: number;
  option: string;
  poll_question: number;
  poll_option_votes_id: number;
  poll_option_votes_instance: string;
  poll_option_votes_votes: number;
  top_profile_1: string;
  top_profile_2: string;
  top_profile_3: string;
}
