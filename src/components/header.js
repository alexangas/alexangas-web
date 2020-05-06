import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export const PureHeader = ({ location, data }) => {
  const { title } = data.site.siteMetadata

  const rootPath = `${__PATH_PREFIX__}/`
  const blogPath = `${__PATH_PREFIX__}/blog/`
  let header

  if (location.pathname === rootPath || location.pathname === blogPath) {
    header = (
      <h1 className="title">
        <Link to={`/`} className="has-text-dark">
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3 className="subtitle">
        <Link to={`/blog/`}>{title}</Link>
      </h3>
    )
  }

  return <header>{header}</header>
}

export const Header = (props) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <PureHeader {...props} data={data} />
}

export default Header
