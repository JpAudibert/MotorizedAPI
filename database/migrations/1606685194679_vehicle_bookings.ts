import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VehicleBookings extends BaseSchema {
  protected tableName = 'vehicle_bookings'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('client_id').notNullable()
      table.integer('vehicle_id').notNullable()
      table.integer('contract_id').notNullable()
      table.timestamps(true)
      table.timestamp('deleted_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
