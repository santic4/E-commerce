import express from 'express'
import { connect } from 'mongoose'
import { PORT, MONGODB } from './config.js'
import { apiRouter } from './routers/api/apiRouter.js'
import { webRouter } from './routers/web/webRouter.js'
import { engine } from 'express-handlebars'
import { sesiones } from './middlewares/sesiones.js'

const app = express()
app.use(express.urlencoded({ extended: true }))


app.engine ('handlebars', engine())
app.set('views', './views');
app.set('view engine', 'handlebars');
app.use('/static', express.static('./static'))
app.use(sesiones)

await connect(MONGODB)
console.log(`Base de datos conectada en ${MONGODB}`)


app.use("/api", apiRouter)
app.use('/', webRouter)

app.listen(PORT, () => {
    console.log (`Conectado al puerto ${PORT}`)
})