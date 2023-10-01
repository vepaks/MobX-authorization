const userService = require("../service/user-service");

class UserController {
  async registration(req, res, next) {
    try {
      //  изваждаме данните от req
      const { email, password } = req.body;
      // изпращаме ги към service
      const userData = await userService.registration(email, password);
      //  запазваме кукито
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      //  връщаме информация за потребителя и ткените към клинета (браузъра)
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }
  async login(req, res, next) {
    try {
    } catch (e) {}
  }
  async logout(req, res, next) {
    try {
    } catch (e) {}
  }
  async activate(req, res, next) {
    try {
    } catch (e) {}
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {}
  }
  // test controller
  async getUsers(req, res, next) {
    try {
      res.json(["2145", "Alex"]);
    } catch (e) {}
  }
}

module.exports = new UserController();
