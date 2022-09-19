import React from 'react'
import { Link } from 'react-router-dom'

function Room({ room }) {
  return (
    <li>
        <Link to={`/room/${room._id}`}>
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1940306/chat_avatar_06.jpg"
            alt=""
          />
          <div>
            <h2>{room.name}</h2>
            <h3>
              <span className="status green"></span>
              <span>{'public room'}</span>
            </h3>
          </div>
        </Link>
    </li>
  )
}

export default Room