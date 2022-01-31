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
update poll_options set votes = poll_options.votes + 1 where id = floor(random() * 3 + 1)::int;
if (counter <100) then
update poll_options set votes = poll_options.votes + 1 where id = 3;
end if;
                if (counter > 300) then
update poll_options set votes = poll_options.votes + 1 where id = 2;
end if;


commit;
end loop;

end;
$$
;
