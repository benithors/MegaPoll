import { getServerSideSitemap } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs';
import { definitions } from '../../types/database';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const fields = [];
  const { data } = await supabaseClient
    .from<definitions['sitemap']>('front_page')
    .select('*');

  if (data) {
    data.forEach((page) => {
      fields.push({
        loc: 'https://socialpoll.me/poll/' + page.poll_instance, // Absolute url
        lastmod: new Date().toISOString()
        // changefreq
        // priority
      });
    });
  }

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
