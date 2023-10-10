import {
  CART_SERVICES,
  PRODUCT_SERVICES,
  TICKET_SERVICES,
} from "../services/servicesManager.js";

export const getCart = async (request, response) => {
  const { cid } = request?.user?.cart || request?.params;
  let res = await CART_SERVICES.getCart(cid);
  res?.error
    ? response.status(404).send({ res })
    : response.send({ status: `success`, payload: res });
};

export const createCart = async (request, response) => {
  let res = await CART_SERVICES.createCart();
  res?.error
    ? response.status(404).send({ status: res.error })
    : response.send({
        status: `The cart was created succesfully.`,
        payload: res,
      });
};

export const deleteCart = async (request, response) => {
  const { cid } = request.params;
  let res = await CART_SERVICES.deleteCart(cid);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
};

export const updateCart = async (request, response) => {
  const { cid } = request.params;
  const { products } = request.body;
  let res = await CART_SERVICES.updateCart(cid, products);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
};

export const updateProductInCart = async (request, response) => {
  const { cid, pid } = request.params;
  const { quantity } = request.body;
  let res = await CART_SERVICES.updateProductInCart(cid, pid, quantity);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
};

export const addProductInCart = async (request, response) => {
  const { cid, pid } = request.params;
  let res = await CART_SERVICES.addProductInCart(cid, pid);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
};

export const deleteProductInCart = async (request, response) => {
  const { cid, pid } = request.params;
  let res = await CART_SERVICES.deleteProductInCart(cid, pid);
  res?.error
    ? response.status(400).send({ ...res })
    : response.send({ ...res });
};

export const closeCart = async (request, response) => {
  const { cid } = request.params;
  const { user } = request?.user || { user: { email: "m.a@gmail.com" } };
  let cart = await CART_SERVICES.getCart(cid);

  if (cart.products.length > 0) {
    let amount = 0;
    let productWithoutStock = [];
    let purchaser = user?.email || "m.a@gmail.com";

    cart.products.forEach(async ({ product, quantity }) => {
      if (product?.stock >= quantity) {
        amount += product.price * quantity;
        product.stock -= quantity;
        await PRODUCT_SERVICES.updateProduct(product._id, product);
      } else {
        productWithoutStock.push({ product, quantity });
      }
    });

    if (amount > 0) {
      let res = await TICKET_SERVICES.createTicket({ amount, purchaser });
      if (res?.error) {
        return response.status(400).send({ ...res });
      } else {
        let payload = await CART_SERVICES.updateCart(cid, productWithoutStock);
        return response.send({ res, payload });
      }
    } else {
      return response.send({ res: "No products available." });
    }
  } else {
    return response.send({ res: "There are no products in the cart." });
  }
};
