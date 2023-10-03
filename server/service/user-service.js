const UserModel = require("../models/user-model");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
class UserService {
  async registration(email, password) {
    //  проверяваме дали в БД има вече такъв потребилет в противен случай хвърляме грешка
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw Error(`Потребител с електронна поща ${email} вече съществува!`);
    }
    //  генерираме уникален линк с помоща на uuid (може да се ползва хешираната парола)
    const activationLink = uuid.v4();
    // хешираме паролата
    const hashPassword = await bcrypt.hash(password, 3);

    // запазваме потребителя в БД
    const user = await UserModel.create({email, password: hashPassword, activationLink})
    //  изпращаме писмо на потребителя за активиране на акаунта
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    //  създаваме нов клас на user Data Transfer Object (Dto)
    const userDto = new UserDto(user);
    //  генерираме токени с данни от Dto
    const tokens = tokenService.generateTokens({...userDto});
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
      throw new Error("Неправилен линк за активация");
    }
    //  ако има - променяме полето isActivated на true
    user.isActivated = true;
    // записваме акаунта в БД
    await user.save();
  }
}

module.exports = new UserService();
