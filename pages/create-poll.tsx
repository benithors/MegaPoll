import React from 'react'
import CreatePollInput from "../components/CreatePollInput";
import {isNotEmpty} from "../utils/StringUtils";
import {increaseArraySize} from "../utils/PollUtil";


const createPoll = () => {

    const [pollQuestions, setPollQuestions] = React.useState<string[]>(['fituasd']);



    return (

        <main className={"flex flex-col h-screen px-14 xl:px-64"}>

            <div className={"mt-16 text-4xl self-center"}>
                Create a Poll
            </div>

            <div className="form-control md:w-2/4">
                <label className="label">
                    <span className="label-text">Poll Name</span>
                </label>
                <input type="text" placeholder="Give your Poll a name" className="input input-bordered"/>

                <label className="label">
                    <span className="label-text">Describe the poll</span>
                </label>
                <textarea className="textarea h-24 textarea-bordered" placeholder="Describe what the poll is about"></textarea>

                <label className="label">
                    <span className="label-text">Cover Image of the Poll</span>
                </label>
                <input type="file"/>

                <div className={"mt-16 flex flex-col divide-y divide-white-200 h-fit"}>
                    {pollQuestions.map((value, index) => {

                        return <div className="flex flex-col  pt-5  mb-8">
                            <input
                                key={index}
                                onChange={event => increaseArraySize(setPollQuestions,index, event)}
                                type="text" placeholder="Type your question here" className="mb-5 input input-accent input-bordered input-lg w-full "/>
                            <CreatePollInput/>
                        </div>

                    })}


                </div>

                <input type="submit"/>
            </div>

        </main>


    );
}

export default createPoll
