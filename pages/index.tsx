import Link from 'next/link';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { definitions } from '../types/database';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Container from '../components/structure/Container';
import Title from '../components/generic/Title';
import PaddingContainer from '../components/structure/PaddingContainer';
import PollPreviewCard from '../components/PollPreviewCard';
import { NextSeo } from 'next-seo';
import { Gradient } from 'lib/gradient';
import Script from 'next/script';

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  const { data } = await supabaseClient
    .from<definitions['front_page']>('front_page')
    .select('*');

  //todo BT handle error
  return {
    props: {
      frontPage: data
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 3600 seconds
    revalidate: 3600 // In seconds
  };
}

interface IProps {
  frontPage: definitions['front_page'][];
}

function Home(props: IProps) {
  const router = useRouter();

  function openInstance(poll_instance: string) {
    router.push({
      pathname: '/[id]',
      query: { id: poll_instance }
    });
  }

  return (
    <Container>
      <NextSeo
        title="Socialpoll.me - Share your Polls"
        description="Free realtime polls for you and your community"
        robotsProps={{
          nosnippet: true,
          notranslate: false,
          noimageindex: true,
          noarchive: false,
          maxSnippet: -1,
          maxImagePreview: 'standard',
          maxVideoPreview: -1
        }}
        twitter={{
          handle: '@socialpollme',
          site: '@socialpollme',
          cardType: 'summary_large_image'
        }}
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.socialpoll.me/',
          site_name: 'SocialPoll.me',
          images: [
            {
              url: 'https://pbs.twimg.com/profile_images/1522287055463714820/4TE0Pt3__400x400.jpg',
              width: 400,
              height: 400,
              alt: 'socialpoll.me',
              type: 'image/jpeg'
            }
          ]
        }}
      />

      <Title firstPart={'Share Your'} secondPart={'Opinion'} />
      <div
        className={
          'z-10 flex flex-col items-center self-center text-xl sm:text-2xl md:flex-row md:text-3xl'
        }
      >
        <div className={''}>
          <span>Free</span>

          <span
            className={
              'mx-1 mx-1 rounded bg-gradient-to-l from-secondary to-primary px-1 '
            }
          >
            realtime polls
          </span>
        </div>
        <div>
          for you
          <span className={'px-2 font-extrabold'}>and your community.</span>
        </div>
      </div>
      <button className=" btn btn-accent mt-4 mb-8 self-center text-2xl md:mt-14">
        <Link href="/create-poll">CREATE A POLL</Link>
      </button>

      <PaddingContainer
        className={
          'grid w-full grid-cols-1 gap-4 self-center rounded-2xl  sm:grid-cols-2 md:w-11/12 md:pt-8 xl:grid-cols-3'
        }
      >
        {props.frontPage.map((value: definitions['front_page'], index) => {
          return (
            <div key={index} className={'stream'}>
              <PollPreviewCard
                router={router}
                key={index}
                poll={value}
                openInstance={openInstance}
              />
            </div>
          );
        })}
      </PaddingContainer>
    </Container>
  );
}

export default Home;
