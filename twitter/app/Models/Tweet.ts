import { BaseModel, BelongsTo, belongsTo, column , ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Tweet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public text: string

  @column()
  public like_count: number

  @column()
  public owner_id: number

  @column()
  public original_id: number

  /////////////////////////////

  @manyToMany(()=>User,{
    pivotTable: 'Likes'
  })
  public liketweet: ManyToMany<typeof User>

  @belongsTo(()=>User,{
    localKey: 'owner_id'
  })
  public user: BelongsTo<typeof User>
}
