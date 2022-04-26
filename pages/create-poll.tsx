import React, { useCallback, useEffect } from "react";
import { IconArrowDownCircle, IconXCircle } from "@supabase/ui";
import Image from "next/image";
import CreatePollInput from "../components/CreatePollInput";
import { isEmpty } from "../lib/stringUtils";
import { Auth, useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { isErrorWithMessage } from "../lib/errorUtil";
import { useRouter } from "next/router";
import { useToasts } from "react-toast-notifications";
import {
  areThereValidOption,
  cleanPollQuestionCreation,
  copyPoll,
  IPollQuestionCreation,
} from "../lib/pollUtil";
import { uuid } from "@supabase/gotrue-js/dist/main/lib/helpers";
import Container from "../components/structure/Container";
import { BASE_PATH } from "../lib/constants";
import Title from "../components/generic/Title";
import Compressor from "compressorjs";
import { useDropzone } from "react-dropzone";
import { definitions } from "../types/database";

const CreatePoll = () => {
  const [pollQuestionFormData, setPollQuestionFormData] = React.useState<
    IPollQuestionCreation[]
  >([getEmptyPollItem()]);
  const { user, error } = useUser();
  const router = useRouter();
  const { addToast } = useToasts();
  const [pollName, setPollName] = React.useState<string>();
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>();
  const [allCategories, setAllCategories] =
    React.useState<definitions["poll_categories"][]>();

  async function loadCategories() {
    let resp = await supabaseClient
      .from<definitions["poll_categories"]>("poll_categories")
      .select("*");
    console.log(resp);
    if (isErrorWithMessage(resp.error)) {
      console.log(resp.error);
    } else {
      setAllCategories(resp.data);
    }
  }
  useEffect(() => {
    async function loadData() {
      await loadCategories();
    }

    loadData();
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".jpg,.jpeg,.png",
    maxSize: 5000000,
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections[0]) {
        fileRejections[0].errors.forEach((error) => {
          addToast(error.message, { appearance: "error", autoDismiss: true });
        });
        return;
      }
      const file = acceptedFiles[0];
      const compressor = new Compressor(file, {
        quality: 0.5,
        success(result) {
          setSelectedImage(result);
        },
        error(err) {
          console.log(err);
        },
      });
    },
  });

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
    if (!selectedCategory) {
      addToast("Category missing!", {
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
      let uploadImageResp = await supabaseClient.storage
        .from("pollimages")
        .upload(path, selectedImage);
      if (uploadImageResp.data) {
        const { publicURL, error } = supabaseClient.storage
          .from("pollimages")
          .getPublicUrl(path);
        coverImage = publicURL;
        if (isErrorWithMessage(error)) {
          //todo add error handling
          console.log(error);
        }
      }
    }

    const params = {
      poll_name: pollName,
      poll_category: selectedCategory,
      user_id: user.id,
      cover_image: isEmpty(coverImage) ? null : coverImage,
      poll_question_data: copy,
    };
    let createPollResp = await supabaseClient.rpc("fn_create_poll", params);
    if (isErrorWithMessage(createPollResp.error)) {
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
  }

  useEffect(() => {
    //assign poll name from the session storage
    if (sessionStorage.getItem("pollName")) {
      setPollName(sessionStorage.getItem("pollName"));
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

      <div className="flex w-full flex-col items-center">
        <label className="label">
          <span className="label-text">Poll Name</span>
        </label>
        <input
          type="text"
          defaultValue={pollName || ""}
          onChange={(event) => setPollName(event.target.value)}
          placeholder="Give your Poll a name"
          className="input-bordered input w-11/12 bg-opacity-30 md:w-2/3"
        />
        <label className={"label"}>Category</label>
        <select
          defaultValue={"DEFAULT"}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="input-bordered input select w-11/12 bg-opacity-30 md:w-2/3"
        >
          <option className={"bg-primary-content"} disabled value={"DEFAULT"}>
            Pick your Poll Category
          </option>

          {allCategories &&
            allCategories.map((category, index) => (
              <option
                className={"bg-primary-content"}
                key={index}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
        </select>

        <label className="label">
          <span className="label-text">Cover Image of the Poll</span>
        </label>
        <section
          className={"flex w-full flex-row items-center justify-center "}
        >
          <div
            className={
              "input-bordered input  flex h-32 w-11/12 flex-row items-center justify-center bg-opacity-30 md:w-2/3 " +
              (isDragActive && " border-accent")
            }
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <IconArrowDownCircle
                className={"animate-bounce stroke-accent stroke-2 shadow-2xl"}
                size={40}
              />
            ) : (
              <p>
                Drag and drop your cover image here, or click to select image
              </p>
            )}
          </div>
        </section>

        {selectedImage && (
          <div className={"relative mt-3 h-full w-2/3"}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt={"cover of the poll"}
              className={
                "rounded md:transform-gpu md:transition md:duration-300 md:hover:brightness-125 "
              }
            />
          </div>
        )}
        <div
          className={"divide-white-200  flex h-fit flex-col divide-y w-11/12 md:w-2/3"}
        >
          {pollQuestionFormData.map((value, index) => {
            return (
              <div key={index} className={"flex flex-row"}>
                <div className="mb-8 flex flex-grow flex-col pt-8">
                  <input
                    value={value.pollQuestion || ""}
                    onChange={(event) => increaseArraySize(index, event)}
                    type="text"
                    placeholder="Type your question here"
                    className="input-bordered input-accent input input-lg mb-5 w-full bg-opacity-30"
                  />
                  <CreatePollInput
                    pollQuestionFormData={pollQuestionFormData}
                    setPollOptions={setPollQuestionFormData}
                    pollQuestionIndex={index}
                  />
                  <div className={"mt-4"}>
                    <label className={'label w-fit '}>
                      Are multiple answers allowed?
                      <input
                          onChange={() => changeMultiPollState(index)}
                          checked={pollQuestionFormData[index].multiPoll}
                          type="checkbox"
                          value={
                            pollQuestionFormData[index].multiPoll ? "true" : "false"
                          }
                          className="checkbox-primary border-primary border-2 checkbox checkbox-md ml-4"
                      />
                    </label>

                  </div>
                  <button
                    onClick={() => deleteEntry(index)}
                    className={"absolute flex -translate-y-6 flex-col"}
                    aria-label={'remove this question'}
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
          <div className={"flex w-2/3 flex-col rounded bg-warning p-4"}>
            <h1 className={"mb-4 text-center text-xl font-bold text-black"}>
              You need to be logged in before creating a Poll
            </h1>
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
