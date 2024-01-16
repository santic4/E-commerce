import mongoose from 'mongoose'
import { MONGODB } from '../src/config.js'

await mongoose.connect(MONGODB)
console.log('connected!')
await mongoose.connection.dropDatabase()
console.log('dropped!')
await mongoose.disconnect()
console.log('disconnected!')