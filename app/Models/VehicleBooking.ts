import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Client from './Client'
import Vehicle from './Vehicle'
import Contract from './Contract'

export default class VehicleBooking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public clientId: number

  @column()
  public vehicleId: number

  @column()
  public contractId: number

  @belongsTo(() => Client)
  public client: BelongsTo<typeof Client>

  @belongsTo(() => Vehicle)
  public vehicle: BelongsTo<typeof Vehicle>

  @belongsTo(() => Contract)
  public contract: BelongsTo<typeof Contract>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime
}
