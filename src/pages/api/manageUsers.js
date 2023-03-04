import connectDB from "../../middleware/db";
import * as bcrypt from "../../middleware/bcrypt";
import User from "../../Models/User";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { operation, adminEmail } = req.body;
    if (!adminEmail) return res.status(401).send("Unauthorized");

    let admin = await User.findOne({ email: adminEmail }).catch(() => null);
    if (
      !admin ||
      (!admin.permissions.includes(0) && !admin.permissions.includes(1))
    )
      return res.status(401).send("Unauthorized");

    console.log(operation);
    switch (operation) {
      case "add":
        // Check if name, email or password is provided
        const { name, email, password, permissions } = req.body;
        if (name && email && password && permissions) {
          console.log("permission", permissions);
          let exists = await User.find({ email: email });
          if (exists.length > 0) return res.status(404).send("email_exists");
          try {
            // Hash password to store it in DB
            var passwordhash = await bcrypt.sign(password);
            var newUser = new User({
              name,
              email,
              password: passwordhash,
              permissions,
            });
            // Create new user
            let usercreated = await newUser.save();
            usercreated = usercreated.toJSON();
            delete usercreated.password;
            return res.status(200).send(usercreated);
          } catch (error) {
            console.log("permission", error.message);
            return res.status(500).send(error.message);
          }
        } else {
          res.status(422).send("missing_data");
        }
        break;
      case "delete":
        const { userEmail } = req.body;
        if (!userEmail) return res.status(422).send("missing_data");
        const toDelUser = await User.findOneAndRemove({
          email: userEmail,
        }).catch((e) => null);
        if (!toDelUser) return res.status(404).send("user_not_found");
        return res.status(200).send("deleted_successfully");

      case "edit":
        const { oldUser, newUser } = req.body;
        if (oldUser && newUser) {
          const oldUserT = JSON.parse(JSON.stringify(oldUser));
          const newUserT = JSON.parse(JSON.stringify(newUser));

          const updatedUser = await User.findOneAndUpdate(
            { email: oldUserT.email },
            newUserT
          ).catch(() => null);

          if (updatedUser) {
            return res.status(200).send(updatedUser);
          } else {
            res.status(404).send("Member not found");
          }
        } else {
          res.status(422).send("missing_data");
        }
        break;
      default:
        return res.status(400).send("Wrong operation");
    }
  } else if (req.method === "GET") {
    let FETCHED_users = await User.find({});
    let finalUsers = [];
    for (let fd_user of FETCHED_users) {
      let t = fd_user.toJSON();
      delete t.password;
      finalUsers.push(t);
    }
    return res.status(200).send(finalUsers);
  } else {
    res.status(422).send("unsupported_method");
  }
};

export default connectDB(handler);
