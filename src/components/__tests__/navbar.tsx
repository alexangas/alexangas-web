import React from "react"
import renderer from "react-test-renderer"

import { PureNavBar as NavBar } from "../navbar"

describe(`NavBar`, () => {
  it(`renders title`, () => {
    const location: Partial<Location> = {
      pathname: `nowhere`
    }

    const data = {
      site: {
        siteMetadata: {
          title: `Site Title`,
        },
      },
    }

    const testRenderer = renderer.create(
      <NavBar location={location as Location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders Contact`, () => {
    const location: Partial<Location> = {
      pathname: `/contact`
    }

    const data = {
      site: {
        siteMetadata: {
          title: `Contact`,
        },
      },
    }

    const testRenderer = renderer.create(
      <NavBar location={location as Location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders Blog`, () => {
    const location: Partial<Location> = {
      pathname: `/blog/post`
    }

    const data = {
      site: {
        siteMetadata: {
          title: `Blog Post`,
        },
      },
    }

    const testRenderer = renderer.create(
      <NavBar location={location as Location} data={data} />
    )
    const tree = testRenderer.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
