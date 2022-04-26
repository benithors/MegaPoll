create function fn_create_poll_from_template(provided_poll_template bigint) returns character varying
    security definer
    language plpgsql
as
$$
DECLARE
    poll_instance_id varchar;
    poll_option_temp poll_options;
begin


    insert into poll_instances(poll_template) VALUES (provided_poll_template) returning id into poll_instance_id;
    FOR poll_option_temp IN
        select po.* from poll_options po
                             join poll_questions pq on po.poll_question = pq.id
                             join poll_templates p on pq.poll_template = p.id where p.id = provided_poll_template
        LOOP
            insert into poll_option_votes (poll_instance, poll_option) VALUES (poll_instance_id,poll_option_temp.id);
        end loop;

    return poll_instance_id;
end ;
$$;

alter function fn_create_poll_from_template(bigint) owner to postgres;

grant execute on function fn_create_poll_from_template(bigint) to anon;

grant execute on function fn_create_poll_from_template(bigint) to authenticated;

grant execute on function fn_create_poll_from_template(bigint) to service_role;


