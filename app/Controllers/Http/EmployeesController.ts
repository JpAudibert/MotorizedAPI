import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import { DateTime } from 'luxon'

export default class EmployeesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const { page } = request.input('page', 1)
      const limit = 10

      return await Employee.query().preload('responsibility').preload('city').paginate(page, limit)
    } catch (err) {
      return response.status(400).json({ message: 'There is no employees', error: err.message })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    const { id } = params

    const employee = await Employee.query()
      .preload('responsibility')
      .preload('city')
      .where('id', id)
      .first()

    if (!employee) {
      return response.status(400).json('There is no employee with this ID')
    }

    return employee
  }

  public async store({ request, response }: HttpContextContract) {
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birthday,
      hiringDate,
      firingDate,
      responsibilityId,
      cityId,
    } = request.original()

    if (
      !name ||
      !email ||
      !password ||
      !cpf ||
      !phone ||
      !birthday ||
      !hiringDate ||
      !responsibilityId ||
      !cityId
    ) {
      return response.status(400).json('Invalid values for employee')
    }

    const employee = await Employee.create({
      name,
      email,
      password,
      cpf,
      phone,
      birthday,
      hiringDate,
      firingDate,
      responsibilityId,
      cityId,
    })

    return employee
  }

  public async update({ request, response, params }: HttpContextContract) {
    const { id } = params
    const {
      name,
      email,
      password,
      cpf,
      phone,
      birthday,
      hiringDate,
      firingDate,
      responsibilityId,
      cityId,
    } = request.original()

    const employee = await Employee.query().where('id', id).first()

    if (!employee) {
      return response.status(400).json('There is no employee with this ID')
    }

    employee.name = name
    employee.email = email
    employee.password = password
    employee.cpf = cpf
    employee.phone = phone
    employee.birthday = birthday
    employee.hiringDate = hiringDate
    employee.firingDate = firingDate
    employee.responsibilityId = responsibilityId
    employee.cityId = cityId

    employee.save()

    return employee
  }

  public async softDelete({ response, params }: HttpContextContract) {
    const { id } = params

    const employee = await Employee.query().where('id', id).first()

    if (!employee) {
      return response.status(400).json('There is no employee with this ID')
    }

    employee.deletedAt = DateTime.fromJSDate(new Date())

    employee.save()

    return response.status(204)
  }

  public async delete({ response, params }: HttpContextContract) {
    const { id } = params

    const employee = await Employee.query().where('id', id).first()

    if (!employee) {
      return response.status(400).json('There is no employee with this ID')
    }

    employee.delete()

    return response.status(204)
  }
}
