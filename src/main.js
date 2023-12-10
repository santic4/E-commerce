import express from 'express'
import { connect } from 'mongoose'
import { PORT, MONGODB } from './config.js'
import { apiRouter } from './routers/apiRouter.js'
import { webRouter } from './routers/webRouter.js'
import { engine } from 'express-handlebars'

const app = express()

app.engine ('handlebars', engine())
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use('/static', express.static('./static'))

await connect(MONGODB)
console.log(`Base de datos conectada en ${MONGODB}`)


app.use("/api", apiRouter)
app.use('/', webRouter)

app.listen(PORT, () => {
    console.log (`Conectado al puerto ${PORT}`)
})