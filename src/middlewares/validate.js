const Joi = require("joi");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");

//Middleware function that validates user requests against a Joi schema
const validate = (schema) => (req, res, next) => {
  // Request body should be JSON, if present
  if (Object.keys(req.body).length !== 0 && !req.is("application/json")) {
    return next(
      new ApiError(
        httpStatus.UNSUPPORTED_MEDIA_TYPE,
        "Supports JSON request body only"
      )
    );
  }

  // cherry-pick from the input schema ["params", "query", "body"] fields
  const validSchema = pick(schema, ["params", "query", "body"]);

  // cherry-pick from the request object ["params", "query", "body"] fields, which are present in schema
  const object = pick(req, Object.keys(validSchema));

  // Compile schema to Joi schema object and validate the request object
  const { value, error } = Joi.compile(validSchema) //compile js object to joi schema
    .prefs({ errors: { label: "key" } }) //if error occurs, label in the message should be the key variable causing the error
    .validate(object);

  // If validation fails throw 400 Bad Request error
  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }

  // Update validated fields in request with returned value
  Object.assign(req, value);

  return next();
};

module.exports = validate;
