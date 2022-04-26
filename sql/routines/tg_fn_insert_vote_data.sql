create function tg_fn_insert_vote_data() returns trigger
    security definer
    language plpgsql
as
$$
DECLARE
    profile_1         boolean;
    profile_2         boolean;
    profile_3         boolean;
    profile_followers bigint;
begin

    if new.profile is not null
    then
        select followers into profile_followers from profiles_extended where id = new.profile;

        if profile_followers is not null
        then

            select pe.followers > COALESCE(p1.followers, 0),
                   pe.followers > COALESCE(p2.followers, 0),
                   pe.followers > COALESCE(p3.followers, 0)
            into profile_1,profile_2,profile_3
            from profiles_extended pe
                     join poll_option_votes pov on pov.id = new.poll_option_vote
                     left join profiles_extended p1 on pov.top_profile_1 = p1.id
                     left join profiles_extended p2 on pov.top_profile_2 = p2.id
                     left join profiles_extended p3 on pov.top_profile_3 = p3.id
            where pe.id = new.profile;

            if profile_1 is true
            then
                update public.poll_option_votes
                set votes         = votes + 1
                  , top_profile_1 = new.profile
                  , top_profile_2 = top_profile_1
                  , top_profile_3 = top_profile_2
                where id = new.poll_option_vote;
                return new;
            else
                if profile_2 is true
                then
                    update public.poll_option_votes
                    set votes         = votes + 1
                      , top_profile_2 = new.profile
                      , top_profile_3 = top_profile_2
                    where id = new.poll_option_vote;
                    return new;
                else
                    if profile_3 is true
                    then
                        update public.poll_option_votes
                        set votes         = votes + 1,
                            top_profile_3 = new.profile
                        where id = new.poll_option_vote;
                        return new;
                    end if;
                end if;

            end if;

        end if;

    end if;
    update public.poll_option_votes set votes = votes + 1 where id = new.poll_option_vote;
    return new;
end;
$$;

alter function tg_fn_insert_vote_data() owner to postgres;

grant execute on function tg_fn_insert_vote_data() to anon;

grant execute on function tg_fn_insert_vote_data() to authenticated;

grant execute on function tg_fn_insert_vote_data() to service_role;

