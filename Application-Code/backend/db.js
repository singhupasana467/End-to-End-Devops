const mongoose = require("mongoose");

module.exports = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const useDBAuth = process.env.USE_DB_AUTH || false;
        if(useDBAuth){
            connectionParams.user = process.env.MONGO_INITDB_ROOT_USERNAME;
            connectionParams.pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
            connectionParams.authSource = "admin";
        }
        await mongoose.connect(
           process.env.MONGO_CONN_STR,
           connectionParams
        );
        console.log("Connected to database.");
    } catch (error) {
        console.log("Could not connect to database.", error);
    }
};
