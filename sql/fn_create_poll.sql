create function fn_create_poll(poll_name character varying, poll_description character varying, poll_question_data json) returns uuid
    language plpgsql
as
$$
DECLARE
    poll_uuid uuid;
    questions  json;
    key        text;
    val        json;
    pollId     bigint;
    questionId bigInt;
    pollOption text;
begin

    poll_uuid := gen_random_uuid();
    INSERT INTO public.polls (poll_name, poll_description, uuid)
    VALUES (poll_name, poll_description, poll_uuid)
    RETURNING id into pollId;
    --loop through all the question
    FOR questions IN
        SELECT * FROM json_array_elements(poll_question_data)
        LOOP
            FOR key, val IN
                SELECT * FROM json_each(questions)
                LOOP

                    if KEY = 'pollQuestion'
                    THEN
                        insert into poll_questions(question, poll) VALUES (trim(both '"' FROM val::text), pollId) returning id into questionId;
                    end if;
                    --loop through options
                    if KEY = 'pollOptions'
                    THEN
                        FOR pollOption IN
                            SELECT * FROM json_array_elements(val)
                            LOOP
                                RAISE NOTICE '%',trim(both '"' FROM pollOption) ;
                                insert into poll_options(option, poll_question) VALUES(trim(both '"' FROM pollOption) ,questionId);
                            end loop;
                    end if;

                END LOOP;

        END LOOP;

    return poll_uuid;
end;
$$;

alter function fn_create_poll(varchar, varchar, json) owner to postgres;

grant execute on function fn_create_poll(varchar, varchar, json) to anon;

grant execute on function fn_create_poll(varchar, varchar, json) to authenticated;

grant execute on function fn_create_poll(varchar, varchar, json) to service_role;

