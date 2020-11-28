import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Employees extends BaseSchema {
  protected tableName = 'employees'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('password').notNullable()
      table.string('cpf').notNullable()
      table.string('phone').notNullable()
      table.date('birthday').notNullable()
      table.date('hiring_date').notNullable()
      table.date('firing_date')
      table.timestamps(true)
      table.timestamp('deleted_at')
      table.integer('responsibility_id').notNullable()
      table.integer('city_id').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
