import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"

class BlogPostTemplate extends React.Component {
  render() {
    const { data } = this.props
    const post = data.mdx
    const siteTitle = `Blog - ${data.site.siteMetadata.title}`
    const { previous, next } = this.props.pageContext

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <article className="blog__post--article">
          <header>
            <h1>{post.frontmatter.title}</h1>
            <small>{post.frontmatter.date}</small>
            <small>
              <TagList tags={post.frontmatter.tags} />
            </small>
          </header>
          <MDXRenderer>{post.body}</MDXRenderer>
          <hr />
          {/*<footer>{<Bio />}</footer>*/}
        </article>

        <nav className="blog__post--nav">
          <ul>
            <li>
              {previous && (
                <Link to={`/blog${previous.fields.slug}`} rel="prev">
                  &#x2190; {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/blog${next.fields.slug}`} rel="next">
                  {next.frontmatter.title} &#x2192;
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        description
        tags
      }
    }
  }
`
