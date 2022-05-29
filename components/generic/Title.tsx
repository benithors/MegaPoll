import React, {useEffect} from 'react';
import Gradient from "../../lib/gradient";

interface IProps {
  firstPart: string;
  secondPart?: string;
}

const Title = (props: IProps) => {

    useEffect(() => {
        var gradient = new Gradient()
        gradient.initGradient('#gradient-canvas')
            , []});
  return (
    <div
      className={
        'component-preview mb-8 text-center text-7xl font-bold md:text-8xl xl:text-9xl '
      }
    >

        <canvas id="gradient-canvas" className={'left-0 top-0 w-full absolute z-0 -skew-y-12 -translate-y-80 md:-translate-y-56'}>

        </canvas>
        <div className={'text-secondary mix-blend-color-dodge '}>{props.firstPart} </div>

      {props.secondPart && (
        <div
          className={
            'bg-gradient-to-r from-secondary to-primary bg-clip-text text-7xl z-20 font-extrabold text-transparent md:text-8xl mix-blend-color-dodge'
          }
        >
          {props.secondPart}
        </div>
      )}
    </div>
  );
};

export default Title;
