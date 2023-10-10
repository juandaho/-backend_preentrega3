import { userModel } from "../models/user.model.js";

export default class UserManagerDB {
  async create(userInfo) {
    try {
      let result = await userModel.create(userInfo);
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }

  async get(email) {
    try {
      let user = await userModel.findOne({ email }, { __v: 0 }).lean();
      if (!user) throw new Error(`User not exists.`);
      return user;
    } catch (error) {
      return { error: error.message };
    }
  }

  async updatePassword({ email, newpassword }) {
    try {
      let user = await this.get(email);
      if (user?.error) throw new Error(user.error);
      let result = await userModel.updateOne(
        { email },
        { $set: { password: newpassword } }
      );
      return result;
    } catch (error) {
      return { error: error.message };
    }
  }
}
