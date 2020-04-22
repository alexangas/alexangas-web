import React from "react"
import renderer from "react-test-renderer"

import { PureHeader as Header } from "../header"

describe("Header", () => {
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
      <Header location={location} data={data} />
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
      <Header location={location} data={data} />
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
      <Header location={location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
