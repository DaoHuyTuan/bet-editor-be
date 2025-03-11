import dotenv from 'dotenv'

dotenv.config()
export const ERROR_CODE = {
  USER_NOT_FOUND: 'USER_NOT_FOUND'
}

export const DEFAULT_NONCE = process.env.DEFAULT_NONCE
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
export const AWS_REGION = process.env.AWS_REGION
export const EXAMPLE_VIDEO_URL = process.env.EXAMPLE_VIDEO_URL
export const DEBUG_API_KEY = process.env.DEBUG_API_KEY
export const DEBUG_API_VALUE = process.env.DEBUG_API_VALUE
