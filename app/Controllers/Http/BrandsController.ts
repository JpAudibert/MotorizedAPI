import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'
import { DateTime } from 'luxon'

export default class BrandsController {
  public async index() {
    return Brand.all({})
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const brand = await Brand.query().where('id', id).firstOrFail()

    if (!brand) {
      return response.status(400).json('There is no brand with this ID')
    }

    return brand
  }

  public async store({ request, response }: HttpContextContract) {
    const { name } = request.original()

    if (!name) {
      return response.status(400).json('Empty brand name')
    }

    const brand = await Brand.create({ name })

    return brand
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = request.params()
    const { name, deletedAt } = request.original()

    if (!name) {
      return response.status(400).json('Empty category name')
    }

    const brand = await Brand.query().where('id', id).firstOrFail()

    if (!brand) {
      return response.status(400).json('There is no category with this ID')
    }

    brand.name = name
    if (deletedAt) {
      brand.deletedAt = new DateTime()
    }

    brand.save()

    return brand
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const brand = await Brand.query().where('id', id).firstOrFail()

    if (!brand) {
      return response.status(400).json('There is no brand with this ID')
    }

    brand.delete()

    return response.status(204)
  }
}
