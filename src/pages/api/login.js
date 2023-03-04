import connectDB from "../../middleware/db";
import * as bcrypt from "../../middleware/bcrypt";
import User from "../../Models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { email, password } = req.body;
    if (email && password) {
      let user = await User.findOne({ email: email });
      if (user != null) {
        try {
          // check the password
          if (bcrypt.check(password, user.password)) {
            let fUser = user.toJSON();
            delete fUser.password;
            return res.status(200).send(fUser);
          } else {
            return res.status(403).send("password_not_correct");
          }
        } catch (error) {
          return res.status(500).send(error.message);
        }
      } else {
        return res.status(404).send("email_does_not_exist");
      }
    } else {
      res.status(422).send("missing_data");
    }
  } else {
    res.status(422).send("unsupported_method");
  }
  res.status(422).send("dead_end");
};

export default connectDB(handler);
