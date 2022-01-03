import clsx from "clsx"

type NavBarProps = {
  url: URL;
}

export default function NavBar({url}: NavBarProps) {
  const locationIsActive = (key: string): boolean => {
    const locationMap: Record<string, string> = {
      Blog: `/blog`,
      Contact: `/contact`,
    }

    return url.pathname.startsWith(locationMap[key])
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
            <a href="/" className="navbar-item has-text-weight-semibold">
              Alex Angas
            </a>
          </div>

          <div className="navbar-end is-size-5">
            <a href="/contact/"
              className={clsx(
                `navbar-item`,
                `is-tab`,
                locationIsActive(`Contact`) && `is-active`
              )}
            >
              Contact
            </a>
            <a href="/blog/"
              className={clsx(
                `navbar-item`,
                `is-tab`,
                locationIsActive(`Blog`) && `is-active`
              )}
            >
              Blog
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}
