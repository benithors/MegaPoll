import React from "react";
import Container from "../components/structure/Container";

interface IProps {}

const about = (props: IProps) => {
  return (
    <Container>
      <div
        className={
          "component-preview mb-8 h-full text-center text-7xl  font-bold text-primary md:text-8xl xl:text-9xl"
        }
      >
        About
      </div>
    </Container>
  );
};

export default about;
