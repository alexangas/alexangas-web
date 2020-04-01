import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styles from "./footer.module.css"

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
    <footer className={styles.footer}>
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
