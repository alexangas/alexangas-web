import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import PostSummary from "../components/post-summary"

type BlogProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const PureBlog = ({ location, data }: BlogProps): JSX.Element => (
  <Layout location={location} title={`Posts`} className="blog">
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    {data.allMdx.edges.map(({ node }: any) => (
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

export const Blog = (props: BlogProps): JSX.Element => {
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
