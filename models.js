Sequelize = require('sequelize')
postgres = require ('pg')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/acmeusers', {logging:false})


const User = db.define('user',{
    name: Sequelize.STRING
})

const Thing = db.define('thing', {
    name: Sequelize.STRING
})

const UserThing = db.define('userThing',{
})

User.hasMany(UserThing)
Thing.hasMany(UserThing)
UserThing.belongsTo(User)
UserThing.belongsTo(Thing)

const seed = () => {
    return Promise.all([
        User.create({name: 'larry'}),
        User.create({name: 'shep'}),
        User.create({name: 'moe'}),
        User.create({name: 'curly'}),
        User.create({name: 'joe'}),
        Thing.create({name: 'foo'}),
        Thing.create({name: 'bazz'}),
        UserThing.create(),
        UserThing.create(),
        UserThing.create(),
        UserThing.create(),
        UserThing.create()
    ])
    .then(data => {
        const [larry, shep, moe, curly, joe, foo, bazz] = data
        UserThing.update(
            {userId: moe.id,
            thingId: foo.id},
            {where: {id: 1}}
        ),
        UserThing.update(
            {userId: moe.id,
            thingId: foo.id},
            {where: {id: 2}}
        ),
        UserThing.update(
            {userId: larry.id,
            thingId: foo.id},
            {where: {id: 3}}
        ),
        UserThing.update(
            {userId: larry.id,
            thingId: bazz.id},
            {where: {id: 4}}
        ),
        UserThing.update(
            {userId: shep.id,
            thingId: bazz.id},
            {where: {id: 5}}
        )
    })
    .then (() => {console.log('seed was successful')})
    .catch(reason => {console.log(reason)})
}

module.exports = {
    db,
    User,
    UserThing,
    Thing,
    seed
}