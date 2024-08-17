import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ethers } from 'ethers'
import { User } from '../models/user/User'

const get_sign_message = async (
  req: Request<{}, {}, { address: string }>,
  res: Response
) => {
  try {
    const { address } = req.body
    const user = await User.findByPk(address)
    if (user) {
      const hash = await ethers.hashMessage(`${address}-random-${user.nonce}`)
      return res.status(200).send({
        message: 'success',
        hash,
        nonce: user.nonce
      })
    } else {
      const hash = await ethers.hashMessage(`${address}-random-0`)
      return res.status(200).send({
        message: 'success',
        hash
      })
    }
  } catch (error) {
    res.status(400).send({ message: 'Ops, something is wrong', error })
  }
}

const login = async (
  req: Request<{}, {}, { address: string; signature: string }>,
  res: Response
) => {
  try {
    const { address, signature } = req.body
    const user = await User.findByPk(address)
    if (user) {
      const recoveredAddress = ethers.verifyMessage(
        `${address}-random-${user.nonce}`,
        signature
      )
      if (recoveredAddress === address) {
        const token = jwt.sign({ address, role: user.role }, 'secret', {
          expiresIn: '1h'
        })
        return res.status(200).send({ message: 'success', token })
      } else {
        return res.status(401).send({ message: 'Unauthorized' })
      }
    } else {
      return res.status(401).send({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Ops, something is wrong', error })
  }
}

const refresh_token = (req: Request, res: Response) => {}

export default { get_sign_message, refresh_token, login }
