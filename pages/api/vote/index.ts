import { NextApiRequest, NextApiResponse } from 'next';
import { definitions } from '../../../types/database';
import { createClient } from '@supabase/supabase-js';
import { sha256 } from 'crypto-hash';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SERVICE_ROLE
  );
  let body = request.body;

  let ip;
  if (process.env.LOCAL === 'true') {
    ip = '123178231823' + Math.random();
  } else {
    ip = request.headers['x-real-ip'];
  }

  let s = await sha256(ip);
  body.forEach((value) => {
    value.ip = s;
  });
  //by returning minimal we don't get the inserted row
  //we dont want the inserted row since, otherwise we would have to setup a select policy for row level security
  await supabaseClient
    .from<definitions['poll_option_votes_2_users']>('poll_option_votes_2_users')
    .insert(body, { returning: 'minimal' });
  response.status(200).json({});
}
