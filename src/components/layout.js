import React from "react"
import NavBar from "./navbar"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { children } = this.props

    return (
      <>
        <NavBar location={this.props.location} />
        <section className="section">
          <div className="container">
            <main>{children}</main>
          </div>
        </section>
        <Footer />
      </>
    )
  }
}

export default Layout
