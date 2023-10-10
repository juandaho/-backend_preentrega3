import { USER_DTO } from "../DTO/DTOManager.js";

export default class UserRepository {
  constructor(DAO) {
    this.DAO = DAO;
  }

  async register(user) {
    let userDBFormat = await USER_DTO.user(user);
    return await this.DAO.create(userDBFormat);
  }

  async getUser(email) {    
    return await this.DAO.get(email);
  }

  async resetPassword({ email, newpassword }) {
    return await this.DAO.updatePassword({ email, newpassword });
  }
}
