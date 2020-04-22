import React from "react"
import Header from "./header"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div className="container">
        <Header location={this.props.location} />
        <main>{children}</main>
        <Footer />
      </div>
    )
  }
}

export default Layout
