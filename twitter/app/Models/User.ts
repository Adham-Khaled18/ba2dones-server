import  Hash  from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column,hasMany,HasMany, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Tweet from './Tweet'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public genusername: string

  @column()
  public name: string

  @column()
  public email: string

  @column({serializeAs: null}) // for security
  public password: string
  
/////////////////////////////////

  @hasMany(()=>Tweet,{
    foreignKey: 'owner_id'
  })
  public tweets: HasMany<typeof Tweet>

  @manyToMany(()=>User,{
    pivotTable: 'Followers'
  })
  public follower: ManyToMany<typeof User>
  public following: ManyToMany<typeof User>  

  @manyToMany(()=>Tweet,{
    pivotTable:'Likes'
  })
  public like :ManyToMany<typeof Tweet>

  @beforeSave()
  public static async hashPassword(user:User){
    if (user.$dirty.password){
    user.password = await Hash.make(user.password)
    }
  }
}
