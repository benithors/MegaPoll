import React from "react";

interface IProps {
  children;
  className?: string;
}

const PaddingContainer = (props: IProps) => {
  return (
    <div className={"xl:p-18 px-4 sm:px-6 md:px-14 " + props.className}>
      {props.children}
    </div>
  );
};

export default PaddingContainer;
