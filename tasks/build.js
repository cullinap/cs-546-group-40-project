const userData = require("../data/user"); // must have two dots for get file
const playerData = require("../data/players");
const userTeamData = require("../data/user_team")
const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const passwordHash = require('password-hash');

const getFantasyInfo = mongoCollections.fantasy_data;

async function userBuild() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("creating user") 

    let userOne = undefined;
    let jose_pw = passwordHash.generate('123456')

    try {
        await userData.createUser(
            'jose'
            , 'Canseco'
            , 'jose.canseco@gmail.com'
            , jose_pw
            , 'https://static.wikia.nocookie.net/baseball/images/2/21/Jos%C3%A9_Canseco.jpg/revision/latest?cb=20110511205513'
        )

    console.log('user created')

    const userList = await userData.getAll();
    console.log(userList)

    const userListByName = await userData.getAllUsersIdAndName();
    console.log(userListByName)

    } catch(e) {
        console.log(e)
    }

    await connection.closeConnection();
}

async function playerBuild() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("creating player") 

    let teamId = passwordHash.generate('Packers')
    let jose_pw = passwordHash.generate('123456')

    try {
        await playerData.createPlayer(
            'Aaron'
            , 'Rodgers'
            , 2005
            , 'image.png'
            , 'QuarterBack'
            , teamId
            , 1
        )

        await userData.createUser(
            'jose'
            , 'Canseco'
            , 'jose.canseco@gmail.com'
            , jose_pw
            , 'https://static.wikia.nocookie.net/baseball/images/2/21/Jos%C3%A9_Canseco.jpg/revision/latest?cb=20110511205513'
        )

        await userTeamData.createPlayer(
            123
            , 'Jose'
            , ['Aaron Rodgers']
        )
 

    console.log('player created')

    // const playerList = await userData.getAll();
    // console.log(userList)

    // const userListByName = await userData.getAllUsersIdAndName();
    // console.log(userListByName)

    } catch(e) {
        console.log(e)
    }

    await connection.closeConnection();
}

//userBuild() 
playerBuild()
