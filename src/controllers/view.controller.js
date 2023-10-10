import { PRODUCT_SERVICES, CART_SERVICES } from "../services/servicesManager.js";

export const loginView = async (request, response) => {
  response.render("user/login", {
    title: "Login",
    style: "home",
    logued: false,
  });
};

export const resetPasswordView = async (request, response) => {
  response.render("user/resetpassword", {
    title: "Reset Password",
    style: "home",
    logued: false,
  });
};

export const registerView = async (request, response) => {
  if (request.user?.email) return response.redirect("/products");
  response.render("user/register", {
    title: "Registro",
    style: "home",
    logued: false,
  });
};

export const perfilView = async (request, response) => {
  const { user } = request.user;
  response.render("user/perfil", {
    title: "Registro",
    style: "home",
    user,
    role: user.role === 'admin',
    logued: true,
  });
};

export const productsView = async (request, response) => {
  const { user } = request.user;
  const { limit, sort, page, query } = request.query;
  const { docs, ...pag } = await PRODUCT_SERVICES.getProducts(
    parseInt(limit),
    page,
    query,
    sort
  );
  let urlParams = `?`;
  if (query) urlParams += `query=${query}&`;
  if (limit) urlParams += `limit=${limit}&`;
  if (sort) urlParams += `sort=${sort}&`;
  pag.prevLink = pag.hasPrevPage ? `${urlParams}page=${pag.prevPage}` : null;
  pag.nextLink = pag.hasNextPage ? `${urlParams}page=${pag.nextPage}` : null;
  response.render("products", {
    error: docs === undefined,
    products: docs,
    pag,
    title: "Products",
    style: "home",
    sort,
    query,
    user,
    role: user.role === 'admin',
    cart: user.cart,
    logued: true,
  });
};

export const productDetailView = async (request, response) => {
  const { user } = request.user;
  let { pid } = request.params;
  let product = await PRODUCT_SERVICES.getProduct(pid);
  let error = product?.error ? true : false;
  response.render("productdetail", {
    error,
    product,
    title: `Product ${product.title}`,
    style: "home",
    logued: true,
    role: user.role === 'admin',
    cart: user.cart,
  });
};

export const newProductView = async (request, response) => {
  const { user } = request.user;
  response.render("newproduct", {
    title: "Products",
    style: "home",
    logued: true,
    role: user.role,
  });
};

export const cartView = async (request, response) => {
  const { user } = request.user;
  const cid = user.cart;
  let { products, _id } = await CART_SERVICES.getCart(cid);
  response.render("carts", {
    title: "Products",
    style: "home",
    products,
    _id,
    display: products.length > 0 ? true : false,
    logued: true,
    role: user.role === 'admin'
  });
};

export const logoutView = async (request, response) => {
  response.clearCookie("tokenBE").redirect("/login");
};

export const chatView = async (request, response) => {
  const { user } = request.user;
  response.render("chat", { title: "Chat",style: "styles", logued: true, user });
};
