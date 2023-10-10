import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.env.NODE_ENV + ".env"),
});


const URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.buwlub1.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export default {
  mongoUrl: URL,
  jwtPrivate: process.env.JWT_PRIVATE_KEY,
  persistence: process.env.PERSISTENCE,
};
