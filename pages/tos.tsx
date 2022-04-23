import React from "react";
import Container from "../components/structure/Container";
import Heading from "../components/generic/Heading";

interface IProps {}

const tos = (props: IProps) => {
  return (
    <Container>
      <div className={"flex flex-col px-6"}>
        <div
          className={
            "component-preview mb-8 text-center text-7xl font-bold  text-primary md:text-8xl xl:text-9xl"
          }
        >
          Terms of Service
        </div>
        <Heading>1. Preamble</Heading>
        <div>
          Benjamin Thorstensen (hereinafter referred to as the Operator)
          operates the website TODO, a web-based application for creating social
          polls. These Terms of Use apply to all users of the platform TODO
          (hereinafter: the User).
        </div>

        <Heading>2. Rights of use</Heading>
        <div>
          The Operator has the right to restrict the use of the Platform without
          giving reasons or to block Users. By giving consent, the User agrees
          that the Operator may store the User’s IP address to verify extensive
          use of the Platform.
        </div>

        <Heading>3. Rights and obligations of the User</Heading>
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
        </div>
        <div>
          People under the age of 18 are not permitted to use or register for
          the Site,
        </div>

        <Heading>4. Warranty and liability</Heading>
        <div>
          Any warranty for the results of the software and its availability is
          excluded. If, nevertheless, a warranty claim should exist, the
          warranty period is six months.
        </div>

        <Heading>5. Confidentiality and data protection</Heading>
        <div>
          All data protection information is available to the User at TODO
        </div>

        <Heading>6. Concluding provisions</Heading>

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
      </div>
    </Container>
  );
};

export default tos;
