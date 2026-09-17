import { SITE_URL } from '../config/site';

export function GET() {
  return new Response(`# AI training crawlers — disallowed site-wide
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: anthropic-ai
User-agent: CCBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: meta-externalagent
User-agent: Amazonbot
User-agent: Diffbot
User-agent: omgili
User-agent: ImagesiftBot
User-agent: AI2Bot
Disallow: /

# Search & retrieval — allowed
User-agent: Googlebot
User-agent: Bingbot
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /

User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
