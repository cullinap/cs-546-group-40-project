const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const { userData } = require("../data");
const axios = require("axios");
const passwordHash = require('password-hash');

async function userSeed() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("seeding users") 

    let email_one = 'firstuser@gmail.com';
    let password_one = passwordHash.generate('123456')

    let email_two = 'seconduser@yahoo.com';
    let password_two = passwordHash.generate('password')

    try {
        await userData.createUser(
            email_one
            , password_one
        )
    } catch(e) {
        console.log(e)
    }

    try {
        await userData.createUser(
            email_two
            , password_two
        )
    } catch(e) {
        console.log(e)
    }

    console.log('user(s) created')
    await connection.closeConnection();
}

userSeed()

