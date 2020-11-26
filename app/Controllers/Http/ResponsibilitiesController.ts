import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Responsibility from 'App/Models/Responsibility'
import { DateTime } from 'luxon'

export default class ResponsibilitiesController {
  public async index() {
    return await Responsibility.all()
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const responsibility = await Responsibility.query().where('id', id).first()

    if (!responsibility) {
      return response.status(400).json('There is no responsibility with this ID')
    }

    return responsibility
  }

  public async store({ request, response }: HttpContextContract) {
    const { sector } = request.original()

    if (!sector) {
      return response.status(400).json('Empty responsibility sector')
    }

    const responsibility = await Responsibility.create({ sector })

    return responsibility
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const { sector } = request.original()

    if (!sector) {
      return response.status(400).json('Empty responsibility sector')
    }

    const responsibility = await Responsibility.query().where('id', id).first()

    if (!responsibility) {
      return response.status(400).json('There is no category with this ID')
    }

    responsibility.sector = sector

    responsibility.save()

    return responsibility
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const responsibility = await Responsibility.query().where('id', id).first()

    if (!responsibility) {
      return response.status(400).json('There is no responsibility with this ID')
    }

    responsibility.deletedAt = DateTime.fromJSDate(new Date())

    responsibility.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const responsibility = await Responsibility.query().where('id', id).first()

    if (!responsibility) {
      return response.status(400).json('There is no responsibility with this ID')
    }

    responsibility.delete()

    return response.status(204)
  }
}
