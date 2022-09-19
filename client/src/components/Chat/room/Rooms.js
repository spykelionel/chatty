import React from 'react'
import Room from './Room'
import useRoom from './useRoom'

function Rooms() {
    const {rooms} = useRoom()
  return (
    <div className="bg-green">
       {
        rooms.map((room, idx)=>(
            <Room room={room} key={room.name}/>
        ))
       } 
    </div>
  )
}

export default Rooms