import { visit } from 'unist-util-visit';
import type { Root, Text, Link } from 'mdast';

const WIKI = /\[\[([^\]]+)\]\]/g;

/** Slugify a wiki target the same way the legacy Gatsby resolver did. */
function slugify(name: string): string {
  return name.trim().replace(/\s+/g, '-').toLowerCase();
}

/**
 * `[[Some Post]]` -> internal link to `/some-post/`.
 * Only visits `text` nodes, so `[[Prototype]]` inside inline code (a `code`
 * node) is left untouched.
 */
export function remarkWikiLink() {
  return (tree: Root) => {
    visit(tree, 'text', (node: Text, index, parent) => {
      if (!parent || index == null) return;
      const value = node.value;
      WIKI.lastIndex = 0;
      if (!WIKI.test(value)) return;
      WIKI.lastIndex = 0;

      const children: (Text | Link)[] = [];
      let last = 0;
      let m: RegExpExecArray | null;
      while ((m = WIKI.exec(value)) !== null) {
        if (m.index > last) children.push({ type: 'text', value: value.slice(last, m.index) });
        const name = m[1].trim();
        children.push({
          type: 'link',
          url: `/${slugify(name)}/`,
          data: { hProperties: { className: 'wiki-link' } },
          children: [{ type: 'text', value: name }],
        });
        last = m.index + m[0].length;
      }
      if (last < value.length) children.push({ type: 'text', value: value.slice(last) });

      parent.children.splice(index, 1, ...children);
      return index + children.length;
    });
  };
}
