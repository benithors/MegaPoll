import React from 'react';

interface IProps {
  children: any;
}

const Heading = (props: IProps) => {
  return (
    <div className={'pb-4 pt-4 text-4xl text-secondary'}>{props.children}</div>
  );
};

export default Heading;
