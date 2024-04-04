import fs from 'fs';
import matter from 'gray-matter';
//@ts-ignore
import md from 'markdown-it';
import '../../styles/home.module.css';
import { callbackify } from 'util';

export async function getStaticPaths() {
  const files = fs.readdirSync('contents');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } } : {params: {slug: string}}) {
  const fileName = fs.readFileSync(`contents/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

const PostPage = (props: any) => {
    const { content, frontmatter } = props
    return (
      <div className='prose mx-auto p-4 bg-white rounded article-inner'>
        <h1>{frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: md(
          {
            // Enable HTML tags in source
            html:         true,

            // Use '/' to close single tags (<br />).
            // This is only for full CommonMark compatibility.
            xhtmlOut:     false,

            // Convert '\n' in paragraphs into <br>
            breaks:       true,

            // CSS language prefix for fenced blocks. Can be
            // useful for external highlighters.
            langPrefix:   'language-',

            // Autoconvert URL-like text to links
            linkify:      true,

            // Enable some language-neutral replacement + quotes beautification
            // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.mjs
            typographer:  true,

            // Double + single quotes replacement pairs, when typographer enabled,
            // and smartquotes on. Could be either a String or an Array.
            //
            // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
            // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
            quotes: '“”‘’',

            // Highlighter function. Should return escaped HTML,
            // or '' if the source string is not changed and should be escaped externally.
            // If result starts with <pre... internal wrapper is skipped.
            highlight: function (/*str, lang*/) { return ''; } 
          }
        ).render(content) }} />
      </div>
    )
}

export default PostPage