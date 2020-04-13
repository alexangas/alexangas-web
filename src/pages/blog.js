import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagList from "../components/tag-list"

class Blog extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = `Blog - ${data.site.siteMetadata.title}`
    const posts = data.allMdx.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <div style={{ margin: "20px 0 40px" }}>
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            const tags = node.frontmatter.tags || []
            return (
              <div className="blog__post--summary" key={node.fields.slug}>
                <h3>
                  <Link to={`blog${node.fields.slug}`}>
                    {title}
                  </Link>
                </h3>
                {/* <small>{node.frontmatter.date}</small> */}
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
                <small>
                  <TagList tags={tags}/>
                </small>
              </div>
            )
          })}
        </div>
        <Link to="/" className="link-button">
          Go Home
        </Link>
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
            date(formatString: "D MMMM YYYY")
            title
            description
            tags
          }
        }
      }
    }
  }
`
