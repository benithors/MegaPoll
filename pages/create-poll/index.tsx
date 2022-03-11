import React from 'react'
import CreatePollInput from "../../components/CreatePollInput";
import {isNotEmpty} from "../../utils/StringUtils";
import {supabase} from "../../utils/SupabaseClient";
import {getErrorMessage, isErrorWithMessage} from "../../utils/ErrorUtil";
import {useRouter} from "next/router";
import {useToasts} from "react-toast-notifications";


export interface IPollQuestionCreation {
    pollQuestion: string,
    pollOptions: string[]
}

export function areThereValidOption(cleanedPollQuestionCreation: IPollQuestionCreation[]):boolean {
    //todo validate if there are valid option
    //todo write proper test for this
    return true;
}

export function cleanPollQuestionCreation(cleanedPollQuestionCreation: IPollQuestionCreation[]):IPollQuestionCreation[] {
    //todo write test to clean all empty strings
    return cleanedPollQuestionCreation;
}

const CreatePoll = () => {
    const [pollQuestionFormData, setPollQuestionFormData] = React.useState<IPollQuestionCreation[]>([{
        pollQuestion: '',
        pollOptions: ['']

    }]);
    const router = useRouter();
    const {addToast} = useToasts();
    const [pollName, setPollName] = React.useState<string>();
    const [pollDescription, setPollDescription] = React.useState<string>();




    //TODO BT client side and server side validation
    async function submitPoll() {

        if(!pollName){
            addToast("Poll name missing!", {
                appearance: 'warning',
                autoDismiss: true,
            })
            return;
        }
        if(!pollDescription){
            addToast("Poll description missing!", {
                appearance: 'warning',
                autoDismiss: true,
            })
            return;
        }

        const iPollQuestionCreation = cleanPollQuestionCreation(pollQuestionFormData);

        if(!areThereValidOption(iPollQuestionCreation)){
            addToast("Add at least one question with poll options!", {
                appearance: 'warning',
                autoDismiss: true,
            })
            return;
        }



        const { data, error } = await supabase
            .rpc('fn_create_poll', {
                poll_name: pollName ,
                poll_description:pollDescription,
                poll_question_data:pollQuestionFormData
            })
        if (isErrorWithMessage(error)) {
            console.log(getErrorMessage(error))
            //todo
        } else {
       console.log(data);
        }

    }

    function increaseArraySize(setArray: React.Dispatch<React.SetStateAction<IPollQuestionCreation[]>>, index: number, e: { target: { value: string; }; }) {
        setArray(prevState => {
            let pollQuestionCreationArr = [...prevState];
            let pollQuestionCreation = pollQuestionCreationArr[index];
            pollQuestionCreation.pollQuestion = e.target.value;
            pollQuestionCreationArr[index] = pollQuestionCreation;
            //we need to check if the last element in poll has some string in it
            //if this is so we need to append +1 on poll so that another poll can be added
            const lastPollQuestions = pollQuestionCreationArr[pollQuestionCreationArr.length - 1];
            if (isNotEmpty(lastPollQuestions.pollQuestion) && pollQuestionCreationArr.length < 15) {
                let pollQuestionCreationTemp: IPollQuestionCreation = {
                    pollQuestion: '',
                    pollOptions: ['']
                };

                pollQuestionCreationArr.push(pollQuestionCreationTemp);
            }
            return pollQuestionCreationArr;
        });

    }

    return (

        <main className={"flex flex-col h-screen px-14 xl:px-64"}>

            <div className={"mt-16 text-4xl self-center"}>
                Create a Poll
            </div>

            <div className="form-control md:w-2/4">
                <label className="label">
                    <span className="label-text">Poll Name</span>
                </label>
                <input type="text" onChange={event => setPollName(event.target.value)} placeholder="Give your Poll a name" className="input input-bordered"/>

                <label className="label">
                    <span className="label-text">Describe the poll</span>
                </label>
                <textarea className="textarea h-24 textarea-bordered" onChange={event => setPollDescription(event.target.value)} placeholder="Describe what the poll is about"></textarea>

                <label className="label">
                    <span className="label-text">Cover Image of the Poll</span>
                </label>
                <input type="file"/>

                <div className={"mt-16 flex flex-col divide-y divide-white-200 h-fit"}>
                    {pollQuestionFormData.map((value, index) => {
                        return <div className="flex flex-col  pt-5  mb-8" key={index}>
                            <input
                                onChange={event => increaseArraySize(setPollQuestionFormData, index, event)}
                                type="text" placeholder="Type your question here" className="mb-5 input input-accent input-bordered input-lg w-full "/>
                            <CreatePollInput pollQuestionFormData={pollQuestionFormData} setPollOptions={setPollQuestionFormData} pollQuestionIndex={index}/>
                        </div>
                    })}

                </div>

                <button onClick={submitPoll} className="btn btn-primary">Submit Poll</button>
            </div>

        </main>


    );
}

export default CreatePoll
