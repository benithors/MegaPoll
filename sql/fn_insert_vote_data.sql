create function fn_insert_vote_data() returns trigger
    security definer
    language plpgsql
as
$$
begin
    update public.poll_options SET votes = votes + 1 where id = new.poll_option;
    return new;
end;
$$;

alter function fn_insert_vote_data() owner to supabase_admin;

grant execute on function fn_insert_vote_data() to postgres;

grant execute on function fn_insert_vote_data() to anon;

grant execute on function fn_insert_vote_data() to authenticated;

grant execute on function fn_insert_vote_data() to service_role;

