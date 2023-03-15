import bcrypt from "bcrypt";
import { userAccess } from "../databases/dbaccess";

const checkPassword = async (userId, password) => {
  const hashed = await userAccess.userFindPasswordById(userId);
  const isPasswordCorrect = await bcrypt.compare(password, hashed);
  return isPasswordCorrect;
};

export { checkPassword };
