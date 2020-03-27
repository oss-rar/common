import express from 'express'
import { expressLogger, logger, HandlerWithLogger } from '../src'

type CustomLoggingProperties = { customProperty: string }

const customHandler: HandlerWithLogger<CustomLoggingProperties> = (req, res) => {
  const { log } = req
  log.info({ subject: 'customHandler', customProperty: 'my-custom-property' })
  res.send('Hello World!')
}

const appName = 'my-app-name'
const log = logger({ name: appName })
const port = 3000
const server = express()

server.use(
  expressLogger<CustomLoggingProperties>({ name: appName })
)
server.get('/', customHandler)
server.listen(port, () => log.info({ url: `http://localhost:${port}` }, 'App running'))
