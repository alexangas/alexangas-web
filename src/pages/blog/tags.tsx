import * as React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { kebabCase } from "case-anything"
import { FaTag } from "@react-icons/all-files/fa/FaTag"

import Layout from "../../components/layout"

type TagsPageProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const PureTagsPage = ({
  location,
  data: {
    allMarkdownRemark: { group },
  },
}: TagsPageProps): JSX.Element => (
  <Layout location={location} title={`Tags`}>
    <ul>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {group.map((tag: any) => (
        <li key={tag.fieldValue}>
          <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
            <span className="icon is-medium has-text-grey-dark">
              <FaTag />
            </span>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export const TagsPage = (props: TagsPageProps): JSX.Element => {
  const data = useStaticQuery(graphql`
    query TagsPageQuery {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "blog" } } }
        limit: 1000
      ) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return <PureTagsPage {...props} data={data} />
}

export default TagsPage
