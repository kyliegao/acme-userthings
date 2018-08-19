express = require('express')
sequelize = require('sequelize')
path = require('path')
app = express()
const PORT = 3000

const {db, seed, User, Thing, UserThing} = require('./models.js')

app.use(express.static(path.join(__dirname, './src')))
app.use('/public', express.static(path.join(__dirname, './public')))

app.get('/api/users', async(req, res, next) => {
    try{
        // data = await UserThing.findAll({
        //     include: [
        //         { model: User }, 
        //         { model: Thing }
        //     ]
        // })

        data = await User.findAll({
            include: [
                {model: UserThing, 
                    include: [{model: Thing}]
                }
            ]
        })
        res.send(data)

    }catch(ex){next(ex)}
})


const init = async () => {
    try {
        await db.sync({force: true})
        await seed()
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`)
        })
    }
    catch(ex){console.log(ex)}
}

init()