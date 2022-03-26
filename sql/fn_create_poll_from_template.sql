create function fn_create_poll_from_template(polluuid uuid) returns uuid
    security definer
    language plpgsql
as
$$
DECLARE
    poll_instance_uuid  uuid;
    poll_id int8;
    poll_instance_id int8;
    poll_option_temp poll_options;
begin

    poll_instance_uuid := gen_random_uuid();
    select id
    into poll_id
    from polls
    where uuid = pollUuid;

    insert into poll_instance(poll,url) VALUES (poll_id,poll_instance_uuid) returning id into poll_instance_id;
    FOR poll_option_temp IN
        select po.* from poll_options po
                             join poll_questions pq on po.poll_question = pq.id
                             join polls p on pq.poll = p.id where p.id = poll_id
        LOOP
            insert into poll_options_answers (poll_instance, poll_option) VALUES (poll_instance_id,poll_option_temp.id);
        end loop;

    return poll_instance_uuid;
end ;
$$;

alter function fn_create_poll_from_template(uuid) owner to postgres;

grant execute on function fn_create_poll_from_template(uuid) to anon;

grant execute on function fn_create_poll_from_template(uuid) to authenticated;

grant execute on function fn_create_poll_from_template(uuid) to service_role;

