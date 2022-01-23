
do
$$
declare
f record;
begin
for counter in 1..20 loop
PERFORM
  pg_sleep(1);
	raise notice 'counter: %', counter;
update polls set poll_name = 'asd' || counter where id =1;
commit;
PERFORM
pg_sleep(1);
end loop;

end;
$$
;
