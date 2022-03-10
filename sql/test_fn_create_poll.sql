do
$$
    declare
        result refcursor = 'generated_result_cursor';
    begin
        open result for select *
                        from fn_create_poll(
                                poll_name := 'pollname',
                                poll_description := 'description',
                                poll_question_data := '[{"pollQuestion":"Which type","pollOptions":["Inear","Overear","Onear",""]},{"pollQuestion":"Which brand","pollOptions":["Sony","jabra","Bose","Jaybird",""]},{"pollQuestion":"How long should they last","pollOptions":["1h","2h","3h","4h",""]},{"pollQuestion":"Earwings?","pollOptions":["Yes I love earwings","No I dont need earwings",""]},{"pollQuestion":"","pollOptions":[""]}]'
                            );
    end
$$;
fetch all in "generated_result_cursor";
close "generated_result_cursor";
