const bodyParser = require('body-parser')
const express = require('express')
const dbConnect = require('./config/dbConnect')
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const dotenv = require('dotenv').config()
const cors = require('cors')
const app = express()
const PORT =  process.env.PORT || 4000

const authRouter = require('./routes/authRoute')


const server = async()=>{
    await dbConnect()
    app.set('x-powered-by',false)
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())
    app.use(cors())

    app.use('/api/user',authRouter)
    // การนำ error handdler ที่อยู่ใน middlewares มาใช้
    app.use(notFound)
    app.use(errorHandler)
    // end

    app.listen(PORT, () => {
        console.log(`Server is running at PORT ${PORT}`);
    })
}
server()




