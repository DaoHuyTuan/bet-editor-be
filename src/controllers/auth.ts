import { Request, Response } from 'express'
import { Address, keccak256, toHex } from 'viem'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { decryptAddress, encryptAddress } from '../utils/secure'
import { generateSiweNonce } from 'viem/siwe'
import { User } from '../models/user/User'
// import { User } from '../models/user/User'
// import { Address, hashMessage, verifyHash } from 'viem'
// import { signMessage, toAccount } from 'viem/accounts'

const get_nonce = async (req: Request, res: Response) => {
  try {
    const { address } = req.body
    const user = await User.findByPk(address)
    if (user) {
      return res.status(200).send({ message: 'success', nonce: user.nonce })
    } else {
      return res
        .status(404)
        .send({ message: 'User not found', error_code: 'USER_NOT_FOUND' })
    }
  } catch (error) {
    res.status(400).send({ message: 'Ops, something is wrong', error })
  }
}

const get_sign_message = async (
  req: Request<{}, {}, { address: Address; signature: string }>,
  res: Response
) => {
  try {
    // const randomByte = generateSiweNonce()
    const { address } = req.body
    let salt = ''
    const user = await User.findByPk(address)

    if (user) {
      salt = user.salt
    } else {
      salt = generateSiweNonce()
      const encryptedAddrees = await encryptAddress(req.body.address, salt)
      const payloadJWT = {
        s: salt, // salt
        a: encryptedAddrees // address
      }
      const privateString = keccak256(
        toHex(
          `0x${salt}-${req.body.address.toLowerCase()}-${req.body.signature}`
        )
      )

      const token = jwt.sign(payloadJWT, privateString, {
        expiresIn: '1h'
      })
      const newUser = await User.create({
        address,
        salt,
        signature: privateString
      })
      if (newUser) {
        return res.status(200).send({
          message: 'success',
          t: token // token
        })
      }
    }

    // jwt.decode()
    // const hashedAddress = keccak256(req.body.address.toLowerCase() as Address)
    // const hex = toHex(`${randomByte} ${req.body.address.toLowerCase()}`)
    // console.log('hex', hex)

    // const keyDecodeAddress = jwt.sign(
    //   { address: req.body.address, randomByte },
    //   hex
    // )
    // console.log('keyDecodeAddress', keyDecodeAddress)
    // const deCodeAddress = jwt.decode(keyDecodeAddress)
    // console.log('deCodeAddress', deCodeAddress)
    // const payloadJWT = {
    //   key: keyDecodeAddress,
    //   address: req.body.address,
    //   secret: hex
    // }
    // console.log('payloadJWT', payloadJWT)
    // const result = jwt.sign(payloadJWT, privateString, {
    //   expiresIn: '1h'
    // })
    // console.log('result', result)

    // const hex = toHex(`${salt} ${req.body.address.toLowerCase()}`)
    // @ts-ignore
    // const result = await decryptAddress(data, salt)
    // const payloadJWT = {
    //   s: salt, // salt
    //   a: encryptedAddrees // address
    //   // h: hex
    // }
    // const privateString = keccak256(
    //   toHex(`0x${salt}-${req.body.address.toLowerCase()}-${req.body.signature}`)
    // )

    // const token = jwt.sign(payloadJWT, privateString, {
    //   expiresIn: '1h'
    // })

    // return res.status(200).send({
    //   message: 'success',
    //   // a: encryptedAddrees, // address
    //   // s: salt, // salt
    //   t: token // token
    //   // h: privateString // hex
    //   // privateString
    // })
    // const { address } = req.body

    // const user = await User.findByPk(address)
    // if (user) {
    //   const hash = await hashMessage(`${address}-random-${user.nonce}`)
    //   // const hash = await ethers.hashMessage(`${address}-random-${user.nonce}`)
    //   return res.status(200).send({
    //     message: 'success',
    //     hash,
    //     nonce: user.nonce
    //   })
    // } else {
    //   const hash = await ethers.hashMessage(`${address}-random-0`)
    //   return res.status(200).send({
    //     message: 'success',
    //     hash
    //   })
    // }
  } catch (error) {
    res.status(400).send({ message: 'Ops, something is wrong', error })
  }
}

const login = async (req: Request<{}, {}, { hex: string }>, res: Response) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const requireHex = req.body.hex
    console.log('requireHex', requireHex)
    console.log('token', token)
    const data = await jwt.decode(token)

    const address = await decryptAddress(
      (data as JwtPayload).a,
      (data as JwtPayload).s
    )
    console.log('address', address)
    const hexValue = keccak256(
      toHex(`0x${(data as JwtPayload).s}-${address.toLowerCase()}`)
    )
    console.log('hexValue', hexValue)
    const result = await jwt.verify(token, hexValue)
    console.log('result', result)
    return res.status(200).send({ message: 'success', data: result })
    // const result = jwt.verify(token, privateString)
    // const { address, signature } = req.body
    // const recoveredAddress = await verifyHash({
    //   address: '0x8E8657d5bF1569B3fc73B47E0DCa6f786431D8Cd',
    //   hash: '0x94941bdbb941897d3aee1693a1a99dd4f6e354f9c961866897dfbe7e6ae3d06f'
    // })
    // const user = await User.findByPk(address)
    // if (user) {
    // const recoveredAddress = ethers.verifyMessage(
    //   `${address}-random-${user.nonce}`,
    //   signature
    // )
    // if (recoveredAddress === address) {
    //   const token = jwt.sign({ address, role: user.role }, 'secret', {
    //     expiresIn: '1h'
    //   })
    //   return res.status(200).send({ message: 'success', token })
    // } else {
    //   return res.status(401).send({ message: 'Unauthorized' })
    // }
    // } else {
    //   return res.status(401).send({ message: 'Unauthorized' })
    // }
  } catch (error) {
    res.status(400).send({ message: 'Ops, something is wrong', error })
  }
}

const refresh_token = (req: Request, res: Response) => {}

export default { get_sign_message, refresh_token, login, get_nonce }
