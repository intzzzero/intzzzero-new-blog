#!/usr/bin/env python3
"""
마크다운 파일에서 **텍스트(괄호)** 패턴을 **텍스트\(괄호\)** 로 수정하는 스크립트

패턴: **...(...)**  →  **...\(...\)**
- ** 사이에 있는 텍스트 중 괄호가 포함된 경우만 이스케이프 처리
- 이미 이스케이프된 경우 (\( 또는 \))는 제외
"""

import re
import os
import glob
from pathlib import Path


def escape_parentheses_in_bold(match):
    """
    ** ** 사이의 텍스트에서 이스케이프되지 않은 괄호를 이스케이프 처리
    """
    content = match.group(1)

    # 이미 이스케이프된 괄호는 건드리지 않음
    # 이스케이프되지 않은 ( 와 ) 만 처리
    # (?<!\\) 는 앞에 백슬래시가 없는 경우만 매칭
    escaped_content = re.sub(r'(?<!\\)\(', r'\\(', content)
    escaped_content = re.sub(r'(?<!\\)\)', r'\\)', escaped_content)

    return f'**{escaped_content}**'


def process_file(filepath):
    """
    파일을 읽어서 패턴을 수정하고 저장
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        original_content = f.read()

    # ** ** 사이에 괄호가 포함된 패턴 찾기
    # [^*] 대신 [^*\n]을 사용하여 줄바꿈을 넘어가지 않도록 함
    # 또한 *가 아닌 모든 문자를 허용하되, 최소 매칭 사용
    pattern = r'\*\*([^*\n]*?\([^*\n]*?\)[^*\n]*?)\*\*'

    modified_content = re.sub(pattern, escape_parentheses_in_bold, original_content)

    if original_content != modified_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified_content)
        return True
    return False


def main():
    # content/blog 디렉토리의 모든 .md 파일 처리
    blog_dir = Path(__file__).parent.parent / 'content' / 'blog'
    md_files = glob.glob(str(blog_dir / '*.md'))

    print(f"총 {len(md_files)}개의 마크다운 파일 검색됨\n")

    modified_files = []
    for filepath in sorted(md_files):
        filename = os.path.basename(filepath)
        if process_file(filepath):
            modified_files.append(filename)
            print(f"✓ 수정됨: {filename}")

    print(f"\n{'='*50}")
    print(f"총 {len(modified_files)}개 파일 수정 완료")

    if modified_files:
        print("\n수정된 파일 목록:")
        for f in modified_files:
            print(f"  - {f}")


if __name__ == '__main__':
    main()
