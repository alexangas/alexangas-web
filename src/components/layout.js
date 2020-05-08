import React from "react"
import NavBar from "./navbar"
import Footer from "./footer"

class Layout extends React.Component {
  render() {
    const { className, children } = this.props

    return (
      <>
        <NavBar location={this.props.location} />
        <section className="section">
          <div className={`container${className ? " " + className : ""}`}>
            <main>{children}</main>
          </div>
          <Footer />
        </section>
      </>
    )
  }
}

export default Layout
