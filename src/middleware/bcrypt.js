import { compareSync, genSaltSync, hashSync } from "bcryptjs";
export const sign = (pass) => {
  let salt = genSaltSync();
  return hashSync(pass, salt);
};
export const check = (password, hash) => {
  return compareSync(password, hash);
};
