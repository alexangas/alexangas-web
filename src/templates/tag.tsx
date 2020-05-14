import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostSummary from "../components/post-summary"

type TagTemplateProps = {
  location: Location
  pageContext: any
  data: any
}

class TagTemplate extends React.Component<TagTemplateProps, {}> {
  render() {
    const { pageContext, data, location } = this.props
    const { tag } = pageContext
    const { edges, totalCount } = data.allMdx

    return (
      <Layout location={location} title={`${tag} (${totalCount})`}>
        <h2 className="subtitle">
          <Link to="/blog/tags">All tags</Link>
        </h2>
        {edges.map(({ node }) => (
          <PostSummary
            key={node.fields.slug}
            slug={node.fields.slug}
            title={node.frontmatter.title || node.fields.slug}
            description={node.frontmatter.description}
            excerpt={node.excerpt}
            dateTime={node.frontmatter.date}
          />
        ))}
      </Layout>
    )
  }
}

export default TagTemplate

export const pageQuery = graphql`
  query Tag($tag: String) {
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
