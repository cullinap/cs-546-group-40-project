const userData = require("../data/user");
const playerData = require("../data/players");
const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");
const { homeData } = require("../data");

async function playerSeed() {
    // const db = await connection.connectToDb();
    // await db.dropDatabase();
    console.log("creating player") 

    let playerData = await homeData.playerNameIdMap();
    // try {
    //     await mapEspnIdToPlayer.(
    //         id
    //         , firstName
    //         , lastName
    //     )

    // console.log('player created')

    // } catch(e) {
    //     console.log(e)
    // }

    // await connection.closeConnection();
}

playerSeed()

