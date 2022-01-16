import React, {useEffect} from 'react'


interface IProps {

}


interface IPoll {
    pollName: string
    pollOptions: string[]
}

const Poll = (props: IProps) => {
    const [poll, setPoll] = React.useState<IPoll>({
        pollOptions: [''],
        pollName: ''
    });

    useEffect(() => {
      /*  if (poll.pollOptions[poll.pollOptions.length - 1]) {

            let updated = poll;
            updated.pollOptions.push('');
            setPoll(prevState => ({
                    ...poll,
                    ...updated
                })
            )
        }*/
    })

    const updatePollOption = (index: number) => (e: { target: { value: string; }; }) => {

        let newPoll = poll;
        poll.pollOptions[index] = e.target.value;

        setPoll(newPoll);

    }


    function updatePoll(index:number,e: { target: { value: string; }; } ){

        console.log('index' +index + '/'+ e.target.value);
        let newPoll = poll;
        poll.pollOptions[index] = e.target.value;

        setPoll(newPoll);

    }

    function updatePoll2(index:number,e: { target: { value: string; }; } ){

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
                                  onChange={event => updatePoll2(index,event)}
                                  type="text" placeholder="Poll Option" className="input input-primary input-bordered"/>
                })}

            </div>

        </div>


    );
}

export default Poll
