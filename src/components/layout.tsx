import * as React from "react"
import { ReactNode } from "react"
import clsx from "clsx"

import NavBar from "./navbar"
import Footer from "./footer"
import SEO from "./seo"

type LayoutProps = {
  location: Location
  title: string
  description?: string
  className?: string
  isMarginless?: boolean
  children: ReactNode | ReactNode[]
}

export const Layout = ({
  location,
  title,
  description,
  className,
  isMarginless,
  children,
}: LayoutProps): JSX.Element => (
  <>
    <SEO title={title} description={description} />
    <NavBar location={location} />
    <section className="section">
      <div className={clsx(`container`, className)}>
        <main>
          <div className="section">
            <header className={clsx(isMarginless && `is-marginless`)}>
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
