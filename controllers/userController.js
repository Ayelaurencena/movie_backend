const { render, response } = require("../app");

class UserController {

    constructor (userService) {
        this.userService = userService;
    }

    async getUsers(req, res) {
        const users = await this.userService.getUsers();

        res.json(users);
    }

    async getUserById(req, res) {
        const id = req.params.id;

        const user = await this.userService.getUserById(id);
        return res.json(user);

    }

    async createUser(req, res) {
        const { body } = req;
       

        if(body.name && body.password) {
            const name = body.name.toLowerCase();
            try {

                const user = await this.userService.createUser({...body, name});
                console.log(user);
                return res.status(200).json(user);

            } catch(e) {
                return res.status(400);
            }
        } else {
            res.sendStatus(400);
        }
    }

    editUser(req, res) {
        res.send("El usuario ha sido editado");

    }

    deleteUser(req, res) {
        res.send("El usuario ha sido borrado");
    }

} 

module.exports = UserController;