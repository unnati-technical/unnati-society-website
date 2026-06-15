import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'unnati-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  })
})

// TODO: Add routes as the API grows:
// app.use('/api/auth', authRouter)
// app.use('/api/users', usersRouter)
// app.use('/api/volunteers', volunteersRouter)
// app.use('/api/schools', schoolsRouter)
// app.use('/api/students', studentsRouter)
// app.use('/api/donations', donationsRouter)
// app.use('/api/events', eventsRouter)
// app.use('/api/reports', reportsRouter)

app.listen(port, () => {
  console.log(`[unnati-api] Running on http://localhost:${port}`)
})

export default app
