import React from 'react'
import {useForm} from "react-hook-form";
import {definitions} from "../types/database";
import {IPollQuestion} from "../pages/poll/[id]";


interface IProps {
    pollQ:IPollQuestion;
    callback
}

const CheckboxForm = (props: IProps) => {
    const {register, handleSubmit} = useForm();
    return (
        <div>

            <form onSubmit={handleSubmit(props.callback)}>
                {props.pollQ.pollOptions.map((value, idx) =>

                    <div className={"flex flex-row justify-between"}>
                        {value.option}
                        <input {...register("question." + props.pollQ.pollQuestion.id + "options." + value.id)} type="checkbox"
                               className="checkbox checkbox-md"/>
                    </div>

                )}
                <button className="btn btn-sm mt-4" type="submit">submit</button>
            </form>
        </div>


    );
}

export default CheckboxForm
