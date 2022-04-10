import React from 'react'
import {IconGitHub, IconMail, IconTwitter} from "@supabase/ui";


interface IProps {

}

const Footer = (props: IProps) => {

    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
            <div className="grid grid-flow-col gap-4">
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Privacy</a>
                <a className="link link-hover">Imprint</a>
                <a className="link link-hover">Contact</a>
            </div>
            <div>
                <div className="grid grid-flow-col gap-4">
                    <a>
                        <IconTwitter className={"stroke-2"}/>
                    </a>
                    <a>
                        <IconGitHub className={"stroke-2"}/>
                    </a>
                    <a>
                        <IconMail className={"stroke-2"}/>
                    </a>
                </div>
            </div>
            <div>
                <p>Copyright © 2022 - All right reserved</p>
            </div>
        </footer>


    );
}

export default Footer
