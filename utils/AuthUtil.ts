import {supabase} from "./SupabaseClient";

export const handleLogin = async () => {
    try {
        // setLoading(true);
        const { user, session,error} = await supabase.auth.signIn({
            provider: 'twitter',
        });
       console.log(user,session)
        if (error) throw error;
    } catch (error) {
        console.log(error)
        alert(error.error_description || error.message);
    } finally {
        // setLoading(false);
        console.log()
    }
};

