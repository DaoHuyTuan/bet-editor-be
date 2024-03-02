import { createServer } from 'http'
import { app } from './app'
import { sequelize } from './db/database'

const port = process.env.PORT || 3000

;(async () => {
  await sequelize.sync({ force: true })

  createServer(app).listen(port, () =>
    console.log(`Server listen on port ${port}`)
  )
})()
