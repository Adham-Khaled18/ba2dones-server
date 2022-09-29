import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned()
      table.integer('tweet_id').unsigned()
      table.primary(['user_id','tweet_id'])
      table.foreign('user_id').references('users.id')
      table.foreign('tweet_id').references('tweets.id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
