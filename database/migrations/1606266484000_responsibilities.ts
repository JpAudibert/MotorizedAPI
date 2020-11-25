import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Responsibilities extends BaseSchema {
  protected tableName = 'responsibilities'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('sector').notNullable()
      table.timestamps(true)
      table.dateTime('deleted_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
