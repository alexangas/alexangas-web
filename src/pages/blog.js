import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostSummary from "../components/post-summary"

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = `Blog - ${data.site.siteMetadata.title}`
    const pageTitle = `Posts`
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle} className="blog">
        <SEO title={pageTitle} />
        <div className="section">
        <header>
          <h1 className="title">{pageTitle}</h1>
        </header>
          {posts.map(({ node }) =>
            <PostSummary key={node.fields.slug} slug={node.fields.slug} title={node.frontmatter.title || node.fields.slug} description={node.frontmatter.description} excerpt={node.excerpt} dateTime={node.frontmatter.date} tags={node.frontmatter.tags || []} />
          )}
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
            date
            title
            description
            tags
          }
        }
      }
    }
  }
`
