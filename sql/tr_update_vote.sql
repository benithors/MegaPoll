create trigger tr_update_vote
    after insert
    on profiles_2_poll_options
    for each row
execute procedure fn_insert_vote_data();

