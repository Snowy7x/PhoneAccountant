import connectDB from "../../middleware/db";
import * as bcrypt from "../../middleware/bcrypt";
import User from "../../Models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { name, email, password } = req.body;
    if (name && email && password) {
      let exists = await User.find({ email: email });
      if (exists.length > 0) return res.status(404).send("email_exists");
      try {
        // Hash password to store it in DB
        var passwordhash = await bcrypt.sign(password);
        var user = new User({
          name,
          email,
          password: passwordhash,
        });
        // Create new user
        var usercreated = await user.save();
        return res.status(200).send(usercreated);
      } catch (error) {
        return res.status(500).send(error.message);
      }
    } else {
      res.status(422).send("missing_data");
    }
  } else {
    res.status(422).send("unsupported_method");
  }
};

export default connectDB(handler);
