import mongoose from "mongoose";
var Schema = mongoose.Schema;

/* Permissions:
    0 - Admin [Everything]
    1 - manage products [add/remove/update products]
    2 - manage users [add/remove/update users]
    3 - sell things
    4 - ..
*/

var SoldItemSchema = new Schema({
  productId: { type: String },
  name: { type: String },
  SN: { type: String },

  originalPrice: { type: String },
  soldAt: { type: Date, default: Date.now },
  soldFor: { type: String },
  sellerBenefits: { type: String },
  amount: { type: String, default: "1" },
});

var user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  since: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: [Number],
    default: [],
  },
  soldItems: {
    type: [SoldItemSchema],
    default: [],
  },
});

mongoose.models = {};

var User = mongoose.model("User", user);

export { SoldItemSchema };
export default User;
