const mongoCollections = require("../config/mongoCollections");
const fantasyData = mongoCollections.fantasy_data;
const { ObjectId } = require("mongodb");

module.exports = {
    async createUser(firstName, lastName, email, password) {
        const fantasyCollection = await fantasyData()

        let newUser = {
            firstName: firstName
            , lastName: lastName
            , email: email
            , password: password 
        }

        const insertInfo = await fantasyCollection.insertOne(newUser)

        return newUser
    },
    
    async getAll() {
        const fantasyCollection = await fantasyData();

        return fantasyCollection
    }
}