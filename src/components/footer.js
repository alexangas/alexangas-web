import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { IconContext } from "react-icons"
import { FaLinkedinIn } from "react-icons/fa"
import { IoLogoGithub } from "react-icons/io"

export const PureFooter = ({ data }) => {
  const {
    siteMetadata: {
      author,
      social: { github, linkedin },
    },
  } = data.site
  return (
    <div className="footer-wrapper">
      <footer className="container footer">
        <div className="columns">
          <div className="column">
            <IconContext.Provider value={{ size: "1em" }}>
              <div className="columns is-mobile is-gapless is-marginless">
                <div className="column is-narrow">
                  <span className="icon">
                    <IoLogoGithub />
                  </span>
                </div>
                <div className="column">
                  <a href={`https://github.com/${github}/`}>{github}</a>
                </div>
              </div>
              <div className="columns is-mobile is-gapless">
                <div className="column is-narrow">
                  <span className="icon">
                    <FaLinkedinIn />
                  </span>
                </div>
                <div className="column">
                  <a href={`https://www.linkedin.com/in/${linkedin}/`}>
                    {linkedin}
                  </a>
                </div>
              </div>
            </IconContext.Provider>
          </div>
          <div className="column">
            <div>
              &copy; {new Date().getFullYear()} {author} - <a href="https://www.xenger.co.uk/">Xenger Ltd</a>
            </div>
            <div>
              <small>
                Built with <a href="https://www.gatsbyjs.org/">Gatsby</a> and <a href="https://bulma.io/">Bulma</a>.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const Footer = (props) => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          author
          social {
            github
            linkedin
          }
        }
      }
    }
  `)

  return <PureFooter {...props} data={data} />
}

export default Footer
