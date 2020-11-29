import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Vehicle from 'App/Models/Vehicle'
import { DateTime } from 'luxon'

export default class VehiclesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.input('page', 1)
      const limit = 10

      return await Vehicle.query().preload('category').preload('vehicleModel').paginate(page, limit)
    } catch (err) {
      return response.status(400).json({ message: 'There is no vehicle', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicle = await Vehicle.query()
      .preload('category')
      .preload('vehicleModel')
      .where('id', id)
      .first()

    if (!vehicle) {
      return response.status(400).json('There is no vehicle with this ID')
    }

    return vehicle
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      manufacturingYear,
      transitBoard,
      chassisId,
      vehiclePower,
      fuelType,
      vehicleModelId,
      categoryId,
    } = request.original()

    if (
      !manufacturingYear ||
      !transitBoard ||
      !chassisId ||
      !vehiclePower ||
      !fuelType ||
      !vehicleModelId ||
      !categoryId
    ) {
      return response.status(400).json('Invalid values for vehicle')
    }

    const vehicle = await Vehicle.create({
      manufacturingYear,
      transitBoard,
      chassisId,
      vehiclePower,
      fuelType,
      vehicleModelId,
      categoryId,
    })

    return vehicle
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const {
      manufacturingYear,
      transitBoard,
      chassisId,
      vehiclePower,
      fuelType,
      vehicleModelId,
      categoryId,
    } = request.original()

    const vehicle = await Vehicle.query().where('id', id).first()

    if (!vehicle) {
      return response.status(400).json('There is no vehicle with this ID')
    }

    vehicle.manufacturingYear = manufacturingYear
    vehicle.transitBoard = transitBoard
    vehicle.chassisId = chassisId
    vehicle.vehiclePower = vehiclePower
    vehicle.fuelType = fuelType
    vehicle.vehicleModelId = vehicleModelId
    vehicle.categoryId = categoryId

    vehicle.save()

    return vehicle
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicle = await Vehicle.query().where('id', id).first()

    if (!vehicle) {
      return response.status(400).json('There is no vehicle with this ID')
    }

    vehicle.deletedAt = DateTime.fromJSDate(new Date())

    vehicle.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicle = await Vehicle.query().where('id', id).first()

    if (!vehicle) {
      return response.status(400).json('There is no vehicle with this ID')
    }

    vehicle.delete()

    return response.status(204)
  }
}
