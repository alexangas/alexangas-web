import React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostMetadata from "../components/post-metadata"

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
        <article className="section">
          <header>
            <h1 className="title is-marginless">{post.frontmatter.title}</h1>
            <PostMetadata
              dateTime={post.frontmatter.date}
              tags={post.frontmatter.tags}
            />
          </header>
          <div className="content is-medium">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
          <hr />
        </article>

        <nav
          className="pagination"
          role="navigation"
          aria-label="Post navigation"
        >
          {previous ? (
            <Link
              to={`/blog${previous.fields.slug}`}
              rel="prev"
              className="pagination-previous"
            >
              &#x2190; {previous.frontmatter.title}
            </Link>
          ) : (
            <span className="pagination-previous" />
          )}
          {next ? (
            <Link
              to={`/blog${next.fields.slug}`}
              rel="next"
              className="pagination-next"
            >
              {next.frontmatter.title} &#x2192;
            </Link>
          ) : (
            <span className="pagination-next" />
          )}
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
        author
      }
    }
    avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
      childImageSharp {
        fixed(width: 48, height: 48) {
          ...GatsbyImageSharpFixed
        }
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
