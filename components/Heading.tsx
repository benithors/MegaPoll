import React from 'react'

interface IProps {
children:any

}

const Heading = (props: IProps) => {

    return (
        <div className={"text-4xl pb-4 pt-4 text-secondary"}>
            {props.children}
        </div>


    );
}

export default Heading
