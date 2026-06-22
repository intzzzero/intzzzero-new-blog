import { absoluteUrl } from '../utils/paths';
import type { APIRoute } from 'astro';

// Explicitly welcome search and AI/agent crawlers (GEO — "answer engine" discovery).
const AI_AGENTS = [
  // OpenAI
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  // Anthropic
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google / Apple AI
  'Google-Extended',
  'GoogleOther',
  'Applebot-Extended',
  // Others
  'CCBot',
  'Amazonbot',
  'Bytespider',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'DuckAssistBot',
  'Cohere-ai',
  'YouBot',
];

export const GET: APIRoute = () => {
  const lines = ['User-agent: *', 'Allow: /', ''];
  for (const agent of AI_AGENTS) {
    lines.push(`User-agent: ${agent}`, 'Allow: /', '');
  }
  lines.push(`Sitemap: ${absoluteUrl('/sitemap-index.xml')}`);
  lines.push('# LLM-friendly content index (non-standard hint)');
  lines.push(`# LLM-Content: ${absoluteUrl('/llms.txt')}`);

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
