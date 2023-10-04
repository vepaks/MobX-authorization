const ApiError = require("../exceptions/app-error");
const tokenService = require("../service/token-service");
module.exports = function (req, res, next) {
  try {
    // проверяваме дали има данни в header.authorization
    const authorizationHeader = req.header.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    // проверяваме дали има токен
    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    // ако няма грешки значи има токен и той трябва да бъде валидиран
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      next(ApiError.UnauthorizedError());
    }
    // ако всичко е наред слагаме в req полето user данните на потребителя, които ги вадим от userData
    req.user = userData;
  // накрая предаваме управлението в следващия middleware
    next()
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
