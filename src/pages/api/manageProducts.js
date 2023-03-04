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
        const {
          email,
          type,
          color,
          waterproof,
          sn,
          cost,
          cargo,
          total,
          sell,
          benefit,
          remarks,
        } = req.body;
        if (!email) {
          return res.status(401).send("Unauthorized");
        } else {
          let user = await User.findOne({ email: email }).catch(() => null);
          if (
            !user ||
            (!user.permissions.includes(0) && !user.permissions.includes(1))
          ) {
            return res.status(401).send("Unauthorized");
          } else {
            let product = new Product({
              type: type,
              color: color,
              waterproof: waterproof,
              SN: sn,
              cost: cost,
              cargo: cargo,
              total: total,
              sell: sell,
              benefit: benefit,
              remarks: remarks,
              addedByEmail: user.email,
              addedByName: user.name,
            });
            await product.save();
            return res.status(200).send(product.toJSON());
          }
        }
        break;
      case "delete":
        const { productId } = req.body;
        if (!productId) return res.status(422).send("missing_data");
        const toDelProduct = await Product.findOneAndRemove({
          _id: productId,
        }).catch((e) => null);
        if (!toDelProduct) return res.status(404).send("product_not_found");
        return res.status(200).send("deleted_successfully");
        break;
      case "edit":
        const { oldProduct, newProduct } = req.body;
        if (oldProduct && newProduct) {
          const oldProductT = JSON.parse(JSON.stringify(oldProduct));
          const newProductT = JSON.parse(JSON.stringify(newProduct));

          const updatedProduct = await Product.findOneAndUpdate(
            { _id: oldProductT._id },
            newProductT
          ).catch(() => null);

          if (updatedProduct) {
            return res.status(200).send(updatedProduct);
          } else {
            res.status(404).send("Product not found");
          }
        } else {
          res.status(422).send("missing_data");
        }
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
