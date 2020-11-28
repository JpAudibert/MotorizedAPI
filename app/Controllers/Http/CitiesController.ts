import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import City from 'App/Models/City'

export default class CitiesController {
  public async index({ params, request, response }: HttpContextContract) {
    try {
      const { stateId } = params
      const { page } = request.input('page', 1)
      const limit = 10

      return await City.query().where('state_id', stateId).paginate(page, limit)
    } catch (err) {
      return response.status(400).json({ message: 'There is no cities', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { stateId, id } = params

    const city = await City.query()
      .preload('state')
      .where('id', id)
      .where('stateId', stateId)
      .first()

    if (!city) {
      return response.status(400).json('There is no city with this ID')
    }

    return city
  }

  public async store({ request, response, params }: HttpContextContract) {
    const { stateId } = params
    const { name } = request.original()

    if (!name) {
      return response.status(400).json('Empty city name')
    }

    const city = await City.create({ name, stateId })

    return city
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { stateId, id } = params
    const { name } = request.original()

    if (!name) {
      return response.status(400).json('Empty city name')
    }

    const city = await City.query().where('id', id).where('state_id', stateId).first()

    if (!city) {
      return response.status(400).json('There is no city with this ID')
    }

    city.name = name

    city.save()

    return city
  }

  public async delete({ response, params }: HttpContextContract) {
    const { stateId, id } = params

    const city = await City.query().where('id', id).where('state_id', stateId).first()

    if (!city) {
      return response.status(400).json('There is no city with this ID')
    }

    city.delete()

    return response.status(204)
  }
}
