import { hashSync, compareSync, genSaltSync } from 'bcrypt'

//hashea
export function hash( ev ) {
    return hashSync(ev, genSaltSync(10))
}

//compara
export function hashedCompare(recibida, almacenada) {
    return compareSync(recibida, almacenada)
}