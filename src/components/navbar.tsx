import * as React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import clsx from "clsx"

type NavBarProps = {
  location: Location
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export const PureNavBar = ({ location, data }: NavBarProps): JSX.Element => {
  const locationIsActive = (key: string): boolean => {
    const locationMap: Record<string, string> = {
      Blog: `/blog`,
      Contact: `/contact`,
    }

    return location.pathname.startsWith(locationMap[key])
  }

  return (
    <div className="navbar-wrapper">
      <nav
        className="container navbar is-transparent"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-menu is-active px-2 py-2">
          <div className="navbar-start is-size-4">
            <Link to="/" className="navbar-item has-text-weight-semibold">
              {data.site.siteMetadata.title}
            </Link>
          </div>

          <div className="navbar-end is-size-5">
            <Link
              to="/contact/"
              className={clsx(
                `navbar-item`,
                `is-tab`,
                locationIsActive(`Contact`) && `is-active`
              )}
            >
              Contact
            </Link>
            <Link
              to="/blog/"
              className={clsx(
                `navbar-item`,
                `is-tab`,
                locationIsActive(`Blog`) && `is-active`
              )}
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export const NavBar = (props: NavBarProps): JSX.Element => {
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
