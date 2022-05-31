import React, { useEffect } from 'react';
import Gradient from '../../lib/gradient';

interface IProps {
  firstPart: string;
  secondPart?: string;
}

const Title = (props: IProps) => {
  return (
    <div
      className={
        'component-preview mb-8 text-center text-7xl font-bold md:text-8xl xl:text-9xl '
      }
    >
      <div className={'text-secondary mix-blend-color-dodge '}>
        {props.firstPart}{' '}
      </div>

      {props.secondPart && (
        <div
          className={
            ' bg-gradient-to-r from-secondary to-primary bg-clip-text text-7xl font-extrabold text-transparent mix-blend-color-dodge md:text-8xl'
          }
        >
          {props.secondPart}
        </div>
      )}
    </div>
  );
};

export default Title;
