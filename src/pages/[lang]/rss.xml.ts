import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { localeTags, type Lang } from "@/i18n/config";
import { langStaticPaths, localizePath, useTranslations } from "@/i18n/utils";
import { getPostSlug, getPosts } from "@/lib/posts";

export const getStaticPaths = langStaticPaths;

export const GET: APIRoute = async ({ params, site }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const posts = await getPosts(lang);

  return rss({
    title: `${t("site.title")} — ${t("blog.title")}`,
    description: t("blog.description"),
    site: site!,
    customData: `<language>${localeTags[lang]}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: localizePath(lang, `/blog/${getPostSlug(post)}`),
    })),
  });
};
