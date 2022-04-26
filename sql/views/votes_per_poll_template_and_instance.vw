create view votes_per_poll_template_and_instance(poll_instance, votes, poll_template) as
SELECT pov.poll_instance,
       sum(pov.votes) AS votes,
       pi.poll_template
FROM poll_option_votes pov
         JOIN poll_instances pi ON pov.poll_instance::text = pi.id::text
GROUP BY pov.poll_instance, pi.poll_template;

alter table votes_per_poll_template_and_instance
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on votes_per_poll_template_and_instance to anon;

grant delete, insert, references, select, trigger, truncate, update on votes_per_poll_template_and_instance to authenticated;

grant delete, insert, references, select, trigger, truncate, update on votes_per_poll_template_and_instance to service_role;

