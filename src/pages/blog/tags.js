import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Link, graphql } from "gatsby"
import { FaTag } from "react-icons/fa"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

class TagsPage extends React.Component {
  render() {
    const {
      data: {
        allMdx: { group },
        site: {
          siteMetadata: { title },
        },
      },
    } = this.props

    return (
      <Layout location={this.props.location} title={title}>
        <SEO title="Tags" />
        <div className="section">
          <header>
            <h1 className="title is-marginless">Tags</h1>
          </header>
          <ul>
            {group.map((tag) => (
              <li key={tag.fieldValue}>
                <Link to={`/blog/tags/${kebabCase(tag.fieldValue)}/`}>
                  <span className="icon is-medium has-text-grey-dark">
                    <FaTag/>
                  </span>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    )
  }
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
