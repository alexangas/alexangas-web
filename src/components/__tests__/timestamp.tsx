import React from "react"
import renderer from "react-test-renderer"

import Timestamp from "../timestamp"

describe(`Timestamp`, () => {
  it(`renders no timestamp`, () => {
    const testRenderer = renderer.create(<Timestamp />)
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders timestamp`, () => {
    const testRenderer = renderer.create(
      <Timestamp dateTime="2020-05-08T12:58" />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
