import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";

interface IProps {}

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
        <Heading>How do we use uploaded images?</Heading>
        <div>
          The uploaded images are displayed as a visual information on what the
          poll is about, the images are stored
        </div>
      </div>
    </Container>
  );
};

export default privacy;
