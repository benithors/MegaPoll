import { handleAuth } from "@supabase/supabase-auth-helpers/nextjs";

export default handleAuth({ logout: { returnTo: "/" } });

//guide
//https://github.com/supabase-community/supabase-auth-helpers/tree/next/src/nextjs

//example
//https://github.com/supabase/supabase/tree/master/examples/nextjs-with-supabase-auth/pages
