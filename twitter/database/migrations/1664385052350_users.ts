import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').unsigned()
      table.string('genusername',45)
      table.string('name',45)
      table.string('email',80)
      table.string('password',200)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
