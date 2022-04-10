import React from 'react'
import Image from "next/image";
import {definitions} from "../types/database";
import {IconThumbsUp} from "@supabase/ui";


interface IProps {
    poll: definitions["front_page"],
    openInstance,
    createFromTemplate,

}

const PollCard = (props: IProps) => {

    return (
        <div className={"px-3 mb-8 indicator "}>
            <span className="indicator-item badge badge-secondary">{props.poll.votes} votes</span>
            <div className="card  bg-primary-content shadow-xl">
                <figure className="px-10 pt-10">
                    <Image
                        src={props.poll.cover_image}
                        alt={props.poll.poll_description}
                        width={500}
                        height={500}
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title flex-1">{props.poll.poll_name}</h2>
                    <div className="card-actions justify-end">
                        <button onClick={event => props.createFromTemplate(props.poll.poll_template)} className="btn btn-primary w-full">Copy it!</button>
                        <button onClick={event => props.openInstance(props.poll.poll_instance)} className="btn btn-primary w-full">Vote HERE!</button>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default PollCard
