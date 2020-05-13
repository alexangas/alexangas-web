import * as React from "react"

import NavBar from "./navbar"
import Footer from "./footer"
import SEO from "./seo"

export const Layout = ({
  location,
  title,
  description = "",
  className = "",
  isMarginless = false,
  children,
}) => (
  <>
    <SEO title={title} description={description} />
    <NavBar location={location} />
    <section className="section">
      <div className={`container${className ? " " + className : ""}`}>
        <main>
          <div className="section">
            <header className={isMarginless && `is-marginless`}>
              <h1 className="title">{title}</h1>
            </header>
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </section>
  </>
)

export default Layout
