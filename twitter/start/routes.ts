/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('/signup','UsersController.signup');
Route.post('/login','UsersController.login');
Route.group(()=>{
    Route.get('/search/:id','UsersController.search');
    Route.post('/follow','UsersController.follow');

    Route.get('/feed','TweetsController.feed');
    Route.post('/like','TweetsController.like');
    Route.post('/tweet','TweetsController.tweet');
    Route.post('/retweet','TweetsController.retweet');
    Route.delete('/tweet/:id','TweetsController.delete');
    Route.get('/like','TweetsController.list_likes')
}).middleware('auth:jwt')
