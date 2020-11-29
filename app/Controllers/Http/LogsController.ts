import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Log from 'App/Models/Log'

export default class LogsController {
  public async index({ response }: HttpContextContract) {
    try {
      return (await Log.all()).reverse()
    } catch (err) {
      return response.status(400).json({ message: 'There is no logs', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const log = await Log.query().where('id', id).first()

    if (!log) {
      return response.status(400).json('There is no log with this ID')
    }

    return log
  }

  public async store({ request, response }: HttpContextContract) {
    const { logType, origin, description, idFromOrigin } = request.original()

    if (!logType || !origin || !description || !idFromOrigin) {
      return response.status(400).json('invalid values for log')
    }

    const log = await Log.create({ logType, origin, description, idFromOrigin })

    return log
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const { logType, origin, description, idFromOrigin } = request.original()

    if (!logType || !origin || !description || !idFromOrigin) {
      return response.status(400).json('invalid values for log')
    }

    const log = await Log.query().where('id', id).first()

    if (!log) {
      return response.status(400).json('There is no log with this ID')
    }

    log.logType = logType
    log.origin = origin
    log.description = description
    log.idFromOrigin = idFromOrigin

    log.save()

    return log
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const log = await Log.query().where('id', id).first()

    if (!log) {
      return response.status(400).json('There is no log with this ID')
    }

    log.delete()

    return response.status(204)
  }
}
