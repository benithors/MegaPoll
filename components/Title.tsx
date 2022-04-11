import React from 'react'


interface IProps {
  firstPart: string
    secondPart : string
}

const Title = (props: IProps) => {

    return (
        <div className={"component-preview text-7xl md:text-8xl xl:text-9xl font-bold  text-center mb-8"}>
            <text className={"text-primary"}>
                {props.firstPart} {" "}
            </text>
            <text className={"text-secondary"}>
                {props.secondPart}
            </text>

        </div>


    );
}

export default Title
