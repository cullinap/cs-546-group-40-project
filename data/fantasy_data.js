const mongoCollections = require("../config/mongoCollections");
const fantasyData = mongoCollections.fantasy_data;
const { ObjectId } = require("mongodb");

module.exports = {
    async create(name) {
        const fantasyCollection = await fantasyData()

        let newUser = {
            name:name
        }

        const insertInfo = await fantasyCollection.insertOne(newUser)

        return newUser 
    },
    
    async getAll() {
        const fantasyCollection = await bands();

        return fantasyCollection
    }
}