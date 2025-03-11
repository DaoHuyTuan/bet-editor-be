import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { DEBUG_API_KEY, DEBUG_API_VALUE } from '../utils/variables'

export const validateRequestBody = <T>(
  schema: ZodSchema<T>,
  isRequire?: boolean
) => {
  return (req: Request<{}, {}, any>, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const requestHeaderKey = req.headers[DEBUG_API_KEY] as string
      const showDetails = requestHeaderKey === DEBUG_API_VALUE
      const messageError = !isRequire
        ? showDetails
          ? 'Invalid request data'
          : 'Invalid request data'
        : showDetails
        ? 'Invalid request data'
        : 'API not existed!'
      return res.status(400).json({
        message: messageError,
        ...(showDetails && {
          errors: result.error.errors.map(err => err.message)
        })
      })
    }
    req.body = result.data
    next()
  }
}
