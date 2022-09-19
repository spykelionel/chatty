import React from "react"


const useRoom = (id = '') => {
    const [rooms, setRooms] = React.useState([])
    const [room, setRoom] = React.useState([])

    const storage = window.localStorage
    React.useEffect(() => {
        const url = `http://localhost:5002/api/room`
        const fetchRooms = async (url) => {
            const token = storage.getItem('token')
            try {
              const response = await fetch(url, {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              });
              const data = await response.json();
              console.log(data);
              setRooms(data);
            } catch (error) {
              console.log("Room Error.", error);
            }
          };

          fetchRooms(url)
    }, [])

    React.useEffect(() => {
        const url = `http://localhost:5002/api/room/${id}`
          const fetchRoom = async (url) => {
            const token = storage.getItem('token')
            try {
              const response = await fetch(url, {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "application/json"
                }
              });
              const data = await response.json();
              console.log(data);
              setRoom(data);
            } catch (error) {
              console.log("Room Error.", error);
            }
          };

          fetchRoom(url)
    }, [id])
    
    return { room, rooms }
}

export default useRoom