import pino from 'pino'
import { Request, Response, NextFunction } from 'express'

export interface GenericLogValues {
  status?: number
  statusText?: string
  errorMessage?: string
  subject?: string
  action?: 'create' | 'read' | 'update' | 'delete'
  actionStatus?: 'success' | 'fail'
  duration?: number
  error?: Error
  url?: string
}

export interface ExpressLogValues extends GenericLogValues {
  req?: {
    id: string
    method: string
    remoteAddress: string
    remotePort: number
    url: string
    headers?: Headers
  }
  res?: {
    statusCode: number
    headers: Headers
  }
  duration?: number
}

export interface LogFn<UserDefinedValues = GenericLogValues> {
  (msg: string): void
  (obj: UserDefinedValues | GenericLogValues, msg?: string): void
}

export interface GenericLogger<UserDefinedValues = GenericLogValues> extends pino.BaseLogger {
  fatal: LogFn<UserDefinedValues>
  error: LogFn<UserDefinedValues>
  warn: LogFn<UserDefinedValues>
  info: LogFn<UserDefinedValues>
  debug: LogFn<UserDefinedValues>
  trace: LogFn<UserDefinedValues>
  [k: string]: any
}

export interface RequestWithLogger<UserDefinedValues = GenericLogValues> extends Request {
  log: GenericLogger<GenericLogValues & UserDefinedValues>
}

export type HandlerWithLogger<UserDefinedValues = GenericLogValues> = (
  req: RequestWithLogger<GenericLogValues & UserDefinedValues>,
  res: Response,
  next: NextFunction
) => any
