import React from "react"
import renderer from "react-test-renderer"

import ProjectSummary from "../project-summary"

describe(`ProjectSummary`, () => {
  it(`renders project summary with description`, () => {
    const testRenderer = renderer.create(
      <ProjectSummary
        title="Project Title"
        description="The description of the project."
        tags={[`tagA`, `tagB`, `tagC`]}
      />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders project summary with excerpt`, () => {
    const testRenderer = renderer.create(
      <ProjectSummary
        title="Project Title"
        excerpt="The excerpt of the project."
        tags={[`tagA`, `tagB`, `tagC`]}
      />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders project summary with link`, () => {
    const testRenderer = renderer.create(
      <ProjectSummary
        title="Project Title"
        description="The description of the project."
        tags={[`tagA`, `tagB`, `tagC`]}
        link="website.alexangas.com"
      />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
