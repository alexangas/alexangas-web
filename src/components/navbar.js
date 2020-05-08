import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

export const PureNavBar = ({ data }) => {
  const { title } = data.site.siteMetadata

  return (
    <div className="navbar-wrapper">
      <nav
        className="container navbar is-transparent"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-menu is-active">
          <div className="navbar-start is-size-4">
            <Link to="/" className="navbar-item has-text-weight-semibold">
              {title}
            </Link>
          </div>

          <div className="navbar-end is-size-5">
            <Link to="/blog/" className="navbar-item">
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export const NavBar = (props) => {
  const data = useStaticQuery(graphql`
    query NavBarQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return <PureNavBar {...props} data={data} />
}

export default NavBar
