// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapIndex } from "next-sitemap";
import { GetServerSideProps } from "next";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { definitions } from "../../types/database";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const addSiteMaps = [];
  const { data, error } = await supabaseClient
    .from<definitions["front_page"]>("front_page")
    .select("*");

  if (data) {
    data.forEach((page) => {
      addSiteMaps.push("https://socialpoll.me/" + page.poll_instance);
    });
  }

  return getServerSideSitemapIndex(ctx, addSiteMaps);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {}
