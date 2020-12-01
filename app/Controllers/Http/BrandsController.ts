import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Brand from 'App/Models/Brand'
import { DateTime } from 'luxon'

export default class BrandsController {
  public async index({ response }: HttpContextContract) {
    try {
      return await Brand.all()
    } catch (err) {
      return response.status(400).json({ message: 'There is no brands', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const brand = await Brand.query().where('id', id).first()

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
    const { id } = params
    const { name } = request.original()

    if (!name) {
      return response.status(400).json('Empty brand name')
    }

    const brand = await Brand.query().where('id', id).first()

    if (!brand) {
      return response.status(400).json('There is no brand with this ID')
    }

    brand.name = name

    brand.save()

    return brand
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const brand = await Brand.query().where('id', id).first()

    if (!brand) {
      return response.status(400).json('There is no brand with this ID')
    }

    brand.deletedAt = DateTime.fromJSDate(new Date())

    brand.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const brand = await Brand.query().where('id', id).first()

    if (!brand) {
      return response.status(400).json('There is no brand with this ID')
    }

    brand.delete()

    return response.status(204)
  }
}
