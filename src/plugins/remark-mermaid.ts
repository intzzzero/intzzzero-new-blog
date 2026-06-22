import { visit } from 'unist-util-visit';
import type { Root, Code, Html } from 'mdast';

/**
 * Turn ```mermaid code fences into `<pre class="mermaid">…</pre>` so Shiki
 * leaves them alone and the client-side mermaid runtime renders them.
 * See the mermaid bootstrap in src/pages/[...slug].astro.
 */
export function remarkMermaid() {
  return (tree: Root) => {
    visit(tree, 'code', (node: Code, index, parent) => {
      if (node.lang !== 'mermaid' || !parent || index == null) return;
      const escaped = node.value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      const html: Html = { type: 'html', value: `<pre class="mermaid">${escaped}</pre>` };
      parent.children[index] = html;
    });
  };
}
