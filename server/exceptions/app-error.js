module.exports = class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.errors = errors;
    this.status = status;
  }
  // static финцкията не създава еклемпляр на класа
  static UnauthorizedError() {
    return new ApiError(401, "Потребителят не е логнат");
  }
  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
