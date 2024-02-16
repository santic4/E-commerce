import express from 'express'
import { connect } from 'mongoose'
import { PORT, MONGODB } from './config.js'
import { apiRouter } from './routers/api/apiRouter.js'
import { webRouter } from './routers/web/webRouter.js'
import { engine } from 'express-handlebars'
import { cookies } from './middlewares/cookies.js'
import { sesiones } from './middlewares/sesiones.js'
import { passportInitialize } from './middlewares/authentication.js'
import { loggerInRequest } from './middlewares/logger.js'
import { logger } from './utils/logger.js'

await connect(MONGODB)

logger.info(`Base de datos conectada en ${MONGODB}`)

const app = express()

app.engine ('handlebars', engine())

// Logger
app.use(loggerInRequest)

app.listen(PORT, () => {
    logger.info(`servidor escuchando peticiones en puerto: ${PORT}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookies)
app.use(sesiones)
app.use(passportInitialize)

app.set('views', './views');
app.set('view engine', 'handlebars');



app.use('/static', express.static('./static'))


app.use('/api', apiRouter)
app.use('/', webRouter)
