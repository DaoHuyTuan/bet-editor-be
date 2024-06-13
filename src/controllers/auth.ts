import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const login = (req: Request, res: Response) => {
  const user = {
    address: '0x8E8657d5bF1569B3fc73B47E0DCa6f786431D8Cd'
  }
  const accessSecret = 'random'
}

const get_sign_message = (req: Request, res: Response) => {}

const refresh_token = (req: Request, res: Response) => {}

export default { get_sign_message, refresh_token }
