import React from "react"
import renderer from "react-test-renderer"

import { PureFooter as Footer } from "../footer"

describe("Footer", () => {
  it("renders root path correctly", () => {
    const data = {
      site: {
        siteMetadata: {
          title: "Name of Blog",
        },
      },
    }
    const location = {
      pathname: "/",
    }
    const testRenderer = renderer.create(
      <Footer location={location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders blog path correctly", () => {
    const data = {
      site: {
        siteMetadata: {
          title: "Name of Blog",
        },
      },
    }
    const location = {
      pathname: "/blog/",
    }
    const testRenderer = renderer.create(
      <Footer location={location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders non-blog path correctly", () => {
    const data = {
      site: {
        siteMetadata: {
          title: "Some Page",
        },
      },
    }
    const location = {
      pathname: "/some-page/",
    }
    const testRenderer = renderer.create(
      <Footer location={location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
