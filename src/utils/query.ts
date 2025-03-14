import { Op } from 'sequelize'
import { Actress } from '../models/actress/Actress'
import { Category } from '../models/category/Category'
import { Tag } from '../models/tag/Tag'

export const buildQueryWhere = (query: string | undefined): any => {
  if (!query) return {}
  return {
    [Op.or]: [
      { title: { [Op.iLike]: `%${query}%` } },
      { '$tags.name$': { [Op.iLike]: `%${query}%` } },
      { '$tags.value$': { [Op.iLike]: `%${query}%` } },
      { '$actresses.name$': { [Op.iLike]: `%${query}%` } },
      { '$actresses.value$': { [Op.iLike]: `%${query}%` } },
      { '$categories.name$': { [Op.iLike]: `%${query}%` } },
      { '$categories.value$': { [Op.iLike]: `%${query}%` } }
    ]
  }
}

// Hàm lấy include từ các tham số lọc
export const buildInclude = (
  query: string | undefined,
  tag: string | undefined,
  actress: string | undefined,
  category: string | undefined
): any[] => {
  const include: any[] = [
    {
      model: Tag,
      as: 'tags',
      required: false,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    },
    {
      model: Actress,
      as: 'actresses',
      required: false,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    },
    {
      model: Category,
      as: 'categories',
      required: false,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    }
  ]

  if (tag)
    include.push({
      model: Tag,
      as: 'tags',
      where: { value: tag },
      required: true,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    })
  if (actress)
    include.push({
      model: Actress,
      as: 'actresses',
      where: { value: actress },
      required: true,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    })
  if (category)
    include.push({
      model: Category,
      as: 'categories',
      where: { value: category },
      required: true,
      attributes: ['value', 'name'],
      through: { attributes: [] }
    })

  return include
}
