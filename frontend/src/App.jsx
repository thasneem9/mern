import { useState } from 'react'

function App() {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const res = await fetch('/api/users/getUsers') // Proxy will forward to backend
      const data = await res.json()
      setUsers(data)
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
    <h1>Basic MERN app</h1>
      <button onClick={getUsers}>Click to get list of all users</button>
      <ul>
        {users.map((user, idx) => (
          <li key={idx}>{user.username} ({user.email})</li>
        ))}
      </ul>
    </>
  )
}

export default App

