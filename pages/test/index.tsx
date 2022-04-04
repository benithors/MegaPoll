import React, { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../../types/database";
import { isEmpty } from "../../lib/stringUtils";
import { useUser } from "@supabase/supabase-auth-helpers/react";

interface IProps {}
const index = (props: IProps) => {
  const { user, error } = useUser();
  async function getData() {
    const params = {
      poll_instance: 30,
      user_profile: "31106b11-4e35-48f0-a8c3-fd8234adc017",
      user_cookie_identifier: null,
    };
    console.log("````", params);
    const { data, error } = await supabaseClient.rpc(
      "fn_get_question_data",
      params
    );

    console.log(data);
    setDataObj(data);
  }

  useEffect(() => {
    getData();
  }, []);
  const [dataObj, setDataObj] = useState(null);
  return <div>sd : {JSON.stringify(dataObj)}</div>;
};

export default index;
