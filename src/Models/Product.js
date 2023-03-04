import mongoose from "mongoose";
var Schema = mongoose.Schema;

/* Permissions:
    0 - Admin [Everything]
    1 - manage products [add/remove/update products]
    2 - sell things
    3 - ..
*/

const productSchema = new Schema({
  type: { type: String, default: "-" },
  color: { type: String, default: "-" },
  waterproof: { type: String, default: "-" },
  SN: { type: String, default: "-" },
  cost: { type: String, default: "-" },
  cargo: { type: String, default: "-" },
  total: { type: String, default: "-" },
  sell: { type: String, default: "-" },
  benefit: { type: String, default: "-" },
  remarks: { type: String, default: "-" },
  addedByEmail: { type: String, default: "-" },
  addedByName: { type: String, default: "-" },
});

mongoose.models = {};

var Product = mongoose.model("Product", productSchema);

export default Product;
export { productSchema };
