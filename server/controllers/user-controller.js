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
      next(e);
    }
  }
  async login(req, res, next) {
    try {
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (e) {
      next(e);


    }
  }
  async activate(req, res, next) {
    try {
    //   взимаме параметъра от link в роутъра и го предаваме в service
    const activationLink = req.params.link
      await userService.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
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
