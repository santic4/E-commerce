import { usersManager } from "../models/index.js";
import { hashear, hasheadasSonIguales } from "../utils/cryptografia.js";
import { usersServices } from '../services/usersServices.js'
import { AuthenticationError } from '../models/errors/authenticationErrors.js'

export class UserDao {

    async createUser(userData) {
        try {
          userData.password = hashear(userData.password)
          const user = await usersManager.create(userData)
          return user.toObject()
        } catch (error) {
          throw new Error('Error creating user');
        }
      };

      async readOne(criteria) {
        const result = await usersManager.findOne(criteria).lean()
        if (!result) throw new Error('NOT FOUND')
        return result
      }
    
      async findUserByUsername({username, password}) {
        try {
          const user = await usersServices.findUserByUsername({username, password})
           
          return user.toObject() 

        } catch (error) {
          throw new AuthenticationError()
        }
      };
    
      async findAllUsers() {
        try {
          return await usersManager.find({}, { password: 0 }).lean();
        } catch (error) {
          throw new AuthenticationError()
        }
      };

      async resetPass(email, pass) {
        try{
          const userUpd = await usersServices.resetPass(email, pass)

          return userUpd
        }catch(error){
          throw new AuthenticationError()
        }

      }

}
