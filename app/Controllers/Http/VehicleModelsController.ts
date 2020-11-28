import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleModel from 'App/Models/VehicleModel'
import { DateTime } from 'luxon'

export default class VehicleModelsController {
  public async index({ request, response, params }: HttpContextContract) {
    try {
      const { brandId } = params
      const { page } = request.input('page', 1)
      const limit = 10

      return await VehicleModel.query()
        .preload('brand')
        .where('brand_id', brandId)
        .paginate(page, limit)
    } catch (err) {
      return response
        .status(400)
        .json({ message: 'There is no vehicle models', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id, brandId } = params

    const vehicleModel = await VehicleModel.query()
      .preload('brand')
      .where('brand_id', brandId)
      .where('id', id)
      .first()

    if (!vehicleModel) {
      return response.status(400).json('There is no vehicle model with this ID')
    }

    return vehicleModel
  }

  public async store({ request, response }: HttpContextContract) {
    const { modelName, brandId } = request.original()

    if (!modelName || !brandId) {
      return response.status(400).json('Invalid values for vehicle model')
    }

    const vehicleModel = await VehicleModel.create({
      modelName,
      brandId,
    })

    return vehicleModel
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id, brandId } = params
    const { modelName } = request.original()

    if (!modelName || !brandId) {
      return response.status(400).json('Invalid values for vehicle model')
    }

    const vehicleModel = await VehicleModel.query()
      .where('brand_id', brandId)
      .where('id', id)
      .first()

    if (!vehicleModel) {
      return response.status(400).json('There is no vehicle model with this ID')
    }

    vehicleModel.modelName = modelName

    vehicleModel.save()

    return vehicleModel
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicleModel = await VehicleModel.query().where('id', id).first()

    if (!vehicleModel) {
      return response.status(400).json('There is no vehicle model with this ID')
    }

    vehicleModel.deletedAt = DateTime.fromJSDate(new Date())

    vehicleModel.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id, brandId } = params

    const vehicleModel = await VehicleModel.query()
      .where('brand_id', brandId)
      .where('id', id)
      .first()

    if (!vehicleModel) {
      return response.status(400).json('There is no vehicle model with this ID')
    }

    vehicleModel.delete()

    return response.status(204)
  }
}
