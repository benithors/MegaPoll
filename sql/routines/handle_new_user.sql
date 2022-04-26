create function handle_new_user() returns trigger
    security definer
    SET search_path = public
    language plpgsql
as
$$
begin
    insert into public.profiles (id,username, avatar_url)
    values ( new.id,trim(both '"' FROM
                         COALESCE(new.raw_user_meta_data::json ->> 'nickname', new.raw_user_meta_data::json ->> 'name',
                                  new.raw_user_meta_data::json ->> 'slug',  'no_username')),
             trim(both '"' FROM new.raw_user_meta_data::json ->> 'avatar_url'));
    insert into public.profiles_extended(id,followers) values (new.id,(new.raw_user_meta_data::json->'custom_claims'->>'view_count')::int);
    return new;
end;
$$;

alter function handle_new_user() owner to postgres;

grant execute on function handle_new_user() to anon;

grant execute on function handle_new_user() to authenticated;

grant execute on function handle_new_user() to service_role;

