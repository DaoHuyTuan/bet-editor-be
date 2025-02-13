import { Request, Response } from 'express'
import { Actress } from '../models/actress/Actress'
import { sequelize } from '../db/database'
import { Op } from 'sequelize'
const get_actress = async (
  req: Request<{}, {}, { page: number; limit: number } & Actress>,
  res: Response
) => {
  // @ts-ignore
  const { id, name, page, limit } = req.body

  let whereClause: any = {}

  if (id) {
    whereClause.id = {
      [Op.iLike]: id
    }
  }

  if (name) {
    whereClause.name = {
      [Op.iLike]: `%${name}%`
    }
  }

  const { count, rows } = await sequelize.transaction(t =>
    Actress.findAndCountAll({
      where: whereClause,
      // limit: limit ? Number(limit) : 10,
      // offset: limit ? (Number(page) - 1) * Number(limit) : 0,
      // order: [['id', 'DESC']],
      // distinct: true,
      // include: [
      //   {
      //     model: Tag,
      //     through: { attributes: [] },
      //     attributes: ['id', 'name']
      //   },
      //   {
      //     model: Category,
      //     through: { attributes: [] },
      //     attributes: ['id', 'name']
      //   }
      // ],
      transaction: t
    })
  )
  console.log('count', count)
  console.log('rows', rows)

  if (count === 0) {
    res.status(400).json({ message: 'Resource not found' })
  } else {
    res.status(200).json({ actress: rows })
  }
}
const create_actress = async (
  req: Request<{}, {}, Actress>,
  res: Response,
  next: any
) => {
  const { id, name, image } = req.body
  sequelize.transaction(t => {
    return Actress.findOrCreate({
      where: {
        id: id,
        name: name
      },
      defaults: {
        id,
        name,
        image
      },
      transaction: t
    }).then(([result, created]) => {
      if (created) {
        res.status(200).json({ message: 'Actress created successfull', result })
      } else {
        res.status(400).json({ message: 'Actress existed!', actress: result })
      }
    })
  })
}
export default {
  get_actress,
  create_actress
}
