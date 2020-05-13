import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import PostSummary from "../components/post-summary"

export const PureBlog = ({ location, data }) => (
  <Layout location={location} title={`Posts`} className="blog">
    {data.allMdx.edges.map(({ node }) => (
      <PostSummary
        key={node.fields.slug}
        slug={node.fields.slug}
        title={node.frontmatter.title || node.fields.slug}
        description={node.frontmatter.description}
        excerpt={node.excerpt}
        dateTime={node.frontmatter.date}
        tags={node.frontmatter.tags || []}
      />
    ))}
  </Layout>
)

export const Blog = (props) => {
  const data = useStaticQuery(graphql`
    query BlogHomeQuery {
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
  `)

  return <PureBlog {...props} data={data} />
}

export default Blog
