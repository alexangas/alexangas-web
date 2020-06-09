import * as React from "react"
import TagList from "./tag-list"
import { FaExternalLinkAlt } from "react-icons/fa"

type ProjectSummaryProps = {
  title: string
  description?: string
  excerpt?: string
  tags: string[]
  link?: string
}

const ProjectSummary = ({
  title,
  description,
  excerpt,
  tags,
  link = ``,
}: ProjectSummaryProps): JSX.Element => (
  <div className="card">
    {/*<div className="card-image"></div>*/}
    <div className="card-content">
      <div className="content">
        <p className="title is-4 is-marginless">{title}</p>
        {link && (
          <div className="my-2">
            <FaExternalLinkAlt />
            <a
              className="ml-1"
              href={`https://${link}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link}
            </a>
          </div>
        )}
        <p
          className="is-marginless mb-2"
          dangerouslySetInnerHTML={{
            __html: (description || excerpt) as string,
          }}
        />
        <TagList tags={tags} noLinks={true} />
      </div>
    </div>
  </div>
)

export default ProjectSummary
