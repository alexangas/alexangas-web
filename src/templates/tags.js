import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostSummary from "../components/post-summary"

class TagTemplate extends React.Component {
  render() {
    const { pageContext, data } = this.props
    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx
    const siteTitle = `${tag} tag`
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with "${tag}"`

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} />
        <div className="section">
        <header>
          <h1 className="title is-marginless">{tagHeader}</h1>
          <div>
            <Link to="/blog/tags">All tags</Link>
          </div>
        </header>
        <ul>
          {edges.map(({ node }) =>
            <PostSummary key={node.fields.slug} slug={node.fields.slug} title={node.frontmatter.title || node.fields.slug} description={node.frontmatter.description} excerpt={node.excerpt} dateTime={node.frontmatter.date} />
          )}
        </ul>
        </div>
      </Layout>
    )
  }
}

TagTemplate.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default TagTemplate

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
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
          }
        }
      }
    }
  }
`
