import React from "react"
import renderer from "react-test-renderer"

import TagList from "../tag-list"

describe("TagList", () => {
  it("renders no tags", () => {
    const testRenderer = renderer.create(
      <TagList />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders one tag", () => {
    const testRenderer = renderer.create(
      <TagList tags={['tag1']} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("renders multiple tags", () => {
    const testRenderer = renderer.create(
      <TagList tags={['tag1', 'tag2', 'tag3']} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
