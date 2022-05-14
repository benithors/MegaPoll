create or replace view poll_data as
select pi.id poll_instance_id,pt.poll_category,pt.cover_image,pt.id poll_template_id,pt.poll_name,pt.creator from poll_instances pi
                                                                                                                      join poll_templates pt on pi.poll_template = pt.id;
