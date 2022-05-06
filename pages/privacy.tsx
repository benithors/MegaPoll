import React from "react";
import Container from "../components/structure/Container";
import Heading from "../components/generic/Heading";
import InformationContainer from "../components/generic/InformationContainer";

interface IProps {
}

const privacy = (props: IProps) => {
    return (
        <Container>
            <div
                className={
                    "component-preview mb-8 text-center text-7xl font-bold  text-primary md:text-8xl xl:text-9xl"
                }
            >
                Privacy
            </div>

            <div className={"flex flex-col px-6"}>

                <InformationContainer title={"Data Privacy"}>
                    SocialPoll.me would like to make the visit to the SocialPoll.me pages as pleasant as possible for all its users. For SocialPoll.Me, this also includes - right at the forefront - safeguarding the privacy of each individual and protecting
                    personal data.<br/>

                    In this privacy statement, you will learn which personal data we process on our websites and apps, in what way and for what purpose. We also inform you about your rights as a data subject.<br/>

                    This data privacy statement applies to the online offers and apps of ORF and its subsidiaries and the associated services and functions.
                </InformationContainer>


                <InformationContainer title={"Collection and processing of personal data"}>
                    Personal data is collected and processed on SocialPoll.me exclusively for legally permitted purposes and to the extent specified by law. This is the case, for example, if the processing of your data is necessary for the fulfillment of a
                    contract or a legal obligation affecting us.<br/>

                    Data is also stored and used if you have given your consent to the processing of personal data for one or more specific purposes. <br/>

                    Personal data is data from which a natural person can be identified. Therefore, all those data are personal that allow conclusions about your person, e.g. your nickname in combination with your email address.<br/>

                    Personal data also includes data that only in combination with other data, often of another data processor, allow the identification of a person, e.g. your IP address in combination with a time when you were online. <br/>
                </InformationContainer>

                <InformationContainer title={"Data Processing"}>

                    SocialPoll.me and its subsidiaries process your data, for example, when you vote on a poll, create a poll. <br/>

                    SocialPoll.me process data such as your IP address and browser or app identifiers for technical operation such as making sure that only one vote is casted per poll question. <br/>

                    SocialPoll.me uses the personal data you provide only to the extent necessary to fulfill the respective purpose; e.g. <br/>
                    <ul className="list-disc ml-8 pt-2">
                        <li>
                            for measuring the use and performance of SocialPoll.me online services
                        </li>
                        <li>
                            to answer a question that you ask us.
                        </li>
                        <li>
                            to fulfill a contract
                        </li>
                        <li>
                            to fulfill a legal obligation
                        </li>
                        <li>
                            for the technical provision of our services
                        </li>

                    </ul>

                    We store and process your data only for as long as is necessary to fulfill the respective purposes. <br/>

                    The duration of data processing also depends in particular on the statutory retention periods and the limitation periods for potential legal claims. <br/>
                </InformationContainer>

                <InformationContainer title={"How do we use uploaded images?"}>


                    The uploaded images are displayed as a visual information on what the
                    poll is about, the images are stored on a AWS S3 bucket. <br/>
                    SocialPoll.me does not claim the ownership of the images. And the <br/>

                    Uploading an Image creates a Poll that can be shared to the community.<br/>
                    No matter what your privacy settings are, every poll and therefor image can always be accessed and viewed by anyone who types in that exact URL. No image uploaded to SocialPoll.me is ever completely hidden from public view. This is
                    mainly to ensure that SocialPoll.me will not be used as a platform for illegality.
                </InformationContainer>


                <InformationContainer title={"Changes to this Privacy Policy"}>
                    SocialPoll.me may revise the privacy policy from time to time by posting the changes here. You can determine the date of the most recent changes by looking at the last change date at the bottom of this page. <br/>
                </InformationContainer>


                <InformationContainer title={"Last change date"}>
                    Friday, 6 May 2022
                </InformationContainer>


            </div>
        </Container>
    );
};

export default privacy;
