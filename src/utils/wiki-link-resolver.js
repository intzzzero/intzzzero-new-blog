// 포스트 제목을 슬러그로 변환하는 함수
export const titleToSlug = title => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// 위키링크를 실제 포스트 슬러그로 해결하는 함수
export const resolveWikiLink = (linkText, allPosts) => {
  // 정확한 제목 매칭 시도
  const exactMatch = allPosts.find(post => post.frontmatter.title === linkText);

  if (exactMatch) {
    return exactMatch.fields.slug;
  }

  // 부분 매칭 시도 (대소문자 무시)
  const partialMatch = allPosts.find(post =>
    post.frontmatter.title.toLowerCase().includes(linkText.toLowerCase())
  );

  if (partialMatch) {
    return partialMatch.fields.slug;
  }

  // 슬러그 기반 매칭 시도
  const targetSlug = titleToSlug(linkText);
  const slugMatch = allPosts.find(post =>
    post.fields.slug.includes(targetSlug)
  );

  if (slugMatch) {
    return slugMatch.fields.slug;
  }

  // 매칭되는 포스트가 없으면 null 반환
  return null;
};

// 백링크를 찾는 함수 (어떤 포스트가 현재 포스트를 참조하는지)
export const findBacklinks = (currentPost, allPosts) => {
  const currentTitle = currentPost.frontmatter.title;
  const backlinks = [];

  allPosts.forEach(post => {
    if (post.id !== currentPost.id && post.rawMarkdownBody) {
      // [[제목]] 형식의 위키링크 찾기
      const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
      let match;

      while ((match = wikiLinkRegex.exec(post.rawMarkdownBody)) !== null) {
        const linkText = match[1];
        if (
          linkText === currentTitle ||
          linkText.toLowerCase() === currentTitle.toLowerCase()
        ) {
          backlinks.push({
            title: post.frontmatter.title,
            slug: post.fields.slug,
            date: post.frontmatter.date,
            category: post.frontmatter.category,
          });
          break; // 같은 포스트에서 여러 번 언급되어도 한 번만 추가
        }
      }
    }
  });

  return backlinks;
};
