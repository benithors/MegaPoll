import React, {useEffect} from "react";
import CreatePollInput from "../../components/CreatePollInput";
import {isEmpty} from "../../lib/stringUtils";
import {Auth, useUser} from "@supabase/supabase-auth-helpers/react";
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {getErrorMessage, isErrorWithMessage} from "../../lib/errorUtil";
import {useRouter} from "next/router";
import {useToasts} from "react-toast-notifications";
import {areThereValidOption, cleanPollQuestionCreation, copyPoll, IPollQuestionCreation,} from "../../lib/pollUtil";
import {uuid} from "@supabase/gotrue-js/dist/main/lib/helpers";
import Container from "../../components/Container";
import {BASE_PATH} from "../../lib/constants";

const CreatePoll = () => {
    const [pollQuestionFormData, setPollQuestionFormData] = React.useState<IPollQuestionCreation[]>([
        {
            pollQuestion: "",
            pollOptions: [""],
            multiPoll: false,
        },
    ]);
    const {user, error} = useUser();
    const router = useRouter();
    const {addToast} = useToasts();
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
            console.log("uuid " + path);
            const {data, error} = await supabaseClient.storage
                .from("pollimages")
                .upload(path, selectedImage);
            if (data) {
                console.log(data);
                const {publicURL, error} = supabaseClient.storage
                    .from("pollimages")
                    .getPublicUrl(path);
                coverImage = publicURL;
                if (isErrorWithMessage(error)) {
                    console.log(error);
                }
                console.log("upload worked " + coverImage);
            }
            console.log(error);
        }

        const params = {
            poll_name: pollName,
            poll_description: pollDescription,
            user_id: user.id,
            cover_image: isEmpty(coverImage) ? null : coverImage,
            poll_question_data: copy,
        };
        console.log("````", params);
        const {data, error} = await supabaseClient.rpc("fn_create_poll", params);
        if (isErrorWithMessage(error)) {
            console.log(getErrorMessage(error));
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
                query: {id: data},
            });
        }
    }



    useEffect(() => {
        //assign poll name from the session storage
        if (sessionStorage.getItem("pollName")) {
            console.log('pollName', sessionStorage.getItem("pollName"));

            setPollName(sessionStorage.getItem("pollName"));
        }
        //assign poll description from the session storage
        if (sessionStorage.getItem("pollDescription")) {
            setPollDescription(sessionStorage.getItem("pollDescription"));
        }

        //assign poll questions from the session storage
        if (sessionStorage.getItem("pollQuestions")) {
            setPollQuestionFormData(JSON.parse(sessionStorage.getItem("pollQuestions")));
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
            sessionStorage.setItem("pollQuestions", JSON.stringify(pollQuestionFormData));
        }
    }, [pollQuestionFormData]);


    useEffect(() => {
            //save image so it can be reloaded later
            if (selectedImage) {
                const reader = new FileReader();
                reader.readAsDataURL(selectedImage);
                reader.onload = () => {
                    setSelectedImage(reader.result);
                };
            }



    }, [selectedImage]);


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
                let pollQuestionCreationTemp: IPollQuestionCreation = {
                    pollQuestion: "",
                    pollOptions: [""],
                    multiPoll: false,
                };

                pollQuestionCreationArr.push(pollQuestionCreationTemp);
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

    return (
        <Container>
            <div className={"mt-16 text-4xl self-center"}>Create a Poll Tempalte</div>

            <div className="form-control md:w-2/4">
                <label className="label">
                    <span className="label-text">Poll Name</span>
                </label>
                <input
                    type="text"
                    defaultValue={pollName || ""}
                    onChange={(event) => setPollName(event.target.value)}
                    placeholder="Give your Poll a name"
                    className="input input-bordered"
                />

                <label className="label">
                    <span className="label-text">Describe the poll</span>
                </label>
                <textarea
                    defaultValue={pollDescription || ""}
                    className="textarea h-24 textarea-bordered"
                    onChange={(event) => setPollDescription(event.target.value)}
                    placeholder="Describe what the poll is about"
                ></textarea>

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
                <div className={"mt-16 flex flex-col divide-y divide-white-200 h-fit"}>
                    {pollQuestionFormData.map((value, index) => {
                        return (
                            <div className="flex flex-col  pt-5  mb-8" key={index}>
                                <input
                                    value={value.pollQuestion || ""}
                                    onChange={(event) => increaseArraySize(index, event)}
                                    type="text"
                                    placeholder="Type your question here"
                                    className="mb-5 input input-accent input-bordered input-lg w-full "
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
                                        value={pollQuestionFormData[index].multiPoll ? "true" : "false"}
                                        className="checkbox checkbox-md mr-4"
                                    />
                                    Are multiple answers allowed?
                                </div>
                            </div>
                        );
                    })}
                </div>

                {user ? (
                    <div>
                        <button onClick={submitPoll} className="btn btn-primary bg-red">
                            Submit Poll
                        </button>
                    </div>
                ) : (
                    <div className={"flex flex-col"}>
                        <text>You need to be logged in before creating a Poll {BASE_PATH}</text>

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
