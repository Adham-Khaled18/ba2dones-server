import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'followers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('follower_id').unsigned()
      table.integer('following_id').unsigned()
      table.primary(['follower_id','following_id'])
      table.foreign('follower_id').references('users.id')
      table.foreign('following_id').references('users.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
