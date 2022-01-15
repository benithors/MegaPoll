import React from 'react'


interface IProps {

}

const Poll = (props: IProps) => {

    return (
        <div>
            <div className="form-control">
                <input type="text" placeholder="Type your question here" className="input input-ghost"/>
            </div>
        </div>


    );
}

export default Poll
