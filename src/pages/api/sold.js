import connectDB from "../../middleware/db";
import * as bcrypt from "../../middleware/bcrypt";
import User from "../../Models/User";
import Product from "@/Models/Product";

const handler = async (req, res) => {
  if (req.method === "POST") {
    // Check if name, email or password is provided
    const { operation } = req.body;
    switch (operation) {
      case "add":
        const { email, productId, soldFor, taken, amount } = req.body;
        if (!email) {
          return res.status(401).send("Unauthorized");
        } else {
          let user = await User.findOne({ email: email }).catch(() => null);
          if (
            !user ||
            (!user.permissions.includes(0) && !user.permissions.includes(3))
          ) {
            return res.status(401).send("Unauthorized");
          } else {
            if (!productId || !soldFor || !taken)
              return res.status(422).send("missing_data");
            let product = await Product.findOne({ _id: productId }).catch(
              () => null
            );
            if (!product) return res.status(404).send("product_not_found");
            // TODO: Update the sold list.
            user.soldItems.push({
              productId: product._id,
              name: product.type,
              SN: product.SN,

              originalPrice: product.sell,
              soldFor,
              sellerBenefits: taken,
              amount: amount ? amount : 1,
            });
            await user.save();
            // TODO: Return the sold list.
            return res.status(200).send({});
          }
        }
        break;
      case "delete":
        return res.status(204).send("Not done yet");
        break;
      case "edit":
        return res.status(204).send("Not done yet");
        break;
      default:
        return res.status(400).send("Wrong operation");
    }
  } else if (req.method === "GET") {
    let products = await Product.find({});
    return res.status(200).send(products);
  } else {
    res.status(422).send("unsupported_method");
  }
};

export default connectDB(handler);
