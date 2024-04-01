let mongoose = require("mongoose");

const adminScheme = new mongoose.Schema({
  name: String,
  password: String,
  isAdmin: Boolean
});

const admin = mongoose.model('Admin', adminSchema);


class Admin {
  async createAdmin(name, password) {
    try{
      const newAdmin = new admin({
        name: name,
        password: password, //hash será adicionado!
        isAdmin: true
      });

      await newAdmin.save();
      return true;
    } catch(err) {
      return err;
    }
  }

  async findAdmin() {
    try {
      const resultAdmin = await admin.findOne({isAdmin: true});

      return {data: resultAdmin, status: true};
    } catch(err) {
      return {data: err, status: false};
    }
  }
}

module.exports = new Admin;