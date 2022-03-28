import Link from 'next/link'
import {supabaseClient} from '@supabase/supabase-auth-helpers/nextjs';
import {definitions} from "../types/database";
import Image from "next/image";
import React from "react";
import {isErrorWithMessage, toErrorWithMessage} from "../lib/errorUtil";
import {useRouter} from "next/router";
import Container from "../components/Container";


// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
    const {data, error} = await supabaseClient.from<definitions["front_page"]>("front_page").select("*");

        //todo BT handle error
    return {
        props: {
            frontPage: data,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 3600 seconds
        revalidate: 3600, // In seconds
    }
}

interface IProps {
    frontPage: definitions["front_page"][];

}


function Home(props: IProps) {


    const router = useRouter();


    async function createFromTemplate(uuid: string) {
        const {data, error} = await supabaseClient.rpc("fn_create_poll_from_template", {polluuid: uuid});
        if (isErrorWithMessage(error)) {
            console.log(toErrorWithMessage(error));
            //todo bt add error for user
            return;
        }

        console.log(data);


        router.push({
            pathname: '/poll/[id]',
            query: {id: data.toString()},

        })
    }

    return (
        <Container>
            <div className={"text-8xl"}>
                <h1>
                    Social Poll
                </h1>
            </div>
            <div className={"mt-16 "}>

                <Link href="/create-poll">
                    <button className="btn btn-ghost text-2xl">HOW TO USE?</button>
                </Link>

                <Link href="/create-poll">
                    <button className="btn btn-primary text-2xl">CREATE POLL</button>
                </Link>
            </div>
            <div className={"flex flex-row pt-16"}>
                {props.frontPage.map((value: definitions["front_page"], index) => {
                    return (
                        <div className={"px-3"} key={index}>
                            <div className="card w-96 bg-base-100 shadow-xl image-full">
                                <figure className={"row-start-1"}>
                                    <Image
                                        src={value.cover_image}
                                        alt={value.poll_description}
                                        width={500}
                                        height={500}
                                    />
                                </figure>
                                <div className="card-body self-end">
                                    <h2 className="card-title">{value.poll_name}</h2>
                                    <div className="card-actions justify-end">
                                        <button onClick={event => createFromTemplate(value.uuid)} className="btn btn-primary">Copy Poll Template</button>
                                        <button className="btn btn-primary">Look at Template</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>

    )
}

export default Home
