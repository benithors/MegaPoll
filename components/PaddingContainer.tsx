import React from "react";

interface IProps {
  children;
  className: string;
}

const PaddingContainer = (props: IProps) => {
  return (
    <div className={"xl:p-18 p-6 md:p-14 " + props.className}>
      {props.children}
    </div>
  );
};

export default PaddingContainer;
