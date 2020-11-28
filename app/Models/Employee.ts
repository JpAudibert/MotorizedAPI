import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Responsibility from './Responsibility'
import City from './City'

export default class Employee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public cpf: string

  @column()
  public phone: string

  @column()
  public birthday: Date

  @column()
  public hiringDate: Date

  @column()
  public firingDate: Date

  @column()
  public responsibilityId: number

  @column()
  public cityId: number

  @belongsTo(() => Responsibility)
  public responsibility: BelongsTo<typeof Responsibility>

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
