import express, { Request, Response } from 'express'
const bodyparser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  next()
})

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!')
})

app.use('/', require('./router/index'))

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
