import React from "react";

interface IProps {
  firstPart: string;
  secondPart?: string;
}

const Title = (props: IProps) => {
  return (
    <div
      className={
        "component-preview mb-8 text-center text-7xl font-bold  md:text-8xl xl:text-9xl "
      }
    >
      <div className={"text-primary"}>{props.firstPart} </div>
      {props.secondPart && (
        <div className={"text-secondary"}>{props.secondPart}</div>
      )}
    </div>
  );
};

export default Title;
