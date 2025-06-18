import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv'

import AdvertiserRouter from './api/routers/advertiser.js'
import ApartmentRouter from './api/routers/apartment.js'
import CategoryRouter from './api/routers/category.js'
import CityRouter from './api/routers/city.js'

const app = express()
const port = 3001

dotenv.config()

app.use(bodyParser.json())
app.use(cors())

// הוספת נתיב סטטי לתמונות
app.use('/pictures', express.static('pictures'))

mongoose.connect(process.env.LOCAL_URI)
    .then(() => {
        console.log('connect to mongoDB! 👍😊');
    })
    .catch(err => {
        console.log({ error: err.message });
    })

app.use('/advertiser', AdvertiserRouter)
app.use('/apartment', ApartmentRouter)
app.use('/category', CategoryRouter)
app.use('/city', CityRouter)

app.listen(port, () => {
    console.log(`my application is listening on http://localhost:${port}`);
})
