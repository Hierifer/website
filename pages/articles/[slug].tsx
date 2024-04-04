import fs from 'fs';
import matter from 'gray-matter';
//@ts-ignore
import md from 'markdown-it';
import '../../styles/home.module.css';
import { useEffect, useState } from 'react';
import { callbackify } from 'util';
import { Avatar } from '@arco-design/web-react';
import { AUTHORS_DB } from '.';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
import './code.module.css';

hljs.registerLanguage('javascript', javascript);

interface TFrontmatter {
  title: string
  slug: string
  uid: string
  ctime: string
}

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
  const { data, content } = matter(fileName);
  const frontmatter: TFrontmatter = {title: data.title || '', slug: data.slug || '', uid: data.uid || '', ctime: data.ctime || ''}
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

const PostPage = (props: {frontmatter: TFrontmatter, content: string}) => {
    const { content, frontmatter } = props
    const [mdcontent, setContent] = useState('')


    useEffect(() => {
      // const highlightedCode = hljs.highlight(
      //   '<span>Hello World!</span>',
      //   { language: 'xml' }
      // ).value
      setContent(
        md(
        {
          // Enable HTML tags in source
          html:         true,
  
          // Use '/' to close single tags (<br />).
          // This is only for full CommonMark compatibility.
          xhtmlOut:     true,
  
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
          highlight: function (str, lang) {
            if (lang && hljs.getLanguage(lang)) {
              try {
                return '<div><pre><code class="code-block">' +
                hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                '</code></pre></div>';
              } catch (__) {}
            }
        
            return ''; // use external default escaping
          }
        }
      ).render(content)
      )
      
    })

    return (
      <div className='prose mx-auto p-4 bg-white rounded article-inner'>
        <h1>{frontmatter.title}</h1>
        <div className="flex" style={{'marginBottom': '24px'}}>
          <div className="flex mr-2">
            <Avatar size={22} className="mr-1"><img alt='avatar' src={AUTHORS_DB[frontmatter.uid].icon||''} /></Avatar>
            <span className="text-gray-700 text-sm">{AUTHORS_DB[frontmatter.uid].name || '未署名'}</span>
          </div>
          {
            (() => {
              return frontmatter.ctime? (<span className="text-gray-500 text-sm">创建于 {new Date(frontmatter.ctime).toDateString()}</span>) : (<></>)
            })()
          }
        </div>
        <div dangerouslySetInnerHTML={{ __html: mdcontent }} />
      </div>
    )
}

export default PostPage