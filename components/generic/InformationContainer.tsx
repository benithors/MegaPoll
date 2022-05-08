import React from "react";
import Heading from "./Heading";

interface IProps {
  title: string;
  children: any;
}

const Title = (props: IProps) => {
  return (
    <div className={"pt-5"}>
      <Heading>{props.title}</Heading>
      {props.children}
    </div>
  );
};

export default Title;
