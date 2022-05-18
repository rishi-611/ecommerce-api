const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//middleware to authorize only buyers to access a route
const authorizeBuyer = async (req, res, next) => {
  if (req.user.userType !== "buyer") {
    next(
      new ApiError(httpStatus.FORBIDDEN, "Only buyers can excess this route")
    );
  }

  next();
};

module.exports = authorizeBuyer;
