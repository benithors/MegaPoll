create view front_page(votes, poll_template, poll_instance, poll_name, cover_image) as
SELECT v.votes,
       v.poll_template,
       v.poll_instance,
       pt.poll_name,
       pt.cover_image
FROM (SELECT vp.poll_template,
             vp.poll_instance,
             vp.votes,
             row_number() OVER (PARTITION BY vp.poll_template ORDER BY vp.votes DESC) AS rank
      FROM votes_per_poll_template_and_instance vp) v
         JOIN poll_templates pt ON v.poll_template = pt.id
WHERE v.rank = 1
ORDER BY v.votes DESC
LIMIT 6;


alter table front_page
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on front_page to anon;

grant delete, insert, references, select, trigger, truncate, update on front_page to authenticated;

grant delete, insert, references, select, trigger, truncate, update on front_page to service_role;

