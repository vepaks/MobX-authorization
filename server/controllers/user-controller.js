const userService = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/app-error");
class UserController {
  async registration(req, res, next) {
    try {
      //  проверяваме резултата от валидацията
      const errors = validationResult(req);
      // ако има грешка я прихващаме с middleware
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Грешка при валидация", errors.array()),
        );
      }
      //  изваждаме данните от req
      const { email, password } = req.body;
      // изпращаме ги към service
      const userData = await userService.registration(email, password);
      //  запазваме бисквитката
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      //  връщаме информация за потребителя и тoкените към клинета (браузъра)
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      //  запазваме бисквитката
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      //  връщаме информация за потребителя и тoкените към клинета (браузъра)
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      // return res.status(200)
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      //   взимаме параметъра от link в роутъра и го предаваме в service
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
  // test controller
  async getUsers(req, res, next) {
    try {
      res.json(["2145", "Alex"]);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
