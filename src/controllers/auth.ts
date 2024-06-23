import { Request, Response } from 'express'
// import jwt from 'jsonwebtoken'
import { User } from '../models/user/User'
// import { config } from '../utils/config'
import { config } from '../utils/config'
import { signMessage } from '@wagmi/core'
// const login = (req: Request, res: Response) => {
//   const user = {
//     address: '0x8E8657d5bF1569B3fc73B47E0DCa6f786431D8Cd'
//   }
//   const accessSecret = 'random'
// }

const get_sign_message = async (
  req: Request<{}, {}, { address: string }>,
  res: Response
) => {
  try {
    const { address } = req.body
    const signature = await signMessage(config, {
      message: 'hello world',
      account: '0x8E8657d5bF1569B3fc73B47E0DCa6f786431D8Cd'
    })
    console.log('signature', signature)
    const user = await User.findByPk(address)
    if (user) {
      return res.status(200).send({
        message: 'success',
        nonce: user.nonce,
        sign: user.message || address
      })
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' })
  }
}

const refresh_token = (req: Request, res: Response) => {}

export default { get_sign_message, refresh_token }
