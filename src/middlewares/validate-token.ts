import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user/User' // Adjust the import path as needed
import { keccak256, toHex } from 'viem'
import { decryptAddress } from '../utils/secure'

interface AuthRequest extends Request {
  locals: {
    address: string
  }
}

export const validateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: 'No token provided', message_code: 'TOKEN_MISSING' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({
        message: 'Invalid token format',
        message_code: 'INVALID_TOKEN_FORMAT'
      })
    }

    const decodedToken = jwt.decode(token) as jwt.JwtPayload
    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: 'Invalid token', message_code: 'INVALID_TOKEN_1' })
    }

    const { a, s } = decodedToken
    if (!a || !s) {
      return res.status(401).json({
        message: 'Malformed token payload',
        message_code: 'MALFORMED_TOKEN'
      })
    }

    const address = await decryptAddress(a, s)
    const user = await User.findByPk(address.toLowerCase())

    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', message_code: 'USER_NOT_FOUND' })
    }
    console.log('user_val', user)
    console.log('address_val', user.address)
    const hexValue = keccak256(
      toHex(`0x${s}-${user.address}-${user.signature}`)
    )

    try {
      // @ts-ignore
      const result = await jwt.verify(token, hexValue)
      res.locals.address = user.address
      console.log('res', res.locals)
      next()
    } catch (verifyError) {
      console.error('Token verification failed:', verifyError)
      return res
        .status(401)
        .json({ message: 'Invalid token', message_code: 'INVALID_TOKEN' })
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return res.status(500).json({
      message: 'An error occurred during authentication',
      message_code: 'AUTH_ERROR'
    })
  }
}
