import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE_URL, absoluteUrl } from '../config/site';

export type BlogEntry = CollectionEntry<'blog'>;

const WORDS_PER_MINUTE = 220;

export function formatBlogDate(date: Date, locale = 'fr-FR') {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function getReadingTimeMinutes(text: string | undefined) {
  const words = (text ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function buildBlogIndexPath(lang: BlogEntry['data']['lang']) {
  return `/${lang}/blog`;
}

export function buildBlogPostPath(entry: Pick<BlogEntry, 'id' | 'data'>) {
  return `${buildBlogIndexPath(entry.data.lang)}/${entry.data.publicSlug ?? entry.id}`;
}

export function getBlogCanonicalUrl(entry: Pick<BlogEntry, 'id' | 'data'>, baseUrl: string = SITE_URL) {
  return absoluteUrl(buildBlogPostPath(entry), baseUrl);
}

export async function getPublishedBlogPosts(lang?: BlogEntry['data']['lang']) {
  const posts = await getCollection('blog', ({ data }) => !data.draft && (!lang || data.lang === lang));
  return sortBlogPosts(posts);
}

export function sortBlogPosts<T extends Pick<BlogEntry, 'data'>>(posts: T[]) {
  return [...posts].sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function getRelatedPosts(entry: BlogEntry, allPosts: BlogEntry[], limit = 3) {
  const currentTags = new Set(entry.data.tags.map((tag) => tag.toLowerCase()));

  return allPosts
    .filter((candidate) => candidate.id !== entry.id)
    .map((candidate) => {
      const sharedTags = candidate.data.tags.filter((tag) => currentTags.has(tag.toLowerCase())).length;
      const sameCategory = candidate.data.category.toLowerCase() === entry.data.category.toLowerCase() ? 1 : 0;

      return {
        post: candidate,
        score: sameCategory * 10 + sharedTags
      };
    })
    .filter((candidate) => candidate.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime())
    .slice(0, limit)
    .map((candidate) => candidate.post);
}
