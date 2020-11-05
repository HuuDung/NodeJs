//CRUD

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {
    useNewUrlParser: true
}, (error, client) => {
    if (error) {
        console.log("Unable to connect to database");
    }

    console.log("Connected correctly");

    const db = client.db(databaseName)

    ///Insert One 
    // db.collection('users').insertOne({
    //     _id: id,
    //     name: "HuDunNguyen",
    //     age: 29
    // }, (error, result) => {
    //     if(error){
    //       return  console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([{
    //         name: "Jane",
    //         age: 18
    //     },
    //     {
    //         name: "James",
    //         age: 20
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    // })

    ///Insert Many
    // db.collection('tasks').insertMany([{
    //         description: "Clean the house",
    //         completed: true
    //     },
    //     {
    //         description: "Renew inspection",
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user");
    //     }
    //     console.log(result.ops);
    // })


    // ////Query
    // db.collection('users').findOne({
    //     name: "HuDun",
    //     age: 27
    // }, (error, user) => {
    //     if (error) {
    //         return console.log("Unable to fetch");
    //     }

    //     console.log(user);
    // })

    // ////Query
    // db.collection('users').find({
    //     age: 29
    // }).toArray((error, users) => {
    //     if (error) {
    //         return console.log("Unable to fetch");
    //     }

    //     console.log(users);
    // })

    // db.collection('users').find({
    //     age: 29
    // }).count((error, count) => {
    //     if (error) {
    //         return console.log("Unable to fetch");
    //     }

    //     console.log(count);
    // })

    // ///Update One
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5f99478cabed85fda0247bf3")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })

    // ///Update Many
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error);
    // })

    db.collection('users').deleteMany({
        age: 29
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
})