import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Brand from './Brand'

export default class VehicleModel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public modelName: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public brandId: number

  @belongsTo(() => Brand)
  public brand: BelongsTo<typeof Brand>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
