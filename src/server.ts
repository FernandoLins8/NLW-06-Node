import express from 'express'
import "reflect-metadata";
import routes from './routes'
import cors from 'cors'

import './database'

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Running on ${PORT}`))
