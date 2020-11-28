import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class VehicleModels extends BaseSchema {
  protected tableName = 'vehicle_models'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('model_name').notNullable()
      table.timestamps(true)
      table.timestamp('deleted_at')
      table.integer('brand_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
