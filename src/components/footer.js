import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p className="is-marginless">&copy; {new Date().getFullYear()} {author}</p>
        <p>
          <small>
            Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </small>
        </p>
      </div>
    </footer>
  )
}

export default Footer
