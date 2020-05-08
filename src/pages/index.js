import React from "react"
import "./mystyles.scss"

import Layout from "../components/layout"
import SEO from "../components/seo"

class IndexPage extends React.Component {
  render() {
    const siteTitle = "Alex Angas"

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Home" />
        <div className="section">
          <h1 className="title">
            Hey people{" "}
            <span role="img" aria-label="wave emoji">
              👋
            </span>
          </h1>
          <p>You are on the home page of my web site. Welcome!</p>
          <p>
            I'm a technical architect, living and working in London building
            useful things.
          </p>
        </div>
      </Layout>
    )
  }
}

export default IndexPage
