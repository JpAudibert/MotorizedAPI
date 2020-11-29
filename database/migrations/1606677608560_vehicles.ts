import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicles extends BaseSchema {
  protected tableName = 'vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('manufacturing_year').notNullable()
      table.string('transit_board').notNullable()
      table.string('chassis_id').notNullable()
      table.string('vehicle_power').notNullable()
      table.string('fuel_type').notNullable()
      table.timestamps(true)
      table.timestamp('deleted_at')
      table.integer('vehicle_model_id').notNullable()
      table.integer('category_id').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
