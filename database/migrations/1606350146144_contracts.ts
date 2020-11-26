import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contracts extends BaseSchema {
  protected tableName = 'contracts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('contract_date').notNullable()
      table.date('contract_cancel_date')
      table.integer('penalty').notNullable()
      table.string('payment_type').notNullable()
      table.decimal('contract_value', 10, 2).notNullable()
      table.timestamps(true)
      table.dateTime('deleted_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
