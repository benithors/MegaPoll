import React, { useEffect } from "react";
import CreatePollInput from "../components/CreatePollInput";
import { isEmpty } from "../lib/stringUtils";
import { Auth, useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { getErrorMessage, isErrorWithMessage } from "../lib/errorUtil";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import {
  areThereValidOption,
  cleanPollQuestionCreation,
  copyPoll,
  IPollQuestionCreation,
} from "../lib/pollUtil";
import { uuid } from "@supabase/gotrue-js/dist/main/lib/helpers";
import Container from "../components/Container";
import { BASE_PATH } from "../lib/constants";
import Title from "../components/Title";
import { IconXCircle } from "@supabase/ui";
import Compressor from "compressorjs";

const CreatePoll = () => {
  const [pollQuestionFormData, setPollQuestionFormData] = React.useState<
    IPollQuestionCreation[]
  >([getEmptyPollItem()]);
  const { user, error } = useUser();
  const router = useRouter();
  const { addToast } = useToasts();
  const [pollName, setPollName] = React.useState<string>();
  const [pollDescription, setPollDescription] = React.useState<string>();
  const [selectedImage, setSelectedImage] = React.useState(null);

  function areQuestionsValid(
    iPollQuestionCreations: IPollQuestionCreation[]
  ): boolean {
    let isValid = true;
    if (iPollQuestionCreations.length < 1) {
      return false;
    }
    for (let iPollQuestionCreation of iPollQuestionCreations) {
      if (!areThereValidOption(iPollQuestionCreation)) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  //TODO server side validation
  async function submitPoll() {
    if (!pollName) {
      addToast("Poll name missing!", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    if (!pollDescription) {
      addToast("Poll description missing!", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    let copy = [];
    copyPoll(pollQuestionFormData, copy);

    copy = cleanPollQuestionCreation(copy);

    if (!areQuestionsValid(copy)) {
      addToast("Every question must have at least two poll options!", {
        appearance: "warning",
        autoDismiss: true,
      });
      return;
    }
    let coverImage;

    if (selectedImage) {
      const path = uuid();
      new Compressor(selectedImage, {
        async success(result) {
          let uploadImageResp = await supabaseClient.storage
            .from("pollimages")
            .upload(path, result);
          if (uploadImageResp.data) {
            const { publicURL, error } = supabaseClient.storage
              .from("pollimages")
              .getPublicUrl(path);
            coverImage = publicURL;
            if (isErrorWithMessage(error)) {
              console.log(error);
            }
          }
          // Send the compressed image file to server with XMLHttpRequest.
          const params = {
            poll_name: pollName,
            poll_description: pollDescription,
            user_id: user.id,
            cover_image: isEmpty(coverImage) ? null : coverImage,
            poll_question_data: copy,
          };
          // eslint-disable-next-line no-redeclare
          let createPollResp = await supabaseClient.rpc(
            "fn_create_poll",
            params
          );
          if (isErrorWithMessage(createPollResp.error)) {
            console.log(getErrorMessage(createPollResp.error));
            addToast("Something went wrong, try it again later!", {
              appearance: "error",
              autoDismiss: true,
            });
          } else {
            //clear session storage
            sessionStorage.removeItem("pollQuestions");
            sessionStorage.removeItem("pollName");
            sessionStorage.removeItem("pollDescription");
            sessionStorage.removeItem("selectedImage");

            router.push({
              pathname: "/poll/[id]",
              query: { id: createPollResp.data },
            });
          }
        },
        quality: 0.5,
        // The compression process is asynchronous,
        // which means you have to access the `result` in the `success` hook function.
        error(err) {
          console.log("alarm" + err.message);
          addToast("Please only upload images!", {
            appearance: "warning",
            autoDismiss: true,
          });
          return;
        },
      });
    }
  }

  useEffect(() => {
    //assign poll name from the session storage
    if (sessionStorage.getItem("pollName")) {
      setPollName(sessionStorage.getItem("pollName"));
    }
    //assign poll description from the session storage
    if (sessionStorage.getItem("pollDescription")) {
      setPollDescription(sessionStorage.getItem("pollDescription"));
    }

    //assign poll questions from the session storage
    if (sessionStorage.getItem("pollQuestions")) {
      setPollQuestionFormData(
        JSON.parse(sessionStorage.getItem("pollQuestions"))
      );
    }

    //assign poll image from the session storage
    if (sessionStorage.getItem("pollImage")) {
      setSelectedImage(sessionStorage.getItem("pollImage"));
    }
  }, []);

  useEffect(() => {
    //save pollName in session storage for later use
    if (pollName) {
      sessionStorage.setItem("pollName", pollName);
    }
  }, [pollName]);

  useEffect(() => {
    //save pollDescription in session storage for later use
    if (pollDescription) {
      sessionStorage.setItem("pollDescription", pollDescription);
    }
  }, [pollDescription]);

  useEffect(() => {
    //save pollQuestions in session storage for later use
    if (pollQuestionFormData) {
      sessionStorage.setItem(
        "pollQuestions",
        JSON.stringify(pollQuestionFormData)
      );
    }
  }, [pollQuestionFormData]);

  function getEmptyPollItem() {
    return {
      pollQuestion: "",
      pollOptions: [""],
      multiPoll: false,
    };
  }

  function increaseArraySize(index: number, e: { target: { value: string } }) {
    setPollQuestionFormData((prevState) => {
      let pollQuestionCreationArr = [...prevState];
      let pollQuestionCreation = pollQuestionCreationArr[index];
      pollQuestionCreation.pollQuestion = e.target.value;
      pollQuestionCreationArr[index] = pollQuestionCreation;
      //we need to check if the last element in poll has some string in it
      //if this is so we need to append +1 on poll so that another poll can be added
      const lastPollQuestions =
        pollQuestionCreationArr[pollQuestionCreationArr.length - 1];
      if (
        !isEmpty(lastPollQuestions.pollQuestion) &&
        pollQuestionCreationArr.length < 15
      ) {
        pollQuestionCreationArr.push(getEmptyPollItem());
      }
      return pollQuestionCreationArr;
    });
  }

  function changeMultiPollState(index: number) {
    let pollQuestionCreationArr = [...pollQuestionFormData];
    let pollQuestionCreation = pollQuestionCreationArr[index];
    pollQuestionCreation.multiPoll = !pollQuestionCreation.multiPoll;
    pollQuestionCreationArr[index] = pollQuestionCreation;
    setPollQuestionFormData(pollQuestionCreationArr);
  }

  function deleteEntry(providedIndex: number) {
    //check if there is at least one element left
    console.log(providedIndex);
    console.log(pollQuestionFormData.length, "length");
    if (providedIndex === 0) {
      //clear data at index 0
      setPollQuestionFormData((prevState) => {
        let pollQuestionCreationArr = [...prevState];
        pollQuestionCreationArr[0] = getEmptyPollItem();
        return pollQuestionCreationArr;
      });
      return;
    }

    if (pollQuestionFormData.length === 2) {
      setPollQuestionFormData((prevState) => {
        let pollQuestionCreationArr = [...prevState];
        pollQuestionCreationArr[providedIndex] = getEmptyPollItem();
        return pollQuestionCreationArr;
      });
      return;
    } else {
      //delete the poll question at index
      let pollQuestionCreationArr = [...pollQuestionFormData];
      pollQuestionCreationArr.splice(providedIndex, 1);
      setPollQuestionFormData(pollQuestionCreationArr);
    }
  }

  return (
    <Container>
      <Title firstPart={"Share Your"} secondPart={"Questions"} />

      <div className="form-control  md:flex md:flex-col md:items-center">
        <label className="label">
          <span className="label-text">Poll Name</span>
        </label>
        <input
          type="text"
          defaultValue={pollName || ""}
          onChange={(event) => setPollName(event.target.value)}
          placeholder="Give your Poll a name"
          className="input-bordered input md:w-2/3"
        />

        <label className="label">
          <span className="label-text">Describe the poll</span>
        </label>
        <textarea
          defaultValue={pollDescription || ""}
          className="textarea-bordered textarea h-24 md:w-2/3"
          onChange={(event) => setPollDescription(event.target.value)}
          placeholder="Describe what the poll is about"
        />

        <label className="label">
          <span className="label-text">Cover Image of the Poll</span>
        </label>
        <input
          type="file"
          defaultValue={selectedImage || null}
          onChange={(event) => setSelectedImage(event.target.files[0])}
          name={"Cover Image"}
        />
        <div className={"w-2/3"}>
          <img
            src={selectedImage ? URL.createObjectURL(selectedImage) : null}
            alt={selectedImage ? selectedImage.name : null}
          />
        </div>
        <div
          className={
            "divide-white-200 mt-16 flex h-fit flex-col divide-y md:w-2/3"
          }
        >
          {pollQuestionFormData.map((value, index) => {
            return (
              <div key={index} className={"flex flex-row"}>
                <div className="mb-8 flex flex-grow flex-col pt-5" key={index}>
                  <input
                    value={value.pollQuestion || ""}
                    onChange={(event) => increaseArraySize(index, event)}
                    type="text"
                    placeholder="Type your question here"
                    className="input-bordered input-accent input input-lg mb-5 w-full "
                  />
                  <CreatePollInput
                    pollQuestionFormData={pollQuestionFormData}
                    setPollOptions={setPollQuestionFormData}
                    pollQuestionIndex={index}
                  />
                  <div className={"mt-4"}>
                    <input
                      onChange={() => changeMultiPollState(index)}
                      checked={pollQuestionFormData[index].multiPoll}
                      type="checkbox"
                      value={
                        pollQuestionFormData[index].multiPoll ? "true" : "false"
                      }
                      className="checkbox checkbox-md mr-4"
                    />
                    Are multiple answers allowed?
                  </div>
                  <button
                    onClick={() => deleteEntry(index)}
                    className={"absolute flex -translate-y-5 flex-col"}
                  >
                    <IconXCircle className={"stroke-red-500 stroke-2"} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {user ? (
          <div className={"flex w-full flex-col items-center"}>
            <button
              onClick={submitPoll}
              className="bg-red btn btn-primary btn-wide"
            >
              Submit Poll
            </button>
          </div>
        ) : (
          <div className={"flex flex-col"}>
            <text>
              You need to be logged in before creating a Poll {BASE_PATH}
            </text>
            {error && <p>{error.message}</p>}
            <Auth
              redirectTo={BASE_PATH + router.pathname}
              supabaseClient={supabaseClient}
              providers={["twitch"]}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
              onlyThirdPartyProviders={true}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default CreatePoll;
