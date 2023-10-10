import { USER_REPOSITORY } from "../repository/repositoryManager.js";

export default class SessionServices {
  getUser = async (email) => await USER_REPOSITORY.getUser(email);
  saveUser = async (user) => await USER_REPOSITORY.register(user);
  changePassword = async ({ email, newpassword }) =>
    await USER_REPOSITORY.resetPassword({ email, newpassword });
}
