const User = require("./../models/userModel");
const bcrypt = require("bcrypt");

class UserService {

    async getUsers() {
        const query = await User.find().exec();
        return query;

    }

    async getUserById(id) {
        const query = await User.findOne({"_id" : id}).exec();
        return query;


    }

    async getByName(name) {
        const query = await User.findOne({ name }).exec();
        return query;

    }

    createUser(data) {
        return bcrypt.hash(data.password, 10).then(hash => {
            data.password = hash;
            const newUser = new User(data);
      
            return newUser.save();
          });


    }

    async editUser(id, data) {
        const query = await User.findOneAndUpdate({ _id:id}, data).exec();
        return query;

    }

    async deleteUser(id) {
        const query = await User.deleteOne({_id : id }).exec();
        return query;


    }
}

module.exports = UserService;