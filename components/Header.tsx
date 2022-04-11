import React, {useEffect, useState} from "react";

import {Auth, useUser} from "@supabase/supabase-auth-helpers/react";
import {supabaseClient} from "@supabase/supabase-auth-helpers/nextjs";
import {useRouter} from "next/router";
import Image from "next/image";
import Link from "next/link";
import {BASE_PATH} from "../lib/constants";
import {IconHome, IconUser} from "@supabase/ui";
interface IProps {
}

const Header = (props: IProps) => {
    const {user, error} = useUser();
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
        <div className={"fixed bg-black top-0 left-0 w-screen h-20 z-50 flex flex-row justify-center "}>
            <div className={'flex flex-row justify-between w-full max-w-screen-xl '}>
                <Link href="/">
                    <button className={'ml-8 '}>
                        <svg width="80%" height="80%" viewBox="0 0 754 620" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M381.87 1.05001C419.72 1.05001 457.68 -0.889995 495.39 1.42001C605.05 8.14001 686.53 61.27 729.74 161.88C774.46 266 754.65 363.21 676.87 446.18C628.46 497.82 577.6 547.17 527.42 597.14C518.27 606.25 509.99 623.57 496.36 618.95C486.25 615.52 487.41 604.24 487.7 595.69C488.02 586.33 488.2 576.97 488.25 567.6C488.29 559.56 488.97 550.95 486.01 543.3C481.29 531.13 468.74 526.89 456.7 525.69C417.33 521.79 380.54 508.24 347.37 486.46C327.21 473.22 305.12 477.11 283.43 476.35C271.23 475.92 258.93 476.83 246.83 475.62C215.71 472.51 198.61 454.44 198.91 426.22C199.2 399.4 214.58 383.14 244.65 378.61C253.06 377.34 261.71 377.74 270.2 376.88C300.21 373.85 312.83 360.8 312.95 333.06C313.08 304.11 298.88 288.32 268.07 286.91C235.17 285.4 202.11 287.23 169.22 285.58C137.35 283.98 122.37 269.4 120.29 242.1C117.9 210.8 132.09 193.25 163.58 191.32C187.92 189.83 212.44 191.38 236.79 190.07C262.81 188.67 280.96 176.77 283.63 148.4C286.3 120.06 273.96 103.89 244.22 96.53C208.18 87.61 193.74 71.61 196.4 43.52C199.1 14.94 216.81 1.36001 253.68 0.970008C296.41 0.530008 339.14 0.870002 381.87 0.870002C381.87 0.930002 381.87 0.99001 381.87 1.05001ZM635.97 268.93C636.49 198.51 599.21 144.54 537.17 122.58C476.79 101.21 410.28 121.15 370.42 172.57C303.88 258.4 346.06 378.16 453.08 406.51C471.9 411.5 491.63 412.19 490.46 440.69C489.45 465.53 502.41 459.65 514.31 447.78C544.5 417.67 575.66 388.39 604.05 356.65C626.61 331.44 637.37 300.23 635.97 268.93Z" fill="#331B69"/>
                            <path d="M50.11 201.32C80.69 201.63 96.45 214.66 95.79 239.06C95.17 261.92 76.88 275.75 47.51 275.56C16.99 275.36 0.639984 262.29 0.729984 238.15C0.829984 212.81 16.69 200.98 50.11 201.32Z" fill="#58C7F3"/>
                            <path d="M138.84 396.83C165.49 397.1 179.22 408.45 178.65 429.72C178.11 449.64 162.17 461.69 136.58 461.53C109.98 461.36 95.74 449.97 95.82 428.93C95.89 406.84 109.71 396.53 138.84 396.83Z" fill="#F3CC30"/>
                            <path d="M117.87 0.940005C156.39 1.33 176.25 17.74 175.42 48.48C174.64 77.28 151.6 94.7 114.6 94.46C76.15 94.21 55.56 77.75 55.67 47.34C55.79 15.42 75.78 0.510005 117.87 0.940005Z" fill="#E779C1"/>
                        </svg>


                    </button>
                </Link>

                <div className={"self-end h-full mr-12"}>
                    <div className="dropdown dropdown-end pt-3">
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
                                <IconUser className={"stroke-2"} size={40}/>
                            )}
                        </label>

                        <ul
                            tabIndex={0}
                            className=" p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 bg-neutral-content text-black"
                        >
                            {user ? (
                                <>
                                    <li>
                                        <button onClick={() => supabaseClient.auth.signOut()}>
                                            Sign out
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <Auth
                                        redirectTo={BASE_PATH + router.asPath}
                                        supabaseClient={supabaseClient}
                                        providers={["twitch"]}
                                        socialLayout="vertical"
                                        socialButtonSize="small"
                                        onlyThirdPartyProviders={true}
                                    />

                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};


export default Header;
