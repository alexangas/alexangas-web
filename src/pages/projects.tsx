import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import ProjectSummary from "../components/project-summary"

type ProjectListProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const PureProjectList = ({
  location,
  data,
}: ProjectListProps): JSX.Element => (
  <Layout location={location} title={`Projects`} className="projects">
    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
    {data.allMarkdownRemark.nodes.map((node: any) => (
      <ProjectSummary
        key={node.fields.slug}
        title={node.frontmatter.title || node.fields.slug}
        description={node.frontmatter.description}
        excerpt={node.excerpt}
        tags={node.frontmatter.tags}
        link={node.frontmatter.link || ``}
      />
    ))}
  </Layout>
)

export const ProjectList = (props: ProjectListProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query ProjectListQuery {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "project" } } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        nodes {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            description
            tags
            link
          }
        }
      }
    }
  `)

  return <PureProjectList {...props} data={data} />
}

export default ProjectList
