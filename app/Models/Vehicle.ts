import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import VehicleModel from './VehicleModel'
import Category from './Category'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public manufacturingYear: number

  @column()
  public transitBoard: string

  @column()
  public chassisId: string

  @column()
  public vehiclePower: string

  @column()
  public fuelType: string

  @column()
  public vehicleModelId: number

  @column()
  public categoryId: number

  @belongsTo(() => VehicleModel)
  public vehicleModel: BelongsTo<typeof VehicleModel>

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public deletedAt: DateTime
}
