import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import { DateTime } from 'luxon'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    try {
      return await Category.all()
    } catch (err) {
      return response.status(400).json({ message: 'There is no categories', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const category = await Category.query().where('id', id).first()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    return category
  }

  public async store({ request, response }: HttpContextContract) {
    const { categoryName } = request.original()

    if (!categoryName) {
      return response.status(400).json('Empty category name')
    }

    const category = await Category.create({ categoryName })

    return category
  }

  public async update({ request, response }: HttpContextContract) {
    const { id } = request.params()
    const { categoryName } = request.original()

    if (!categoryName) {
      return response.status(400).json('Empty category name')
    }

    const category = await Category.query().where('id', id).first()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    category.categoryName = categoryName

    category.save()

    return category
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const category = await Category.query().where('id', id).first()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    category.deletedAt = DateTime.fromJSDate(new Date())

    category.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const category = await Category.query().where('id', id).first()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    category.delete()

    return response.status(204)
  }
}
