import * as React from "react"
import { kebabCase } from "lodash"
import { Link, graphql, useStaticQuery } from "gatsby"
import { FaTag } from "react-icons/fa"

import Layout from "../../components/layout"

export const PureTagsPage = ({
  location,
  data: {
    allMdx: { group },
  },
}) => (
  <Layout location={location} title={`Tags`}>
    <ul>
      {group.map((tag) => (
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

export const TagsPage = (props) => {
  const data = useStaticQuery(graphql`
    query TagsPageQuery {
      allMdx(limit: 1000) {
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
