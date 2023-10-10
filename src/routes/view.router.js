import RouterClass from "./Router.class.js";
import {
  authorizationRole,
  passportCall,
  passportCallRedirect,
} from "../middleware/session.js";
import {
  cartView,
  chatView,
  loginView,
  logoutView,
  newProductView,
  perfilView,
  productDetailView,
  productsView,
  registerView,
  resetPasswordView,
} from "../controllers/view.controller.js";

class ViewRouterClass extends RouterClass {
  init() {
    this.get("/", passportCallRedirect("jwt"), loginView);
    this.get("/login", passportCallRedirect("jwt"), loginView);
    this.get("/resetpassword", resetPasswordView);
    this.get("/register", passportCallRedirect("jwt"), registerView);
    this.get("/perfil", passportCall("jwt"), authorizationRole(["user", "admin"]), perfilView );
    this.get("/products", passportCall("jwt"), authorizationRole(["user", "admin"]), productsView);
    this.get("/product/:pid", passportCall("jwt"), authorizationRole(["user", "admin"]), productDetailView);
    this.get("/newproduct", passportCall("jwt"), authorizationRole(["admin"]), newProductView);
    this.get("/carts", passportCall("jwt"), authorizationRole(["user", "admin"]), cartView);
    this.get("/logout", logoutView);
    this.get("/chat", passportCall("jwt"), authorizationRole(["user"]), chatView);
  }
}

export default ViewRouterClass;
