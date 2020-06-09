import React from "react"
import renderer from "react-test-renderer"

import PostSummary from "../post-summary"

describe(`PostSummary`, () => {
  it(`renders post summary with description`, () => {
    const testRenderer = renderer.create(
      <PostSummary
        slug="posttitle"
        title="Post Title"
        description="The description of the post."
        dateTime="2020-05-08T12:58"
        tags={[`tagA`, `tagB`, `tagC`]}
      />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders post summary with excerpt`, () => {
    const testRenderer = renderer.create(
      <PostSummary
        slug="posttitle"
        title="Post Title"
        excerpt="The excerpt of the post."
        dateTime="2020-05-08T12:58"
        tags={[`tagA`, `tagB`, `tagC`]}
      />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
