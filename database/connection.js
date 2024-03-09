let mongoose = require("mongoose");

class Connection {
    async connect() {
        try {
            await mongoose.connect('mongodb://127.0.0.1:27017/agendamento');
        } catch(err) {
            console.error(err);
            console.log("Database connection error!");
        }
    }
}

module.exports = new Connection;