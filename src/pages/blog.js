import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = `Blog - ${data.site.siteMetadata.title}`
    const pageTitle = `All posts`
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={pageTitle} />
        <header>
          <h1 className="title is-3">{pageTitle}</h1>
        </header>
        <div>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const tags = node.frontmatter.tags || []
            return (
              <div key={node.fields.slug} className="content">
                <h2 className="title is-marginless is-5">
                  <Link to={`/blog${node.fields.slug}`}>{title}</Link>
                </h2>
                <p className="is-marginless"
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <span>{node.frontmatter.date}</span>
                <TagList tags={tags} />
              </div>
            )
          })}
        </div>
      </Layout>
    )
  }
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D MMMM YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
