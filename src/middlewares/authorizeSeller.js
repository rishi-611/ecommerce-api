const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

//middleware to authorize only sellers to access a route
const authorizeSeller = async (req, res, next) => {
  if (req.user.userType !== "seller") {
    next(
      new ApiError(httpStatus.FORBIDDEN, "Only sellers can excess this route")
    );
  }

  next();
};

module.exports = authorizeSeller;
