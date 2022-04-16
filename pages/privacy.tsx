import React from "react";
import Container from "../components/Container";

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
    </Container>
  );
};

export default privacy;
