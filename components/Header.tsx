import React, { useEffect, useState } from "react";

import { Auth, useUser } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { BASE_PATH } from "../lib/constants";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

interface IProps {}

const Header = (props: IProps) => {
  const { user, error } = useUser();
  const [data, setData] = useState();
  const router = useRouter();
  useEffect(() => {
    async function loadData() {
      /*            const { data } = await supabaseClient.from('test').select('*');
                        setData(data);*/
    }

    // Only run query once user is logged in.
    if (user) loadData();
  }, [user]);

  return (
    <div
      className={
        "fixed bg-black h-14 top-0 left-0 w-screen flex flex-row justify-between"
      }
    >
      <Link href="/">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-6 ml-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      </Link>

      <div className={"self-end h-full mr-6"}>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            {user ? (
              <Image
                src={user.user_metadata.avatar_url}
                alt="Picture of the author"
                width={75}
                height={75}
                className="rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </label>

          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {user ? (
              <>
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <p>user:</p>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                  <p>client-side data fetching with RLS</p>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </li>

                <li>
                  <button onClick={() => supabaseClient.auth.signOut()}>
                    Sign out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <>
                  {error && <p>{error.message}</p>}
                  <Auth
                    redirectTo={BASE_PATH + router.asPath}
                    supabaseClient={supabaseClient}
                    providers={["twitch"]}
                    socialLayout="horizontal"
                    socialButtonSize="xlarge"
                    onlyThirdPartyProviders={true}
                  />
                </>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
