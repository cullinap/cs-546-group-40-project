const userData = require("../data/user"); // must have two dots for get file
const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const passwordHash = require('password-hash');

const getFantasyInfo = mongoCollections.fantasy_data;

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("creating user") 

    let userOne = undefined;
    let jose_pw = passwordHash.generate('123456')

    try {
        await userData.createUser(
            'Jose'
            , 'Canseco'
            , 'jose.canseco@gmail.com'
            , jose_pw
        )

        userData.getAll();
    } catch(e) {
        console.log(e)
    }

    await connection.closeConnection();
}

main() 
