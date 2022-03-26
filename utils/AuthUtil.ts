import {supabase} from "./SupabaseClient";

export const handleLogin = async () => {
    try {
        const { user, session,error} = await supabase.auth.signIn({
            provider: 'twitch',
        });
       console.log(user,session)
        if (error) throw error;
    } catch (error) {
        console.log(error)
        alert(error.error_description || error.message);
    } finally {
        console.log()
    }
};

export const handleLogout  = async() => {

    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error;
    } catch (error) {
        console.log(error)
        alert(error.error_description || error.message);
    } finally {
        console.log()
    }

}
