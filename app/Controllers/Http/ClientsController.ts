import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Client from 'App/Models/Client'
import { DateTime } from 'luxon'

export default class ClientsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.input('page', 1)
      const limit = 10

      return await Client.query().preload('city').paginate(page, limit)
    } catch (err) {
      return response.status(400).json({ message: 'There is no clients', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const client = await Client.query().preload('city').where('id', id).first()

    if (!client) {
      return response.status(400).json('There is no client with this ID')
    }

    return client
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, email, cpf, phone, birthday, cnhRegister, cnhMirror, cityId } = request.original()

    if (!name || !email || !cpf || !phone || !birthday || !cnhRegister || !cnhMirror || !cityId) {
      return response.status(400).json('Invalid values for client')
    }

    const client = await Client.create({
      name,
      email,
      cpf,
      phone,
      birthday,
      cnhRegister,
      cnhMirror,
      cityId,
    })

    return client
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const { name, email, cpf, phone, birthday, cnhRegister, cnhMirror, cityId } = request.original()

    if (!name || !email || !cpf || !phone || !birthday || !cnhRegister || !cnhMirror || !cityId) {
      return response.status(400).json('Invalid values for client')
    }

    const client = await Client.query().where('id', id).first()

    if (!client) {
      return response.status(400).json('There is no client with this ID')
    }

    client.name = name
    client.email = email
    client.cpf = cpf
    client.phone = phone
    client.birthday = birthday
    client.cnhRegister = cnhRegister
    client.cnhMirror = cnhMirror
    client.cityId = cityId

    client.save()

    return client
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const client = await Client.query().where('id', id).first()

    if (!client) {
      return response.status(400).json('There is no client with this ID')
    }

    client.deletedAt = DateTime.fromJSDate(new Date())

    client.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const client = await Client.query().where('id', id).first()

    if (!client) {
      return response.status(400).json('There is no client with this ID')
    }

    client.delete()

    return response.status(204)
  }
}
