import passport from "passport";

export const passportCall = (strategy) => {
  return async (request, response, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      function (error, user, info) {
        if (error) return next(error);
        if (!user)
          return response
            .status(401)
            .send({ error: info.messages ? info.messages : info.toString() });
        request.user = user;
        next();
      }
    )(request, response, next);
  };
};


export const passportCallRedirect = (strategy) => {
  return async (request, response, next) => {
    passport.authenticate(
      strategy,
      { session: false },
      function (error, user, info) {
        if (user) {
          request.user = user;
          return response.redirect("/products");
        }
        next();
      }
    )(request, response, next);
  };
};

export const authorizationRole = (roles) => {
  return async (request, response, next) => {
    const { user } = request.user;
    if (!user) return response.status(401).send({ error: `Unauthorizad` });
    if (!roles.includes(user.role))
      return response.status(403).send({ error: `No permissions` });
    next();
  };
}
