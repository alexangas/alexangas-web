import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

const Header = (props) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { title } = data.site.siteMetadata

  const { location } = props
  const rootPath = `${__PATH_PREFIX__}/`
  const blogPath = `${__PATH_PREFIX__}/blog/`
  const headerLinkStyle = {
    textDecorationLine: `none`,
    color: `inherit`,
  }
  let header

  if (location.pathname === rootPath || location.pathname === blogPath) {
    header = (
      <h1
        style={{
          ...scale(1.5),
        }}
      >
        <Link
          style={headerLinkStyle}
          to={location.pathname === blogPath ? `/blog/` : `/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    header = (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link style={headerLinkStyle} to={`/blog/`}>
          {title}
        </Link>
      </h3>
    )
  }

  return <header>{header}</header>
}

export default Header
