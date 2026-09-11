import { SITE_URL, absoluteUrl } from '../config/site';
import { buildBlogIndexPath, buildBlogPostPath, getPublishedBlogPosts } from '../lib/blog';

interface Entry {
  path: string;
  alternates?: Array<{ lang: 'en' | 'fr'; path: string }>;
}

const entries: Entry[] = [
  { path: '/en', alternates: [{ lang: 'fr', path: '/fr' }] },
  { path: '/fr', alternates: [{ lang: 'en', path: '/en' }] },
  { path: '/en/trust/ai', alternates: [{ lang: 'fr', path: '/fr/trust/ai' }] },
  { path: '/fr/trust/ai', alternates: [{ lang: 'en', path: '/en/trust/ai' }] },
  { path: '/en/privacy', alternates: [{ lang: 'fr', path: '/fr/privacy' }] },
  { path: '/fr/privacy', alternates: [{ lang: 'en', path: '/en/privacy' }] },
  { path: '/en/terms', alternates: [{ lang: 'fr', path: '/fr/terms' }] },
  { path: '/fr/terms', alternates: [{ lang: 'en', path: '/en/terms' }] },
  { path: '/en/use-cases', alternates: [{ lang: 'fr', path: '/fr/cas-usages' }] },
  { path: '/fr/cas-usages', alternates: [{ lang: 'en', path: '/en/use-cases' }] },
  { path: '/en/use-cases/everyday', alternates: [{ lang: 'fr', path: '/fr/cas-usages/quotidien' }] },
  { path: '/fr/cas-usages/quotidien', alternates: [{ lang: 'en', path: '/en/use-cases/everyday' }] },
  { path: '/en/use-cases/developers', alternates: [{ lang: 'fr', path: '/fr/cas-usages/developpeurs' }] },
  { path: '/fr/cas-usages/developpeurs', alternates: [{ lang: 'en', path: '/en/use-cases/developers' }] },
  { path: '/en/use-cases/data-teams', alternates: [{ lang: 'fr', path: '/fr/cas-usages/data' }] },
  { path: '/fr/cas-usages/data', alternates: [{ lang: 'en', path: '/en/use-cases/data-teams' }] },
  { path: '/en/use-cases/tradespeople', alternates: [{ lang: 'fr', path: '/fr/cas-usages/techniciens' }] },
  { path: '/fr/cas-usages/techniciens', alternates: [{ lang: 'en', path: '/en/use-cases/tradespeople' }] },
  { path: '/en/how-it-works', alternates: [{ lang: 'fr', path: '/fr/comment-ca-marche' }] },
  { path: '/fr/comment-ca-marche', alternates: [{ lang: 'en', path: '/en/how-it-works' }] },
  { path: '/en/guide', alternates: [{ lang: 'fr', path: '/fr/guide' }] },
  { path: '/fr/guide', alternates: [{ lang: 'en', path: '/en/guide' }] },
  { path: '/en/organize-ai-conversations', alternates: [{ lang: 'fr', path: '/fr/organiser-conversations-chatgpt' }] },
  { path: '/fr/organiser-conversations-chatgpt', alternates: [{ lang: 'en', path: '/en/organize-ai-conversations' }] },
  { path: '/en/secure-ai-for-small-business', alternates: [{ lang: 'fr', path: '/fr/securiser-ia-pme' }] },
  { path: '/fr/securiser-ia-pme', alternates: [{ lang: 'en', path: '/en/secure-ai-for-small-business' }] },
  { path: '/en/european-chatgpt-alternative', alternates: [{ lang: 'fr', path: '/fr/alternative-europeenne-chatgpt' }] },
  { path: '/fr/alternative-europeenne-chatgpt', alternates: [{ lang: 'en', path: '/en/european-chatgpt-alternative' }] },
  { path: '/en/blog', alternates: [{ lang: 'fr', path: '/fr/blog' }] },
];

function escapeXml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export async function GET() {
  const [publishedEnglishPosts, publishedFrenchPosts] = await Promise.all([
    getPublishedBlogPosts('en'),
    getPublishedBlogPosts('fr')
  ]);
  const englishByFrenchSlug = new Map(
    publishedEnglishPosts
      .filter((post) => post.data.translationOf)
      .map((post) => [post.data.translationOf!, post])
  );
  const dynamicEntries: Entry[] = [
    ...publishedEnglishPosts.map((post) => ({
      path: buildBlogPostPath(post),
      alternates: post.data.translationOf ? [{ lang: 'fr' as const, path: `/fr/blog/${post.data.translationOf}` }] : undefined
    })),
    ...publishedFrenchPosts.map((post) => {
      const englishPost = englishByFrenchSlug.get(post.slug);
      return {
        path: buildBlogPostPath(post),
        alternates: englishPost ? [{ lang: 'en' as const, path: buildBlogPostPath(englishPost) }] : undefined
      };
    })
  ];
  const uniqueEntries = new Map<string, Entry>();
  for (const entry of [...entries, ...dynamicEntries]) {
    uniqueEntries.set(entry.path, entry);
  }
  const allEntries = [...uniqueEntries.values()];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${allEntries
  .map((entry) => {
    const loc = absoluteUrl(entry.path, SITE_URL);
    const alternates = entry.alternates
      ?.map((alternate) => `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${escapeXml(absoluteUrl(alternate.path, SITE_URL))}" />`)
      .join('\n') ?? '';

    return `  <url>
    <loc>${escapeXml(loc)}</loc>
${alternates ? `${alternates}\n` : ''}  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8'
    }
  });
}
