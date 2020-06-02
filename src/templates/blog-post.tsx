import * as React from "react"
import { Link, graphql } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Layout from "../components/layout"
import PostMetadata from "../components/post-metadata"

type BlogPostTemplateProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

class BlogPostTemplate extends React.Component<BlogPostTemplateProps, unknown> {
  render(): JSX.Element {
    const { location, pageContext, data } = this.props
    const post = data.mdx
    const { previous, next } = pageContext

    return (
      <Layout
        location={location}
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        isMarginless={true}
      >
        <PostMetadata
          dateTime={post.frontmatter.date}
          tags={post.frontmatter.tags}
        />
        <article>
          <div className="content is-medium">
            <MDXRenderer>{post.body}</MDXRenderer>
          </div>
        </article>
        <hr />

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
