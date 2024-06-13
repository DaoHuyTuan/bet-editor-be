import { Request, Response } from 'express'

import { User } from '../models/user/User'
const get_users = (req: Request<{}, {}, User>, res: any, next: any) => {
  User.findAll({})
    .then((users: User[]) => {
      if (users.length > 0) {
        res.status(200).json({ message: 'User found!', users })
      } else {
        res.status(200).json({ message: 'User not found!', users })
      }
    })
    .catch((err: any) => console.log(err))
}

const create_user = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: any
) => {
  try {
    console.log('body', req.body)
    const result = await User.create({ ...req.body })
    console.log('result', result)
    if (result) {
      return res.status(201).json({ message: 'User created', user: result })
    }
  } catch (error) {
    return res.status(400).json({ message: 'Something is wrong!', error })
  }
}

export default {
  get_users,
  create_user
}
