import React from 'react'

import {supabase} from "../utils/SupabaseClient";
import {handleLogin, handleLogout} from "../utils/AuthUtil";

interface IProps {

}

const Header = (props: IProps) => {

    return (
        <div className={"fixed bg-black h-14 top-0 left-0 w-screen flex flex-col justify-between"}>

            <div className={"self-end h-full mr-6"}>

                <div className="dropdown dropdown-end">

                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        {supabase.auth.user() ?

                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=33791"/>
                            </div>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>


                        }

                    </label>

                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">

                        {supabase.auth.user() ?
                            <>
                                <li>


                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li>
                                    <button onClick={() => handleLogout()}>
                                        Logout
                                    </button>
                                </li>
                            </>

                            :
                            <li>
                                <button onClick={() => handleLogin()}>
                                    Login with Twitch
                                </button>
                            </li>
                        }
                    </ul>

                </div>


            </div>
        </div>


    );
}

export default Header
