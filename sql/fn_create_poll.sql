create or replace function fn_create_poll(poll_name character varying, poll_description character varying,
                                          poll_question_data json) returns uuid
    language plpgsql
as
$$
DECLARE
    questions  json;
    key        text;
    val        json;
    pollId     bigint;
    questionId bigInt;
    pollOption text;
begin

    INSERT INTO public.polls (poll_name, poll_description, uuid)
    VALUES (poll_name, poll_description, gen_random_uuid())
    RETURNING id into pollId;
    --loop through all the question
    FOR questions IN
        SELECT * FROM json_array_elements(poll_question_data)
        LOOP
            FOR key, val IN
                SELECT * FROM json_each(questions)
                LOOP
                    RAISE NOTICE '%: %', key, val;
                    if KEY = 'pollQuestion'
                    THEN
                        insert into poll_questions(question, poll) VALUES (val, pollId) returning id into questionId;
                    end if;
                    --loop through options
                    if KEY = 'pollOptions'
                    THEN
                        FOR pollOption IN
                            SELECT * FROM json_array_elements(val)
                            LOOP
                                insert into poll_options(option, poll_question) VALUES(pollOption,questionId);
                            end loop;
                    end if;

                END LOOP;

        END LOOP;

    return gen_random_uuid();
end;
$$;

alter function fn_create_poll(varchar, varchar, json) owner to postgres;

grant execute on function fn_create_poll(varchar, varchar, json) to anon;

grant execute on function fn_create_poll(varchar, varchar, json) to authenticated;

grant execute on function fn_create_poll(varchar, varchar, json) to service_role;

