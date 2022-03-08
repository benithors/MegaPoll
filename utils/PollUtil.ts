import {isNotEmpty} from "./StringUtils";
import React from "react";
import {IPollQuestion} from "../pages/poll/[id]";

export function increaseArraySize( setArray,index: number, e: { target: { value: string; }; }) {
    setArray(prevState => {
        const pollOptions = [...prevState];
        let pollOption = pollOptions[index];
        pollOption = e.target.value;
        pollOptions[index] = pollOption;
        //we need to check if the last element in poll has some string in it
        //if this is so we need to append +1 on poll so that another poll can be added
        const lastPollOption = pollOptions[pollOptions.length - 1];
        if (isNotEmpty(lastPollOption)) {
            pollOptions.push('')
        }
        return pollOptions;
    });
}
