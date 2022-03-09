import React from 'react'
import CreatePollInput from "../components/CreatePollInput";
import {isNotEmpty} from "../utils/StringUtils";
import {definitions} from "../types/database";
import {supabase} from "../utils/SupabaseClient";
import {getErrorMessage, isErrorWithMessage} from "../utils/ErrorUtil";
import {useRouter} from "next/router";


export interface IPollQuestionCreation {
    pollQuestion: string,
    pollOptions: string[]
}

const CreatePoll = () => {
    const [pollQuestionFormData, setPollQuestionFormData] = React.useState<IPollQuestionCreation[]>([{
        pollQuestion: '',
        pollOptions: ['']

    }]);
    const router = useRouter()

    const [pollName, setPollName] = React.useState<string>();
    const [pollDescription, setPollDescription] = React.useState<string>();


    //TODO BT need to write a postgres function with client side and server side validation
    async function submitPoll() {
          const {data, error} = await supabase.from<definitions["polls"]>("polls")
              .insert(
                  [
                      {
                          poll_name: pollName,
                          poll_description: pollDescription
                      }
                  ]);
          if (isErrorWithMessage(error)) {
              console.log(getErrorMessage(error))
              //todo
          } else {
              const pollId = data[0].id;
              let insertDataArr = [];
              for (const pollQuestion of pollQuestionFormData) {
                  if(isNotEmpty(pollQuestion.pollQuestion)){
                      const insertData = {
                          poll: pollId,
                          question: pollQuestion.pollQuestion
                      };
                      insertDataArr.push(insertData)
                      const {data, error} = await supabase.from<definitions["poll_questions"]>("poll_questions")
                          .insert(
                              [
                                  insertData
                              ]);

                      const pollQuestionId = data[0].id;
                      console.log(pollQuestionId);
                      if (isErrorWithMessage(error)) {
                          console.log(getErrorMessage(error))
                          //todo
                      }else{
                          let optionInsertData = [];
                          pollQuestion.pollOptions.forEach(pollOption => {
                              if(isNotEmpty(pollOption)){
                                  const insertData = {
                                      poll_question: pollQuestionId,
                                      option: pollOption
                                  };
                                  optionInsertData.push(insertData)
                              }
                          })
                          const {data, error} = await supabase.from<definitions["poll_options"]>("poll_options")
                              .insert(optionInsertData);
                          if (isErrorWithMessage(error)) {
                              console.log(getErrorMessage(error))
                              //todo
                          }else{
                              await router.push('/poll/'+pollId)
                          }
                      }
                  }

              }
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
