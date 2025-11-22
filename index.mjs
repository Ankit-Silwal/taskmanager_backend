import dotenv from "dotenv"
import express from "express"
import connectDB from "./src/config/db.mjs"
import router from "./src/routes/authroutes.mjs"
import todorouter from "./src/routes/toDo.mjs"
dotenv.config()
connectDB()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  return res.json({ msg: "Server is running" })
})
app.use('/api/auth',router)
app.use('/api/todo',todorouter);
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})