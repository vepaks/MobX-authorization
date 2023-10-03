const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/app-error");
class UserService {
  async registration(email, password) {
    //  проверяваме дали в БД има вече такъв потребилет в противен случай хвърляме грешка
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Потребител с електронна поща ${email} вече съществува!`,
      );
    }
    //  генерираме уникален линк с помоща на uuid (може да се ползва хешираната парола)
    const activationLink = uuid.v4();
    // хешираме паролата
    const hashPassword = await bcrypt.hash(password, 3);

    // запазваме потребителя в БД
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    //  изпращаме писмо на потребителя за активиране на акаунта
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );

    //  създаваме нов клас на user Data Transfer Object (Dto)
    const userDto = new UserDto(user);
    //  генерираме токени с данни от Dto
    const tokens = tokenService.generateTokens({ ...userDto });
    // предаваме данните към сървиса за записване в БД
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    //   връщаме информация за потребителя и двата токена
    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    // търсим дали в БД съюествува акаунт със съшщия линк от параметъра
    const user = await UserModel.findOne({ activationLink });
    //  ако няма акаунт хвърляме грешка
    if (!user) {
      throw ApiError.BadRequest("Неправилен линк за активация");
    }
    //  ако има - променяме полето isActivated на true
    user.isActivated = true;
    // записваме акаунта в БД
    await user.save();
  }

  async login(email, password) {
    //  проверяваме дали вече има регистриран потребител с такъв email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Потребител с email ${email} не съществува.`);
    }
    //  проверяваме дали паролите съвпадат
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Грешна парола.`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }

    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    // намираме потребителя и генерираме нови токени
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...UserDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };

  }
}

module.exports = new UserService();
