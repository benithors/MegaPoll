do
$$
    declare
f record;
begin
for counter in 1..10000
            loop
                PERFORM
                    pg_sleep(0.001);
                raise notice 'counter: %', counter;
update poll_option_votes set votes = poll_option_votes.votes + 1 where id = floor(random() * (400-396 + 1)  + 396)::int;
if (counter <100) then
update poll_option_votes set votes = poll_option_votes.votes + 1 where id = 3;
end if;
                if (counter > 300) then
update poll_option_votes set votes = poll_option_votes.votes + 1 where id = 2;
end if;
commit;
end loop;

end;
$$
;

update poll_option_votes set votes = 0 where id in (400,399,398,397,396);
