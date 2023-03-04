import connectDB from "../../middleware/db";
import * as bcrypt from "../../middleware/bcrypt";
import User from "../../Models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { email } = req.body;
    if (email) {
      let user = await User.findOne({ email: email });
      if (user != null) {
        user = user.toJSON();
        delete user.password;
        return res.status(200).send(user);
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
