create function fn_create_poll(poll_name character varying, user_id uuid, cover_image character varying, poll_question_data json) returns character varying
    security definer
    language plpgsql
as
$$
DECLARE
    questions         json;
    poll_id           bigint;
    question_id       bigInt;
    poll_option       text;
    poll_question     text;
    poll_options      json;
    multipoll         boolean;
    poll_instance_url varchar;
begin


    INSERT INTO public.poll_templates (poll_name, cover_image, creator)
    VALUES (poll_name, cover_image, user_id)
    RETURNING id into poll_id;
    --loop through all the question
    FOR questions IN
        SELECT * FROM json_array_elements(poll_question_data)
        LOOP

            RAISE NOTICE 'PQD: %', questions;


            SELECT questions::json -> 'pollQuestion' as pollQ,
                   questions::json -> 'multiPoll'    as pollM,
                   questions::json -> 'pollOptions'  as pollO
            into poll_question,multipoll,poll_options;

            insert into poll_questions(question, poll_template, multipoll)
            VALUES (trim(both '"' FROM poll_question::text), poll_id, multipoll)
            returning id into question_id;

            FOR poll_option IN
                SELECT * FROM json_array_elements(poll_options)
                LOOP
                    RAISE NOTICE '%',poll_option;
                    insert into poll_options(option, poll_question)
                    VALUES (trim(both '"' FROM poll_option), question_id);
                end loop;

        END LOOP;


    select fn_create_poll_from_template(poll_id) into poll_instance_url;
    return poll_instance_url;
end ;
$$;

alter function fn_create_poll(varchar, uuid, varchar, json) owner to postgres;

grant execute on function fn_create_poll(varchar, uuid, varchar, json) to anon;

grant execute on function fn_create_poll(varchar, uuid, varchar, json) to authenticated;

grant execute on function fn_create_poll(varchar, uuid, varchar, json) to service_role;

