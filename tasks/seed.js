const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const { userData, userTeamData, utilData } = require("../data");
const axios = require("axios");
const passwordHash = require('password-hash');

async function userSeed() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("seeding users") 

    try {

        let email_one = 'firstuser@gmail.com';
        let password_one = passwordHash.generate('12345678')
    
        let email_two = 'seconduser@yahoo.com';
        let password_two = passwordHash.generate('password')

        let userOne = await userData.createUser(
            email_one
            , password_one
        )

        let userTwo = await userData.createUser(
            email_two
            , password_two
        )

        // retrieve user object id 
        let oneId = await utilData.getUserIdByName('firstuser')

        // create a team 
        let teamOne = await userTeamData.createTeam(
            oneId, 'teamOne', ['Aaron Rodgers','Corey Dillon']
        )

        let addTeamToUser = await utilData.addTeam(
            oneId, teamOne
        )

    } catch(e) {
        console.log(e)
    }         

    console.log('user(s) created')
    await connection.closeConnection();
}

async function findUser() {
    const db = await connection.connectToDb();

    try {
        let oneId = await utilData.getUserIdByName('firstuser')
        console.log(oneId)

    } catch(e) {
        console.log(e)
    }

    console.log('fin')
    await connection.closeConnection();

}

userSeed()
//findUser()

