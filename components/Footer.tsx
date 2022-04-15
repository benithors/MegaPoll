import React from "react";
import { IconGitHub, IconMail, IconTwitter } from "@supabase/ui";

interface IProps {}

const Footer = (props: IProps) => {
  return (
    <footer className="footer footer-center mt-16 rounded bg-base-200 bg-white p-10 text-base-content">
      <div className="grid grid-flow-col gap-4">
        <a className="link-hover link">About us</a>
        <a className="link-hover link">Privacy</a>
        <a className="link-hover link">Imprint</a>
        <a className="link-hover link">Contact</a>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a>
            <IconTwitter className={"stroke-2"} />
          </a>
          <a>
            <IconGitHub className={"stroke-2"} />
          </a>
          <a>
            <IconMail className={"stroke-2"} />
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2022 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
