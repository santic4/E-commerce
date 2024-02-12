import { AuthenticationError } from "../models/errors/authenticationErrors.js"
import { usersManager } from "../models/index.js"
import { hasheadasSonIguales, hashear } from "../utils/cryptografia.js"

class UsersServices {
    async findUserByUsername( {username, password}) {
        try {
            const user = await usersManager.findOne({ username })
            if (!user) { throw new AuthenticationError() }
            if (!hasheadasSonIguales({
              recibida: password,
              almacenada: user.password
            })) {
              throw new AuthenticationError()
            }
            
        } catch (error) {
          throw new AuthenticationError()
        }
    }

    async resetPass(email, pass) {
        try {
          const newPassword = hashear(pass)

          const actualizado = await usersManager.findOneAndUpdate(
            { email },
            { $set: { password: newPassword } },
            { new: true }
          ).lean()
          
          if (!actualizado) {
            throw new AuthenticationError()
          }
            
        } catch (error) {
          throw new AuthenticationError()
        }

    }
}

export const usersServices = new UsersServices()