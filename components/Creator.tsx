import React, {useEffect, useState} from 'react'
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {definitions} from "../types/database";
import {isErrorWithMessage} from "../lib/errorUtil";
import Image from "next/image";


interface IProps {
    creator: string
}

const Creator = (props: IProps) => {
    async function getAvatarForCreator() {
        const {data, error} = await supabaseClient.from<definitions["profiles"]>("profiles").select("avatar_url,username,follower_count").eq("id", props.creator).single();

        if (!isErrorWithMessage(error)) {
            setCreatorData({
                    avatar_url: data.avatar_url,
                    follower_count: data.follower_count,
                    username: data.username,
                    id: "0",
                }
            );
        } else {
            console.log(error)
        }
    }

    useEffect(() => {
        getAvatarForCreator();
    }, []);

    const [creatorData, setCreatorData] = useState<definitions["profiles"]>();

    return (
        <div className={"pt-16"}>
            {creatorData ?
                <div>
                    <h1>
                        Poll Creator: {creatorData.username}
                    </h1>
                    <Image
                        src={creatorData.avatar_url}
                        alt="Avatar of the poll creator"
                        width={75}
                        height={75}
                        className="rounded-full"
                    />
                </div>

                :

                <></>
            }

        </div>


    );
}

export default Creator

