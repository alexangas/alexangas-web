import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

type NavBarProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PureNavBar = ({ location, data }: NavBarProps) => (
  <div className="navbar-wrapper">
    <nav
      className="container navbar is-transparent"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-menu is-active">
        <div className="navbar-start is-size-4">
          <Link to="/" className="navbar-item has-text-weight-semibold">
            {data.site.siteMetadata.title}
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

export const NavBar = (props: NavBarProps) => {
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