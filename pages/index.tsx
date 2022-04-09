import Link from 'next/link'
import {supabaseClient} from '@supabase/supabase-auth-helpers/nextjs';
import {definitions} from "../types/database";
import Image from "next/image";
import React from "react";
import {isErrorWithMessage, toErrorWithMessage} from "../lib/errorUtil";
import {useRouter} from "next/router";
import Container from "../components/Container";
import CookieBar from "../components/CookieBar";


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


    async function createFromTemplate(id: number) {
        const {data, error} = await supabaseClient.rpc("fn_create_poll_from_template", {provided_poll_template: id});
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

    function openInstance(poll_instance: string) {
        router.push({
            pathname: '/poll/[id]',
            query: {id: poll_instance},
        })
    }

    return (
        <Container background={"bg-[url('/static/animatedBG.svg')]"}>

            <div className={" text-9xl font-bold mt-32 text-center"}>
                <text className={"text-primary"}>
                    Share Your {" "}
                </text>
                <text className={"text-accent"}>
                    Opinion
                </text>

            </div>
            <div className={"flex flex-row pt-16 self-start"}>
                {props.frontPage.map((value: definitions["front_page"], index) => {
                    return (
                        <div className={"px-3"} key={index}>
                            <div className="card w-full h-full bg-base-100 shadow-xl image-full">
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
                                    <h2 className="card-subtitle">{value.votes} total votes</h2>
                                    <div className="card-actions justify-end">
                                        <button onClick={event => createFromTemplate(value.poll_template)} className="btn btn-primary">Copy it!</button>
                                        <button onClick={event => openInstance(value.poll_instance)} className="btn btn-primary">Vote HERE!</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button className="btn btn-accent text-2xl self-center mt-14">
                <Link href="/create-poll">
                    CREATE POLL
                </Link>
            </button>


            <CookieBar/>
        </Container>

    )
}

export default Home

