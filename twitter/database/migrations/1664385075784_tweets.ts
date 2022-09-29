import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tweets'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.string('text',280)
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('users.id')
      table.integer('original_id').unsigned().nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
