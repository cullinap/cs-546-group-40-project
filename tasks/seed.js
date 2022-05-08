const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const { userData, userTeamData, utilData, discussionData } = require("../data");
const axios = require("axios");
const passwordHash = require('password-hash');

async function userSeed() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("seeding users") 

    try {

        let email_one = 'firstuser@gmail.com';
        let email_two = 'seconduser@yahoo.com'
    
        let userOne = await userData.createUser(
            email_one
            , '12345678'
        )

        let userTwo = await userData.createUser(
            email_two
            , 'youllneverguess'
        )

        // retrieve user object id 
        let oneId = await utilData.getUserIdByName('firstuser')
        let twoId = await utilData.getUserIdByName('seconduser')

        // create a team 
        let teamOne = await userTeamData.createTeam(
            String(oneId), 'teamOne', ['Aaron Rodgers','Corey Dillon']
        )

        let teamTwo = await userTeamData.createTeam(
            String(twoId), 'teamDos', ['Patrick Mahomes','Rob Gronk']
        )

        let addTeamToUserOne = await userData.addTeam(
            String(oneId), String(teamOne._id)
        )

        let addTeamToUserTwo = await userData.addTeam(
            String(twoId), String(teamTwo._id)
        )

        let addDiscussion = await discussionData.createDiscussion(
            String(oneId), 'Dinosaurs'
        )

        let getDiscussion = await discussionData.getAllDiscussions()
        
        let addPost = await discussionData.addPostToDiscussion(
            String(getDiscussion[0]._id)
            , String(oneId)
            , 'Dinosaurs are big'
        )

        let respondDiscussion = await discussionData.addPostToDiscussion(
            String(getDiscussion[0]._id)
            , String(twoId)
            , 'Birds are dinosaurs'
        )

        let livelyDebate = await discussionData.createDiscussion(
            String(twoId), 'Grizzly vs. Silverback'
        )

        let getMoreDiscussions = await discussionData.getAllDiscussions()

        let debateResponse = await discussionData.addPostToDiscussion(
            String(getMoreDiscussions[1]._id)
            , String(twoId)
            , 'who would win?'
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

