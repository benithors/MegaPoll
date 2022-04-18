import { NextApiRequest, NextApiResponse } from "next";
import { definitions } from "../../../types/database";
import { createClient } from "@supabase/supabase-js";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SERVICE_ROLE
  );
  let body = request.body;

  let ip = request.headers["x-real-ip"];
  body.forEach((value) => {
    value.ip = ip;
  });

  //by returning minimal we don't get the inserted row
  //we dont want the inserted row since, otherwise we would have to setup a select policy for row level security
  const { data, error } = await supabaseClient
    .from<definitions["poll_option_votes_2_users"]>("poll_option_votes_2_users")
    .insert(request.body, { returning: "minimal" });
  response.status(200).json({
    header: request.headers,
    body: request.body,
    query: request.query,
    cookies: request.cookies,
    data: data,
    error: error,
  });
}
