const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserService = require("./services/UserService");
const UserInstance = new UserService();
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password"
    },
    async (username, password, cb) => {
      try {
        const userData = await UserInstance.getByName(username);
        if (!userData) {
          console.log("Entro al primero");
          //Este usuario esta mal
          return cb(null, false);
        }

        console.log(userData.password, password);
        const compare = await bcrypt.compare(password, userData.password);

        console.log(compare);

        if (!compare) {
          console.log("Entro al segundo");

          //Este usuario esta mal
          return cb(null, false);
        }

        console.log(userData);
        console.log("Todo esta bien");
        //Este usuario esta bien
        return cb(null, userData);
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
  const data = await UserInstance.getByName(name);

  cb(null, data);
});