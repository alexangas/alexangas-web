import * as React from "react"
import dayjs from "dayjs"

type TimestampProps = {
  dateTime?: string
}

const Timestamp = ({ dateTime }: TimestampProps) =>
  dateTime ? (
    <div className="is-inline-block-tablet">
      <small>
        <time dateTime={dateTime}>{dayjs(dateTime).format(`D MMMM YYYY`)}</time>
      </small>
    </div>
  ) : null

export default Timestamp
