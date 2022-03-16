create function fn_create_poll(poll_name character varying, poll_description character varying, poll_question_data json) returns uuid
    language plpgsql
as
$$
DECLARE
    poll_uuid  uuid;
    questions  json;
    pollId     bigint;
    questionId bigInt;
    pollOption text;
    pollQuestion text;
    pollOptions json;
    multiPoll boolean;
begin

    poll_uuid := gen_random_uuid();
    INSERT INTO public.polls (poll_name, poll_description, uuid)
    VALUES (poll_name, poll_description, poll_uuid)
    RETURNING id into pollId;
    --loop through all the question
    FOR questions IN

        SELECT * FROM json_array_elements(poll_question_data)
        LOOP

            RAISE  NOTICE 'PQD: %', questions;


            SELECT questions::json -> 'pollQuestion' as pollQ,
                   questions::json -> 'multiPoll'    as pollM,
                   questions::json -> 'pollOptions'  as pollO
            into pollQuestion,multiPoll,pollOptions;

            insert into poll_questions(question, poll,multipoll)
            VALUES (trim(both '"' FROM pollQuestion::text), pollId,multipoll)
            returning id into questionId;

            FOR  pollOptions IN
                SELECT * FROM json_array_elements(pollOptions)
                LOOP
                    RAISE NOTICE '%',trim(both '"' FROM pollOption);
                    insert into poll_options(option, poll_question) VALUES (trim(both '"' FROM pollOption), questionId);
                end loop;

        END LOOP;

    return poll_uuid;
end ;
$$;

alter function fn_create_poll(varchar, varchar, json) owner to postgres;

grant execute on function fn_create_poll(varchar, varchar, json) to anon;

grant execute on function fn_create_poll(varchar, varchar, json) to authenticated;

grant execute on function fn_create_poll(varchar, varchar, json) to service_role;

