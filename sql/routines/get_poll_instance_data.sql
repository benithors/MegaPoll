create function get_poll_instance_data(provided_poll_instance character varying, provided_cookie uuid, provided_profile uuid)
    returns TABLE(voted boolean, poll_option_id bigint, option character varying, poll_question bigint, poll_option_votes_id bigint, poll_option_votes_instance character varying, poll_option_votes_votes bigint, top_profile_1 uuid, top_profile_2 uuid, top_profile_3 uuid)
    security definer
    language plpgsql
as
$$
begin

    if (provided_profile is not null)
    then
        return query
            select (exists(select 1
                           from poll_option_votes_2_users pov2u
                           where pov2u.profile = provided_profile
                             and pov2u.poll_option_vote = pov.id)),
                   po.id,
                   po.option,
                   po.poll_question,
                   pov.id,
                   pov.poll_instance,
                   pov.votes,
                   pov.top_profile_1,
                   pov.top_profile_2,
                   pov.top_profile_3
            from poll_options po
                     join poll_option_votes pov on po.id = pov.poll_option
            where pov.poll_instance = provided_poll_instance
            order by po.poll_question, po.option;
    else
        return query
            select (exists(select 1
                           from poll_option_votes_2_users pov2u
                           where pov2u.user_cookie = provided_cookie
                             and pov2u.poll_option_vote = pov.id)),
                   po.id,
                   po.option,
                   po.poll_question,
                   pov.id,
                   pov.poll_instance,
                   pov.votes,
                   pov.top_profile_1,
                   pov.top_profile_2,
                   pov.top_profile_3
            from poll_options po
                     join poll_option_votes pov on po.id = pov.poll_option
            where pov.poll_instance = provided_poll_instance
            order by po.poll_question, po.option;

    end if;
end;
$$;

alter function get_poll_instance_data(varchar, uuid, uuid) owner to postgres;

grant execute on function get_poll_instance_data(varchar, uuid, uuid) to anon;

grant execute on function get_poll_instance_data(varchar, uuid, uuid) to authenticated;

grant execute on function get_poll_instance_data(varchar, uuid, uuid) to service_role;

