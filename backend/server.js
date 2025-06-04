import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/db.js"
import userRoutes from './routes/userRoutes.js'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.use('/api/users', userRoutes)

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
