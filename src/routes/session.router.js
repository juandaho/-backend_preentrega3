import RouterClass from "./Router.class.js";
import { current, login, register, resetpassword } from "../controllers/session.controller.js";
import { passportCall } from "../middleware/session.js";

class SessionRouterClass extends RouterClass {
  init() {
    this.post("/login", login);
    this.post("/register", register);
    this.post("/resetpassword", resetpassword);
    this.get("/current", passportCall("jwt"), current);
  }
}

export default SessionRouterClass;
