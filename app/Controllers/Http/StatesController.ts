import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import State from 'App/Models/State'

export default class StatesController {
  public async index() {
    return (await State.all()).reverse()
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const state = await State.query().preload('cities').where('id', id).first()

    if (!state) {
      return response.status(400).json('There is no state with this ID')
    }

    return state
  }

  public async store({ request, response }: HttpContextContract) {
    const { name, abreviation } = request.original()

    if (!name && !abreviation) {
      return response.status(400).json('Empty state name and abreviation')
    }

    const state = await State.create({ name, abreviation })

    return state
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const { name, abreviation } = request.original()

    if (!name && !abreviation) {
      return response.status(400).json('Empty state name and abreviation')
    }

    const state = await State.query().where('id', id).first()

    if (!state) {
      return response.status(400).json('There is no state with this ID')
    }

    state.name = name
    state.abreviation = abreviation

    state.save()

    return state
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const state = await State.query().where('id', id).first()

    if (!state) {
      return response.status(400).json('There is no state with this ID')
    }

    state.delete()

    return response.status(204)
  }
}
