import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Contract from 'App/Models/Contract'
import { DateTime } from 'luxon'

export default class ContractsController {
  public async index() {
    return await Contract.all()
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const contract = await Contract.query().where('id', id).first()

    if (!contract) {
      return response.status(400).json('There is no state with this ID')
    }

    return contract
  }

  public async store({ request, response }: HttpContextContract) {
    const { contractCancelDate, penalty, paymentType, contractValue } = request.original()

    if (!penalty && !paymentType && !contractValue) {
      return response.status(400).json('Invalid inputs for contract')
    }

    const contractDate = new DateTime()

    const contract = await Contract.create({
      contractDate,
      contractCancelDate,
      penalty,
      paymentType,
      contractValue,
    })

    return contract
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const {
      contractDate,
      contractCancelDate,
      penalty,
      paymentType,
      contractValue,
    } = request.original()

    if (!contractDate && !penalty && !paymentType && !contractValue) {
      return response.status(400).json('Invalid inputs for contract')
    }

    const contract = await Contract.query().where('id', id).first()

    if (!contract) {
      return response.status(400).json('There is no contract with this ID')
    }

    contract.contractDate = contractDate
    contract.penalty = penalty
    contract.paymentType = paymentType
    contract.contractValue = contractValue

    if (contractCancelDate) {
      contract.contractCancelDate = contractCancelDate
    }

    contract.save()

    return contract
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const contract = await Contract.query().where('id', id).first()

    if (!contract) {
      return response.status(400).json('There is no contract with this ID')
    }

    contract.deletedAt = DateTime.fromJSDate(new Date())

    contract.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const contract = await Contract.query().where('id', id).first()

    if (!contract) {
      return response.status(400).json('There is no contract with this ID')
    }

    contract.delete()

    return response.status(204)
  }
}
