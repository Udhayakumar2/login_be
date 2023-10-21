import { CONSTANT_MESSAGE } from "../common/constants.js";
import { User } from "../model/register.model.js";
import bcrypt from "bcryptjs";

export const createUser = async (reqBody) => {
    try {
      const hashedpassword = await bcrypt.hash(reqBody.password, 5)
      if (reqBody.email != null && await User.findOne({ email: reqBody.email })) {
        return {
          statusCode: 400,
          status: CONSTANT_MESSAGE.STATUS.ERROR,
          message: CONSTANT_MESSAGE.EMAIL.EMAIL_EXISTING
        };
      }
      reqBody.password = hashedpassword;
      let user = User(reqBody)
      await user.save()     
      return {
        statusCode: 200,
        status: CONSTANT_MESSAGE.STATUS.SUCCESS,
        message: CONSTANT_MESSAGE.AUTH.RESIGTER_SUCCESSFULLY
      };
    } catch (error) {
      return {
        statusCode: 500,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: error.message,
      };
    }
};

export const loginUser = async (reqBody) => {
    try {
      let user = await User.findOne({email: reqBody.email})
      if (!user) {
        return {
          statusCode: 400,
          status: CONSTANT_MESSAGE.STATUS.ERROR,
          message: CONSTANT_MESSAGE.AUTH.USER_NOT_REGISTED
        };
      }
      if (!user || !(await bcrypt.compare(reqBody.password, user.password))) {
        return {
          statusCode: 400,
          status: CONSTANT_MESSAGE.STATUS.ERROR,
          message: CONSTANT_MESSAGE.AUTH.INCORRECT_EMAIL_OR_PASSWORD
        };
      }
      return {
        statusCode: 200,
        status: CONSTANT_MESSAGE.STATUS.SUCCESS,
        message: CONSTANT_MESSAGE.AUTH.LOGIN_SUCCESSFULLY,
        data: user
      };
    } catch (error) {
      return {
        statusCode: 500,
        status: CONSTANT_MESSAGE.STATUS.ERROR,
        message: error.message,
      };
    }
  };
  