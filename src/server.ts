import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import "reflect-metadata"
import cors from 'cors'

import routes from './routes'
import './database'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

app.listen(PORT, () => console.log(`Running on ${PORT}`))
