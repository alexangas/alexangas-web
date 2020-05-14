import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { FaLinkedinIn } from "react-icons/fa"
import { IoLogoGithub } from "react-icons/io"

type FooterProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any
}

export const PureFooter = ({ data }: FooterProps) => {
  const { site } = data
  const {
    siteMetadata: { author, social: { github = ``, linkedin = `` } = {} },
  } = site
  return (
    <div className="footer-wrapper">
      <footer className="container footer">
        <div className="columns">
          <div className="column">
            {github && (
              <div className="columns is-mobile is-gapless">
                <div className="column is-narrow">
                  <span className="icon">
                    <IoLogoGithub />
                  </span>
                </div>
                <div className="column">
                  <a href={`https://github.com/${github}/`}>{github}</a>
                </div>
              </div>
            )}
            {linkedin && (
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
            )}
          </div>
          <div className="column is-half">
            {author && (
              <div>
                &copy; {new Date().getFullYear()} {author} -{` `}
                <a href="https://www.xenger.co.uk/">Xenger Ltd</a>
              </div>
            )}
            <div>
              <small>
                Built with <a href="https://www.gatsbyjs.org/">Gatsby</a> and{` `}
                <a href="https://bulma.io/">Bulma</a>.
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export const Footer = (props: FooterProps) => {
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
