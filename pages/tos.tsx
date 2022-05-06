import React from "react";
import Container from "../components/structure/Container";
import Heading from "../components/generic/Heading";
import InformationContainer from "../components/generic/InformationContainer";
import {EmailContactButton} from "../components/generic/EmailContactButton";

interface IProps {
}



const tos = (props: IProps) => {
    return (
        <Container>
            <div className={"flex flex-col px-6"}>
                <div
                    className={
                        "component-preview mb-8 text-center text-7xl font-bold  text-primary md:text-8xl xl:text-9xl"
                    }>
                    Terms of Service
                </div>


                <InformationContainer title={"Preamble"}>
                    Benjamin Thorstensen (hereinafter referred to as the Operator)
                    operates the website SocialPoll.me, a web-based application for creating social
                    polls. These Terms of Use apply to all users of the platform SocialPoll.me
                    (hereinafter: the User).
                </InformationContainer>

                <InformationContainer title={"Things you should not do"}>
                    <ul className={'list-disc ml-5'}>
                        <li>
                            Do NOT post hate speech (i.e. demeaning race, gender, age, religious or sexual orientation, etc.)
                        </li>
                        <li>
                            Do NOT illegal content such as child porn or nonconsensual revenge porn
                        </li>
                        <li>

                            Do NOT hotlink to adult content or to file-sharing, gambling, torrent
                        </li>
                        <li>
                            Do NOT use SocialPoll.me to host images you link from somewhere else in order to use SocialPoll.me as content delivery network.
                        </li>
                        <li>
                            Do NOT use of the Website and Service must not violate d

                        </li>
                        <li>
                            Do Not use SocialPoll.me to violate any applicable laws, including copyright or trademark laws, export control or sanctions laws, or other laws in your jurisdiction.
                        </li>
                    </ul>
                </InformationContainer>


                <InformationContainer title={"Things to do"}>
                    Have fun and enjoy the site!

                </InformationContainer>

                <InformationContainer title={"Rights of use"}>
                    The Operator has the right to restrict the use of the Platform without
                    giving reasons or to block Users. By giving consent, the User agrees
                    that the Operator may store the User’s sha256 encrypted IP address to verify extensive
                    use of the Platform.
                </InformationContainer>

                <InformationContainer title={"Responsibility for User-Generated Content"}>
                    The User may create or upload User-Generated Content while using the Service. The User is solely responsible for the content of, and for any harm resulting from, any User-Generated Content that you post, upload, link to or otherwise
                    make available via the Service, regardless of the form of that Content. The Operator is not responsible for any public display or misuse of the User's Generated Content.
                </InformationContainer>

                <InformationContainer title={"The Operator May Remove Content"}>

                    The Operator has the right to refuse or remove any User-Generated Content that, in our sole discretion, violates any laws or Socialpoll.me terms or policies.

                </InformationContainer>


                <InformationContainer title={"License Grant to Us"}>

                    We need the legal right to do things like host Your Content, publish it, and share it. You grant us and our legal successors the right to store, archive, parse, and display Your Content, and make incidental copies, as necessary to
                    provide the Service, including improving the Service over time. This license includes the right to do things like copy it to our database and make backups; show it to you and other users; parse it into a search index or otherwise
                    analyze it on our servers; share it with other users.

                </InformationContainer>


                <InformationContainer title={"Rights and obligations of the User"}>
                    <div>
                        The User undertakes to refrain from any actions that endanger the
                        functionality or operation of the software. In particular, the User is
                        prohibited from carrying out any actions that scan or test weak points
                        of the software, bypass security systems or access systems of the
                        software or integrate malware into the software.
                    </div>

                    <div>
                        The User guarantees that he has all the necessary rights (such as
                        copyright, ancillary copyright, industrial property rights, trademark
                        rights) for processing the uploaded photos.
                        The User is responsible for making sure that your use of the Service is in compliance with laws and any applicable regulations.
                    </div>
                    <div>
                        People under the age of 18 are not permitted to use SocialPoll.me
                    </div>
                </InformationContainer>

                <InformationContainer title={"Warranty and liability"}
                >
                    <div>
                        Any warranty for the results of the software and its availability is
                        excluded. If, nevertheless, a warranty claim should exist, the
                        warranty period is six months.
                    </div>
                </InformationContainer>


                <InformationContainer title={"Confidentiality and data protection"}>
                    <div>
                        All data protection information is available to the User at privacy tab linked at the bottom of the page.
                    </div>

                </InformationContainer>


                <InformationContainer title={"Terms of Service breach"}>
                    If you’d like to request the deletion of your images or other images, that may be in breach the terms of service, please provide the full image or the poll URLs and a detailed reason why the images should be removed.<br/>
                    Please contact us via
                    <EmailContactButton/>
                </InformationContainer>

                <InformationContainer title={"Concluding provisions"}>
                    <div>
                        Legal disputes arising from this Contract are governed exclusively by
                        Austrian law. Application of the UN Convention for the International
                        Sale of Goods, the referral standards of the IPRG and the Regulation
                        (EC) no. 593/2008 of the European Parliament and of the Council of
                        June 17, 2008 on the law applicable to contractual obligations (Rome I
                        Regulation) is excluded.
                    </div>

                    <div>
                        The exclusive jurisdiction for disputes arising out of or in
                        connection with this contract shall be the competent court in
                        Vienna-Inner City, Austria.
                    </div>
                </InformationContainer>

                <InformationContainer title={"Changes to Terms of Service"}>
                    SocialPoll.me may revise the privacy policy from time to time by posting the changes here. You can determine the date of the most recent changes by looking at the last change date at the bottom of this page. <br/>
                </InformationContainer>


                <InformationContainer title={"Last change date"}>
                    Friday, 6 May 2022
                </InformationContainer>
            </div>
        </Container>
    );
};

export default tos;
