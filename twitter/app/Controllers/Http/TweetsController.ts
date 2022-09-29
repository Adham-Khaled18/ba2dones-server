import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Tweet from 'App/Models/Tweet'
import Database from '@ioc:Adonis/Lucid/Database'
export default class TweetsController {
    public async tweet({request,response,auth}:HttpContextContract){
        const data = request.only(['text'])
         data["owner_id"] = auth.use("jwt").user?.$attributes.id;
        const tweet = await Tweet.create(data)
        response.created(tweet)
        return tweet
    }

    public async delete({params,response,auth}){
        const user_id = auth.use("jwt").user?.$attributes.id;
        try{
           await Tweet.query().from('tweets').where('owner_id',user_id).andWhere('id',params.id).delete()
            response.status(202)
        }catch(e){
            response.notFound()
            return "No Tweets found!"
        }
    }

    public async feed({response,auth}){
        const user_id = auth.use("jwt").payload!.userId;
        const list = await Database
            .from('tweets')
            .whereIn('owner_id',Database
                .from('followers')
                .select('following_id')
                .where('follower_id',user_id))
        console.log(list)
        response.status(200)
        return list
        
        
    }

    public async like({request,response,auth}){
        const user_id = auth.use("jwt").payload!.userId;
        console.log(user_id)
        const tweet_id = request.only('id');
        try{
            await Database
            .table('likes')
            .insert({
                user_id: user_id,
                tweet_id: tweet_id
            })
            response.status(200)
        }catch(e){
            response.status(404)
            console.log(e)
        }

    }

    public async retweet({request,response,auth}){
        const user_id = auth.use("jwt").payload!.userId;
        const data = {
            "text": request.input('caption'),
            "original_id": request.input('id'),
            "owner_id" :user_id
        }
        const tweet = await Tweet.create(data)
        response.created(tweet)
        return tweet

    }

    public async list_likes({response,auth}){
        const user_id = auth.use("jwt").payload!.userId;
        console.log(user_id)
        try{
           const list = await Database
            .from('likes')
            .select('tweet_id')
            .where('user_id',user_id)

            response.status(200)
            return list
        }catch(e){
            response.status(404)
            console.log(e)
        }
    }
}
