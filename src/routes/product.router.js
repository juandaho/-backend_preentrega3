import RouterClass from "./Router.class.js";
import { uploader } from "../utils.js";
import {
  deleteProduct,
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { authorizationRole, passportCall } from "../middleware/session.js";

class ProductRouterClass extends RouterClass {
  init() {
    this.get("/", passportCall("jwt"), authorizationRole(["user", "admin"]), getProducts);
    this.post("/", passportCall("jwt"), authorizationRole(["admin"]), uploader.array("thumbnails"), saveProduct);
    this.get("/:pid", passportCall("jwt"), authorizationRole(["user", "admin"]), getProduct);
    this.delete("/:pid", passportCall("jwt"), authorizationRole(["admin"]), deleteProduct);
    this.put("/:pid", passportCall("jwt"), authorizationRole(["admin"]), updateProduct);
  }
}

export default ProductRouterClass;
