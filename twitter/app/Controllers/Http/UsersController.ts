import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User"
import { generateFromEmail } from "unique-username-generator";
import Database from '@ioc:Adonis/Lucid/Database'

export default class UsersController {
    public async signup({request,response}){
       const username = generateFromEmail(request.body().email,4);
        const data = request.only(['name','password','email'])
        data["genusername"] = username
        const user = await User.create(data);
        response.status(201)
        return user
        
    }

    public async login({request,response,auth}:HttpContextContract){
        const {uid,password} = request.only(['uid','password'])
        try{
          const jwt = await auth.use('jwt').attempt(uid,password)
          response.status(202)
            return jwt
            
           
        }catch(error){
            response.unauthorized()
        }
    }

    public async search({response,params}:HttpContextContract){
        try{
        const search =  User.query().from('users').where('email',params.id).orWhere('genusername',params.id)
        response.ok
        return search
        
        }catch(e){
            response.notFound()
        }

    }

    public async follow({request,response,auth}){
        const user_id = auth.use("jwt").user?.$attributes.id;
        try{await Database
        .table('followers')
        .insert({
            follower_id: user_id,
            following_id: request.body().id
          })
        response.status(201);

        }catch(e){
            response.status(404)
            console.log(e)
        }
        }
    }

