create or replace view poll_options_voted
as
select po.poll_question,profile,poll_option,cookie_identifier, EXISTS (select 1 from profiles_2_poll_options p2po where p2po.poll_option = po.id) as voted
from poll_options po
         left join profiles_2_poll_options p on po.id = p.poll_option
;
