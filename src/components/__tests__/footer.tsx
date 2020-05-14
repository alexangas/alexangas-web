import React from "react"
import renderer from "react-test-renderer"

import { PureFooter as Footer } from "../footer"

describe(`Footer`, () => {
  it(`renders social links`, () => {
    const data = {
      site: {
        siteMetadata: {
          social: {
            github: `ghusername`,
            linkedin: `liusername`,
          },
        },
      },
    }

    const testRenderer = renderer.create(<Footer data={data} />)
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders author`, () => {
    const data = {
      site: {
        siteMetadata: {
          author: `Author`,
        },
      },
    }

    const testRenderer = renderer.create(<Footer data={data} />)
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
