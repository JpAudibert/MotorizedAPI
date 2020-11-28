import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Clients extends BaseSchema {
  protected tableName = 'clients'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('email').notNullable()
      table.string('cpf').notNullable()
      table.string('phone').notNullable()
      table.date('birthday').notNullable()
      table.string('cnh_register').notNullable()
      table.string('cnh_mirror').notNullable()
      table.timestamps(true)
      table.timestamp('deleted_at')
      table.integer('city_id').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
