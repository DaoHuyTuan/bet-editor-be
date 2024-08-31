import dotenv from 'dotenv'

dotenv.config()
export const ERROR_CODE = {
  USER_NOT_FOUND: 'USER_NOT_FOUND'
}

export const DEFAULT_NONCE = process.env.DEFAULT_NONCE
