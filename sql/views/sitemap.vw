create or replace view sitemap(poll_instance) as
SELECT
    v.poll_instance
FROM (SELECT vp.poll_template,
             vp.poll_instance,
             vp.votes,
             row_number() OVER (PARTITION BY vp.poll_template ORDER BY vp.votes DESC) AS rank
      FROM votes_per_poll_template_and_instance vp) v
         JOIN poll_templates pt ON v.poll_template = pt.id
WHERE v.rank = 1
ORDER BY v.votes DESC;
