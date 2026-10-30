import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n/config";

export type Post = CollectionEntry<"blog">;

const WORDS_PER_MINUTE = 200;

/** `en/how-this-site-was-built` → `{ lang: "en", slug: "how-this-site-was-built" }` */
export function splitPostId(id: string): { lang: string; slug: string } {
  const [lang, ...rest] = id.split("/");
  return { lang, slug: rest.join("/") };
}

export function getPostSlug(post: Post): string {
  return splitPostId(post.id).slug;
}

/** Published posts for a language, newest first. Drafts are visible in dev only. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  const posts = await getCollection("blog", (post) => {
    const isPublished = import.meta.env.DEV || !post.data.draft;
    return isPublished && splitPostId(post.id).lang === lang;
  });
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function getReadingTime(post: Post): number {
  const words = post.body?.trim().split(/\s+/).length ?? 0;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
