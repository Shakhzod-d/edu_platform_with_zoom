import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState('')
  const navigate = useNavigate()

  const handleFormSubmit = (ev) => {
    ev.preventDefault()
    navigate('/student/room/' + roomCode)
  }

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Enter room code</label>
          <input
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            type="text"
            required
            placeholder="Enter room number"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
