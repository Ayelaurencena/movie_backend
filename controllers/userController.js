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
        try {
            const user = await this.userService.getUserById(id);
            return res.status(200).json(user);
        } catch(e){
            return res.status(400).send("El usuario no existe")
        }
    }

    async createUser(req, res) {
        const { body } = req;
    
        if(body.name && body.password) {
            const name = body.name.toLowerCase();
            try {
                const user = await this.userService.createUser({...body, name});
                return res.json(user);

            } catch(e) {
                return res.status(400);
            }
        } else {
            res.sendStatus(400);
        }
    }

    async editUser(req, res) {
        const { body } = req;
        const { id } = req.params;

        try {

            const editedUser = await this.userService.editUser(id, body);
            return res.sendStatus(200); 

        } catch(e){
            return res.status(400).send("El usuario no se ha podido actualizar")
        }

    }

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const userDeleted = await  this.userService.deleteUser(id);
            return res.status(200).send("El usuario ha sido borrado con éxito");

        } catch(e) {
            return res.status(400).send("El usuario no ha podido ser borrado");
        
    
        }
    }

} 

module.exports = UserController;