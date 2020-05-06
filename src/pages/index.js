import React from "react"
import "./mystyles.scss"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Alex Angas"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        <h1 className="subtitle">
          Hey people{" "}
          <span role="img" aria-label="wave emoji">
            👋
          </span>
        </h1>
        <p>You are on the home page of my web site. Welcome!</p>
        <p>
          There's nothing here right now, but when there is, you'll be the first
          to know.
        </p>
        <Link to="/blog/" className="button is-primary is-uppercase">
          Blog
        </Link>
      </Layout>
    )
  }
}

export default IndexPage
