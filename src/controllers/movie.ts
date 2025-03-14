import { NextFunction, Request, Response } from 'express'

import { Movie } from '../models/movie/Movie'
import { Op, ValidationError } from 'sequelize'

import { Actress } from '../models/actress/Actress'
import { Category } from '../models/category/Category'
import { Tag } from '../models/tag/Tag'
import { CreateMovieParam } from '../validate'
import { sequelize } from '../db/database'
import { formatValue } from '../utils/utils'
import { buildInclude, buildQueryWhere } from '../utils/query'

const get_movies = async (
  req: Request<{}, {}, { limit: number; page: number } & Movie>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      query,
      tag,
      actress,
      category,
      limit = 10,
      page = 1
    } = req.query as {
      query: string | undefined
      tag: string | undefined
      actress: string | undefined
      category: string | undefined
      limit: string | undefined
      page: string | undefined
    }

    console.log('Request query:', {
      query,
      tag,
      actress,
      category,
      limit,
      page
    })

    const limitNum = parseInt(limit as string, 10) || 10
    const pageNum = parseInt(page as string, 10) || 1
    const offset = (pageNum - 1) * limitNum

    const where = buildQueryWhere(query)
    const include = buildInclude(query, tag, actress, category)

    const { count, rows: movies } = await Movie.findAndCountAll({
      where,
      include,
      attributes: ['id', 'title', 'path'],
      limit: limitNum,
      offset,
      ...(true && { distinct: true })
    } as any)

    if (!movies.length) {
      console.log('Search query:', {
        query,
        tag,
        actress,
        category,
        limit,
        page
      })
      console.log(
        'No movies found with include:',
        JSON.stringify(include, null, 2)
      )
      return res.status(404).json({ message: 'No movies found' })
    }

    const totalPages = Math.ceil(count / limitNum)

    return res.status(200).json({
      message: 'Movies found',
      movies,
      pagination: { limit: limitNum, currentPage: pageNum, totalPages }
    })
  } catch (error) {
    console.error('Error in get_movies:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}

const create_movie = async (
  req: Request<{}, {}, CreateMovieParam>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      path,
      tags = [],
      actresses = [],
      categories = [],
      isNew
    } = req.body
    const isNewValue = isNew !== undefined ? isNew : null
    const [movie, created] = await sequelize.transaction(
      async (t): Promise<[Movie, boolean]> => {
        const [movieInstance, movieCreated] = await Movie.findOrCreate({
          where: { path },
          defaults: { title, path, isNew: isNewValue },
          transaction: t
        })

        // Xử lý tags
        if (tags.length > 0) {
          const existingTags = await Tag.findAll({
            where: { value: { [Op.in]: tags } }, // Tìm bằng giá trị gốc
            transaction: t
          })
          const existingTagValues = existingTags.map(tag => tag.value)
          const newTags = tags
            .filter(tagValue => !existingTagValues.includes(tagValue))
            .map(tagValue => ({ value: tagValue, name: formatValue(tagValue) })) // Lưu cả value gốc và name đã format

          if (newTags.length > 0) {
            const createdTags = await Tag.bulkCreate(newTags, {
              transaction: t
            })
            existingTags.push(...createdTags)
          }

          await movieInstance.$set('tags', existingTags, { transaction: t })
        }

        // Xử lý actresses
        if (actresses.length > 0) {
          const existingActresses = await Actress.findAll({
            where: { value: { [Op.in]: actresses } }, // Tìm bằng giá trị gốc
            transaction: t
          })
          const existingActressValues = existingActresses.map(
            actress => actress.value
          )
          const newActresses = actresses
            .filter(
              actressValue => !existingActressValues.includes(actressValue)
            )
            .map(actressValue => ({
              value: actressValue,
              name: formatValue(actressValue)
            })) // Lưu cả value gốc và name đã format

          if (newActresses.length > 0) {
            const createdActresses = await Actress.bulkCreate(newActresses, {
              transaction: t
            })
            existingActresses.push(...createdActresses)
          }

          await movieInstance.$set('actresses', existingActresses, {
            transaction: t
          })
        }

        // Xử lý categories
        if (categories.length > 0) {
          const existingCategories = await Category.findAll({
            where: { value: { [Op.in]: categories } }, // Tìm bằng giá trị gốc
            transaction: t
          })
          const existingCategoryValues = existingCategories.map(
            category => category.value
          )
          const newCategories = categories
            .filter(
              categoryValue => !existingCategoryValues.includes(categoryValue)
            )
            .map(categoryValue => ({
              value: categoryValue,
              name: formatValue(categoryValue)
            })) // Lưu cả value gốc và name đã format

          if (newCategories.length > 0) {
            const createdCategories = await Category.bulkCreate(newCategories, {
              transaction: t
            })
            existingCategories.push(...createdCategories)
          }

          await movieInstance.$set('categories', existingCategories, {
            transaction: t
          })
        }

        return [movieInstance, movieCreated]
      }
    )

    const movieWithRelations = await Movie.findByPk(movie.id, {
      include: [Tag, Actress, Category]
    })

    if (created) {
      return res.status(201).json({
        message: 'Movie created successfully',
        movie: movieWithRelations
      })
    } else {
      return res
        .status(400)
        .json({ message: 'Movie already exists!', movie: movieWithRelations })
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.errors.map(err => err.message)
      })
    }
    console.error('Error in create_movie:', error)
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message })
  }
}

const get_new_movie = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Truy vấn database để lấy 10 video có isNew = false hoặc không phải true
    const movies = await Movie.findAll({
      where: { isNew: true }, // Chỉ lấy các video có isNew = false
      limit: 10, // Giới hạn 10 video
      attributes: ['id', 'title', 'path'] // Chỉ lấy các trường cần thiết
    })

    // Nếu không tìm thấy video nào
    if (!movies.length) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy video nào không phải mới' })
    }

    // Trả về danh sách video với thông báo thành công
    return res
      .status(200)
      .json({ message: 'Đã lấy được danh sách video không phải mới', movies })
  } catch (error) {
    // Ghi log lỗi để debug
    console.error('Lỗi trong getNonNewMovies:', error)
    return res.status(500).json({ message: 'Lỗi server', error: error.message })
  }
}

export default {
  get_movies,
  create_movie,
  get_new_movie
}
