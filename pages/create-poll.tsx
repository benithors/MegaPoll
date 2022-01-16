import React from 'react'
import Poll from "../components/Poll";


interface IProps {

}

const createPoll = (props: IProps) => {

    return (
        <main className={"flex flex-col items-center  h-screen"}>
            <div className={"mt-16 text-4xl"}>
                Create a Poll
            </div>


            <div className="form-control">
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
                    <input type="file"  />

                <div className={"mt-16"}>

                    <Poll>


                    </Poll>

                </div>



            </div>


        </main>


    );
}

export default createPoll
