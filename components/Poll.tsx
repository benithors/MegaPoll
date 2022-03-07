import React from 'react'



const Poll = () => {
    const [poll, setPoll] = React.useState<string>();
    const [pollOptions, setPollOptions] = React.useState<string[]>(['']);

    function isNotEmpty(lastPollOption: string) {
        return lastPollOption !== undefined && lastPollOption !== null && lastPollOption !== '';
    }

    function updatePollOptions(index: number, e: { target: { value: string; }; }) {
        setPollOptions(prevState => {
            const pollOptions = [...prevState];
            let pollOption = pollOptions[index];
            pollOption = e.target.value;
            pollOptions[index] = pollOption;
            //we need to check if the last element in poll has some string in it
            //if this is so we need to append +1 on poll so that another poll can be added
            const lastPollOption = pollOptions[pollOptions.length - 1];
            if (isNotEmpty(lastPollOption)) {
                pollOptions.push('')
            }
            return pollOptions;
        });
    }

    return (
        <div className="card glass lg:card-side text-neutral-content">
            <div className="form-control">
                <input value={poll}
                       onChange={e => setPoll(e.target.value)}
                       type="text" placeholder="Type your question here" className="input input-primary input-bordered"/>

                {pollOptions.map((value, index) => {

                    return <input
                        key={index}
                        onChange={event => updatePollOptions(index, event)}
                        type="text" placeholder="Poll Option" className="input input-primary input-bordered
                                  mt-2"/>
                })}

            </div>

        </div>


    );
}

export default Poll
