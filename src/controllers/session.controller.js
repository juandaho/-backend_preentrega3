import { SESSION_SERVICES, CART_SERVICES } from "../services/servicesManager.js";
import { generateToken, isValidPassword, createHash } from "../utils.js";

export const login = async (request, response) => {
  let { email, password } = request.body;
  if (!email || !password)
    return response
      .status(400)
      .send({ status: "error", error: `You must complete all fields.` });
  const user = await SESSION_SERVICES.getUser(email);
  if (user?.error)
  return response.status(401).send({ error: `User not found` });
  if (!isValidPassword(user, password))
  return response.status(401).send({ error: `User or Password are wrong` });
  delete user.password;
  const token = generateToken(user);
  response
    .cookie("tokenBE", token, { maxAge: 60 * 60 * 100, httpOnly: true })
    .send({
      success: `Welcome, you will be automatically redirected shortly.`,
    });
};

export const register = async (request, response) => {
  const { first_name, last_name, email, age, password } = request.body;
  let user = await SESSION_SERVICES.getUser(email);
  if (user?.email)
    return response
      .status(400)
      .send({ error: "Email already exists. Try anorther." });

  let res = await CART_SERVICES.createCart();
  let newUser = {
    first_name,
    last_name,
    email,
    age,
    password: createHash(password),
    cart: { _id: res._id },
    role: "user",
  };
  let result = await SESSION_SERVICES.saveUser(newUser);
  let { password: pass, ...userAttributes } = newUser;

  const token = generateToken(userAttributes);
  response
    .cookie("tokenBE", token, {
      maxAge: 60 * 60 * 100,
      httpOnly: true,
    })
    .send({
      success: `Registered correctly. Please go to login.`,
      payload: result,
    });
};

export const resetpassword = async (request, response) => {
  let { email, newpassword } = request.body;
  newpassword = createHash(newpassword);
  let res = await SESSION_SERVICES.changePassword({ email, newpassword });
  res?.error
    ? response.status(400).send({ error: res.error })
    : response.send({
        success: `Password modified succesfully. Please go to login.`,
      });
};

export const current = async (request, response) => {
  const { user } = request.user;
  response.send({ user });
};
