import pino, { LoggerOptions } from 'pino'
import pinoHttp, { GenReqId } from 'pino-http'
import { GenericLogger, ExpressLogValues, GenericLogValues } from './types'

const REDACT_FIELDS = [
  'accessToken',
  'idToken',
  'refreshToken',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'req.headers.authorization',
  'res.headers["set-cookie"]'
]

const getIsoTime = () => `,"timestamp":"${new Date().toISOString()}"`

const generateRequestId: GenReqId = req =>
  req.headers['x-correlation-id'] ||
  req.headers['x-amzn-requestid'] ||
  req.headers['x-amzn-trace-id'] ||
  req.headers['x-amz-cf-id'] ||
  Date.now()

const defaultOptions = {
  level: 'debug',
  timestamp: getIsoTime,
  useLevelLabels: true,
  redact: {
    paths: REDACT_FIELDS,
    censor: '** REDACTED **'
  },
  customLevels: {},
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  }
}

export const logger = <UserDefinedValues = GenericLogValues>(overwriteOptions: LoggerOptions) =>
  pino({
    ...defaultOptions,
    ...overwriteOptions
  }) as GenericLogger<UserDefinedValues>

export const expressLogger = <UserDefinedValues>(overwriteOptions: LoggerOptions) =>
  pinoHttp({
    genReqId: generateRequestId,
    logger: pino({
      ...defaultOptions,
      ...overwriteOptions
    }) as GenericLogger<UserDefinedValues & ExpressLogValues>
  })
