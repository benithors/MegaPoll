import React from 'react';
import { IconGitHub, IconMail, IconTwitter } from '@supabase/ui';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer footer-center mt-16 rounded bg-base-200 p-10 text-base-content">
      <div className="grid grid-flow-row gap-4 sm:grid-flow-col ">
        <Link href="/about">
          <a className="link-hover link">About</a>
        </Link>

        <Link href="/privacy">
          <a className="link-hover link">Privacy</a>
        </Link>

        <Link href="/imprint">
          <a className="link-hover link">Imprint</a>
        </Link>

        <Link href="/contact">
          <a className="link-hover link">Contact</a>
        </Link>
        <Link href="/tos">
          <a className="link-hover link">Terms of Service</a>
        </Link>
      </div>
      <div>
        <div className="grid grid-flow-row gap-4 sm:grid-flow-col">
          <Link href="https://twitter.com/benithors" passHref={true}>
            <a aria-label={'twitter to the creator of this website'}>
              <IconTwitter className={'stroke-2'} />
            </a>
          </Link>
          <Link href="https://github.com/benithors" passHref={true}>
            <a aria-label={'github to the creator of this website'}>
              <IconGitHub className={'stroke-2'} />
            </a>
          </Link>
          <a
            href="mailto:socialpoll.me@gmail.com"
            aria-label={'e-mail to the creator of this website'}
          >
            <IconMail className={'stroke-2'} />
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
