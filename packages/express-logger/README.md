# Express - Logger 📕

Logging framework, powered by pino.

[![powered by pinojs](https://img.shields.io/badge/powered%20by-pino-6A6.svg?style=flat-square)](https://github.com/pinojs/pino)

# Why log?

Logging is used for gathering information to help maintain a product. Similar to how marketing use tracking services, production teams can make logs to help inform how the product is being used.

Some good examples of things to log:

- Application errors
- API failures
- Edge case scenarios

## Summary

- [Install](#install)
- [Setup](#setup)
- [Usage](#usage)
- [Levels](#levels)
- [Links](#links)

## Install

```sh
npm add @oss-rar/express-logger
npm add @types/pino --dev # This is needed to provide type completion
```

## Setup

The simplest way to start logging is by importing the base `logger`:

```typescript
import { logger } from '@oss-rar/express-logger'

const log = logger({ name: 'my:app' })

log.info('my logging message') // simple string
log.info({ status: 400, statusText: 'my message' }) // structured object
log.info({ status: 400, statusText: 'my message' }, 'my message') // structured object & string
```

## Usage

### General context

By default, there's a restriction of values that you can log when using a structured object. This is a design decision to make you think about what you really need to log and also think about if you're logging `sensitive data` or not.

As an example, it is possible to `type` the logger object by defining an implementation for `UserDefinedValues` generic, extending the values that are allowed to log.

```typescript
import { logger } from '@oss-rar/express-logger'

interface MyCustomType {
  traceId: number
  traceMessage: string
}

const log = logger<MyCustomType>({ name: 'my:app' })
log.trace({ traceId: 123, traceMessage: 'my trace' })
```

### ExpressJS context

When running an expressjs server is possible to use the `@oss-rar/express-logger` middleware to enhance the `Request` with a logger instance.

```typescript
import express from 'express'
import { expressLogger, HandlerWithLogger } from '@oss-rar/express-logger'

const customHandler: HandlerWithLogger = (req, res, next) => {
  const { log } = req
  log.info({ subject: 'customHandler' })
}

const server = express()
server.use(expressLogger({ name: 'my:app' }))
server.use('/', customHandler)
```

## Levels

| Level  | Value    | Description                                                             |
| ------ | -------- | ----------------------------------------------------------------------- |
| trace  | 10       | for tracing (more fine-grained)                                         |
| debug  | 20       | for debugging 🐛                                                        |
| info   | 30       | informational messages that highlight the progress of the application   |
| warn   | 40       | events that could cause problems                                        |
| error  | 50       | error events that might still allow the application to continue running |
| fatal  | 60       | error events that cause the application to stop running                 |
| silent | Infinity | no output                                                               |

## Links

[Pino api](http://getpino.io/#/)
