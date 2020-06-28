import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PostSummary from "../components/post-summary"

type TagTemplateProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageContext: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

class TagTemplate extends React.Component<TagTemplateProps, unknown> {
  render(): JSX.Element {
    const { pageContext, data, location } = this.props
    const { tag } = pageContext
    const { nodes, totalCount } = data.allMarkdownRemark

    return (
      <Layout location={location} title={`${tag} (${totalCount})`}>
        <h2 className="subtitle">
          <Link to="/blog/tags">All tags</Link>
        </h2>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {nodes.map((node: any) => (
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
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      totalCount
      nodes {
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
`
