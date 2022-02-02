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
        <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
      </div>
    )
}

export default PostPage