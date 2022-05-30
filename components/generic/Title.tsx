import React, { useEffect } from 'react';
import Gradient from '../../lib/gradient';

interface IProps {
  firstPart: string;
  secondPart?: string;
}

const Title = (props: IProps) => {
  useEffect(() => {
    var gradient = new Gradient();
    gradient.initGradient('#gradient-canvas'), [];
  });
  return (
    <div
      className={
        'component-preview mb-8 text-center text-7xl font-bold md:text-8xl xl:text-9xl '
      }
    >
      <canvas
        id="gradient-canvas"
        className={
          'absolute left-0 top-0 z-0 w-full -translate-y-80 -skew-y-12 md:-translate-y-56  transform-gpu'
        }
      ></canvas>
      <div className={'text-secondary mix-blend-color-dodge '}>
        {props.firstPart}{' '}
      </div>

      {props.secondPart && (
        <div
          className={
            'z-20 bg-gradient-to-r from-secondary to-primary bg-clip-text text-7xl font-extrabold text-transparent mix-blend-color-dodge md:text-8xl'
          }
        >
          {props.secondPart}
        </div>
      )}
    </div>
  );
};

export default Title;
