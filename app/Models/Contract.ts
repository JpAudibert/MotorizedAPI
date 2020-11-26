import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.date({ autoCreate: true })
  public contractDate: DateTime

  @column.date()
  public contractCancelDate: DateTime

  @column()
  public penalty: number

  @column()
  public paymentType: string

  @column()
  public contractValue: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
