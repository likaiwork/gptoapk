#!/usr/bin/env python3
"""Insert new posts from text files into each language's blog page."""

import os

LANGS = ['fi', 'tl', 'uk', 'ur']
BASE = '/Users/likai/Documents/XCodePorject/gptoapk/src/app'

for lang in LANGS:
    fpath = os.path.join(BASE, lang, 'blog/[slug]/page.tsx')
    txt_path = f'/Users/likai/Documents/XCodePorject/gptoapk/new_posts_{lang}.txt'

    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    with open(txt_path, 'r', encoding='utf-8') as f:
        new_posts = f.read().rstrip()

    # Find the trailing ]; that ends the posts array
    # Pattern: the last occurrence of "]," followed by newline and "];"
    idx = content.rfind('];')
    if idx == -1:
        print(f"ERROR: Could not find '];' in {fpath}")
        continue

    # Insert new posts before the closing ];
    new_content = content[:idx] + new_posts + '\n' + content[idx:]

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"✅ {lang}: Inserted 2 posts")

print("\nAll done!")
