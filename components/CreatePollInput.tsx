import React from 'react'
import {isNotEmpty} from "../utils/StringUtils";
import {increaseArraySize} from "../utils/PollUtil";


const CreatePollInput = () => {

    const [pollOptions, setPollOptions] = React.useState<string[]>(['']);





    return (
        <>
            {pollOptions.map((value, index) => {
                return <input
                    key={index}
                    onChange={event => increaseArraySize(setPollOptions,index, event)}
                    type="text" placeholder="Poll Option" className="input input-secondary input-bordered
                                  mt-2"/>
            })}
        </>


    );
}

export default CreatePollInput
