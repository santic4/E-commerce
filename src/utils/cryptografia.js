import { hashSync, compareSync, genSaltSync } from 'bcrypt'

// hashea
export function hash(ev) {
    try {
      return hashSync(ev, genSaltSync(10));
    } catch (error) {
      console.error('Error hashing password:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }
  
  // compara
  export function hashedCompare(recibida, almacenada) {
    try {
      return compareSync(recibida, almacenada);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      throw error; // Puedes manejar el error según tus necesidades
    }
  }