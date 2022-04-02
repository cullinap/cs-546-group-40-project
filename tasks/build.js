const fantasyData = require("../data/fantasy_data"); // must have two dots for get file
const connection = require("../config/mongoConnection");
const mongoCollections = require("../config/mongoCollections");

const getFantasyInfo = mongoCollections.fantasy_data;

async function main() {
    const db = await connection.connectToDb();
    await db.dropDatabase();
    console.log("creating user") 

    let userOne = undefined;

    try {
        await fantasyData.create(
            'Jose'
        )

        // fantasy_data.getAll();
    } catch(e) {
        console.log(e)
    }

    await connection.closeConnection();
}

main() 
