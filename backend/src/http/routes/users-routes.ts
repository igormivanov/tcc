import { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register";
import { listUsers } from "../controllers/users/list-users";
import { authenticate } from "../controllers/users/authenticate";
import { verifyJWT } from "../hooks/verify-jwt";
import { updateInterests } from "../controllers/users/update-interests";
import { addFriend } from "../controllers/users/add-friend";
import { removeFriend } from "../controllers/users/remove-friend";
import { listFriends } from "../controllers/users/list-friends";
import { getUser } from "../controllers/users/get-user";
import { updateGeneral } from "../controllers/users/update-general";
import { updatePassword } from "../controllers/users/update-password";
import { updateEmail } from "../controllers/users/update-email";

export async function usersRoutes(app: FastifyInstance){
  app.post('/users', register)
  app.post('/sessions', authenticate) 
  app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  app.get('/user/:userId?', { onRequest: [verifyJWT]}, getUser)
  app.post('/users/update-interests', { onRequest: [verifyJWT] }, updateInterests)
  app.post('/users/add-friends', { onRequest: [verifyJWT] }, addFriend)
  app.delete('/users/remove-friends/:followingId', { onRequest: [verifyJWT] }, removeFriend)
  app.get('/users/list-friends',{ onRequest: [verifyJWT] }, listFriends)
  app.post('/users/update', { onRequest: [verifyJWT] }, updateGeneral)
  app.post('/users/update-password', { onRequest: [verifyJWT] }, updatePassword)
  app.post('/users/update-email', { onRequest: [verifyJWT] }, updateEmail)
  
}