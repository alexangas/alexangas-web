import React from "react"
import renderer from "react-test-renderer"

import { PureNavBar as NavBar } from "../navbar"

describe(`NavBar`, () => {
  it(`renders title`, () => {
    const data = {
      site: {
        siteMetadata: {
          title: `Site Title`,
        },
      },
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const testRenderer = renderer.create(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <NavBar location={{} as any} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
