import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'

export default class CategoriesController {
  public async index() {
    return Category.all({})
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const category = await Category.query().where('id', id).firstOrFail()

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

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = request.params()
    const { categoryName } = request.original()

    if (!categoryName) {
      return response.status(400).json('Empty category name')
    }

    const category = await Category.query().where('id', id).firstOrFail()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    category.categoryName = categoryName

    category.save()

    return category
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const category = await Category.query().where('id', id).firstOrFail()

    if (!category) {
      return response.status(400).json('There is no category with this ID')
    }

    category.delete()

    return response.status(204)
  }
}
