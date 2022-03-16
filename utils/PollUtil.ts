import {isEmpty} from "./StringUtils";

export interface IPollQuestionCreation {
    pollQuestion: string,
    pollOptions: string[]
    multiPoll:boolean,
}




export function areThereValidOption(cleanedPollQuestionCreation: IPollQuestionCreation): boolean {
    return cleanedPollQuestionCreation != undefined && cleanedPollQuestionCreation.pollOptions != undefined && cleanedPollQuestionCreation.pollOptions.filter(value => !isEmpty(value)).length > 1;
}

export function cleanPollQuestionCreation(pollQuestionCreations: IPollQuestionCreation[]): IPollQuestionCreation[] {
    //remove all question that have an empty question string
    pollQuestionCreations = pollQuestionCreations.filter(pollQuestionCreation => !isEmpty(pollQuestionCreation.pollQuestion));
    pollQuestionCreations.forEach(pollQuestionCreation => {
        pollQuestionCreation.pollOptions = pollQuestionCreation.pollOptions.filter(option => !isEmpty(option));
    })
    return pollQuestionCreations;
}


export function copyPoll(original: IPollQuestionCreation[], copyTo: IPollQuestionCreation[]) {
    original.forEach(value => {
        let pollOptionCopy: string[] = [];
        value.pollOptions.forEach(pollOption => {
            pollOptionCopy.push(pollOption);
        })
        const pollQuestion:string = value.pollQuestion;
        const multiPoll = value.multiPoll;
        const temp: IPollQuestionCreation = {
            pollQuestion:  pollQuestion,
            pollOptions: pollOptionCopy,
            multiPoll: multiPoll
        }
        copyTo.push(temp);
    })

    return copyTo;
}
