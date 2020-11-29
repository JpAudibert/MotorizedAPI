import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import VehicleBooking from 'App/Models/VehicleBooking'
import { DateTime } from 'luxon'

export default class VehicleBookingsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.input('page', 1)
      const limit = 10

      return await VehicleBooking.query()
        .preload('client')
        .preload('contract')
        .preload('vehicle')
        .paginate(page, limit)
    } catch (err) {
      return response.status(400).json({ message: 'There is no booking', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicleBooking = await VehicleBooking.query()
      .preload('client')
      .preload('contract')
      .preload('vehicle')
      .where('id', id)
      .first()

    if (!vehicleBooking) {
      return response.status(400).json('There is no booking with this ID')
    }

    return vehicleBooking
  }

  public async store({ request, response }: HttpContextContract) {
    const { clientId, vehicleId, contractId } = request.original()

    if (!clientId || !vehicleId || !contractId) {
      return response.status(400).json('Invalid values for booking')
    }

    const vehicleBooking = await VehicleBooking.create({
      clientId,
      vehicleId,
      contractId,
    })

    return vehicleBooking
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const { clientId, vehicleId, contractId } = request.original()

    const vehicleBooking = await VehicleBooking.query().where('id', id).first()

    if (!vehicleBooking) {
      return response.status(400).json('There is no booking with this ID')
    }

    vehicleBooking.clientId = clientId
    vehicleBooking.vehicleId = vehicleId
    vehicleBooking.contractId = contractId

    vehicleBooking.save()

    return vehicleBooking
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicleBooking = await VehicleBooking.query().where('id', id).first()

    if (!vehicleBooking) {
      return response.status(400).json('There is no booking with this ID')
    }

    vehicleBooking.deletedAt = DateTime.fromJSDate(new Date())

    vehicleBooking.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const vehicleBooking = await VehicleBooking.query().where('id', id).first()

    if (!vehicleBooking) {
      return response.status(400).json('There is no booking with this ID')
    }

    vehicleBooking.delete()

    return response.status(204)
  }
}
