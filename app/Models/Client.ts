import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import City from './City'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public cpf: string

  @column()
  public phone: string

  @column()
  public birthday: Date

  @column()
  public cnhRegister: string

  @column()
  public cnhMirror: string

  @column()
  public cityId: number

  @belongsTo(() => City)
  public city: BelongsTo<typeof City>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
