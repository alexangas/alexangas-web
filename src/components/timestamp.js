import React from "react"
import dayjs from "dayjs"

const Timestamp = ({ dateTime }) =>
  dateTime ? (
    <div className="is-inline-block-tablet">
      <small>
        <time dateTime={dateTime}>{dayjs(dateTime).format(`D MMMM YYYY`)}</time>
      </small>
    </div>
  ) : null

export default Timestamp
