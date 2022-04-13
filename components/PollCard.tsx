import React from 'react'
import Image from "next/image";
import {definitions} from "../types/database";
import CountUp from 'react-countup';


interface IProps {
    poll: definitions["front_page"],
    openInstance,
    createFromTemplate,

}

const PollCard = (props: IProps) => {

    return (
        <div className={"p-4 bg-primary-content rounded-2xl flex flex-col"}>
            <div className={"px-3 mb-8 relative  flex flex-col h-32"}>
                <div className={"absolute z-20 right-1 top-1 -translate-y-5  bg-secondary text-1xl rounded-md p-1"}>
                    <CountUp  end={props.poll.votes} duration={3} /> Votes
                </div>
                <div className="shadow-xl h-full hover:scale-125 transition-all duration-200 ease-in-out transform ">
                    <Image
                        src={props.poll.cover_image}
                        alt={props.poll.poll_description}
                        objectFit={"cover"}
                        layout={"fill"}
                        className={"rounded-2xl"}
                    />
                </div>
            </div>
            <div className="items-center text-center flex flex-col grow">
                <div className={'grow'}>
                    <h2 className="card-title">{props.poll.poll_name}</h2>
                </div>
                <div className="card-actions" >
                    <button onClick={() => props.createFromTemplate(props.poll.poll_template)} className="btn btn-primary w-full">Copy template!</button>
                    <button onClick={() => props.openInstance(props.poll.poll_instance)} className="btn btn-primary w-full">Vote HERE!</button>
                </div>
            </div>
        </div>
    );
}

export default PollCard
