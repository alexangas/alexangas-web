import React from "react"
import renderer from "react-test-renderer"

import { PureNavBar as NavBar } from "../navbar"

describe("NavBar", () => {
  it("renders title", () => {
    const data = {
      site: {
        siteMetadata: {
          title: "Site Title",
        },
      },
    }

    const testRenderer = renderer.create(<NavBar data={data} />)
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
