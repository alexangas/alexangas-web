import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/contact"

class ContactPage extends React.Component {
  render() {
    const pageTitle = `Contact me`

    return (
      <Layout location={this.props.location} className="contact">
        <SEO title={pageTitle} />
        <div className="section">
          <header>
            <h1 className="title">{pageTitle}</h1>
          </header>
          <Contact />
        </div>
      </Layout>
    )
  }
}

export default ContactPage
