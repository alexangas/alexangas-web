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
    <footer>
      © {new Date().getFullYear()} {author}
      <p>
      <small>
        Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </small>
      </p>
    </footer>
  )
}

export default Footer
