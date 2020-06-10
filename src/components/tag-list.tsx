import * as React from "react"
import { Link } from "gatsby"
import { kebabCase } from "case-anything"
import { FaTag } from "react-icons/fa"

type TagListProps = {
  tags?: string[]
  noLinks?: boolean
}

const TagList = ({
  tags = [],
  noLinks = false,
}: TagListProps): JSX.Element | null =>
  tags ? (
    <div className="tags is-inline-block-tablet">
      {tags.map((tag) =>
        noLinks ? (
          <span key={tag} className="tag is-paddingless">
            <span className="icon mr-0">
              <FaTag />
            </span>
            {tag}
          </span>
        ) : (
          <Link
            key={tag}
            className="tag is-paddingless"
            to={`/blog/tags/${kebabCase(tag)}/`}
          >
            <span className="icon mr-0">
              <FaTag />
            </span>
            {tag}
          </Link>
        )
      )}
    </div>
  ) : null

export default TagList
