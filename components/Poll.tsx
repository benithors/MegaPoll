import React from 'react'


interface IPoll {
    pollName: string
    pollOptions: string[]
}

const Poll = () => {
    const [poll, setPoll] = React.useState<IPoll>({
        pollOptions: [''],
        pollName: ''
    });


    function updatePoll(index: number, e: { target: { value: string; }; }) {
        let newPollOpt = [...poll.pollOptions]
        newPollOpt[index] = e.target.value;
        let newPoll = poll;
        poll.pollOptions = newPollOpt;
        console.log(newPoll)
        setPoll(newPoll)
    }

    return (
        <div className="card glass lg:card-side text-neutral-content">
            <div className="form-control">
                <input value={poll.pollName}
                       onChange={e => setPoll({...poll, pollName: e.target.value})}
                       type="text" placeholder="Type your question here" className="input input-primary input-bordered"/>

                {poll.pollOptions?.map((value, index) => {

                    return <input value={value}
                                  key={index}
                                  onChange={event => updatePoll(index, event)}
                                  type="text" placeholder="Poll Option" className="input input-primary input-bordered"/>
                })}

            </div>

        </div>


    );
}

export default Poll
