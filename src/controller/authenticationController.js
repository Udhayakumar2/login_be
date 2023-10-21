import { signInSchema, signUpSchema } from "../validators/validator.js";
import { createUser, loginUser } from "../service/authenticationService.js";
import { CONSTANT_MESSAGE } from "../common/constants.js";
import { getJwtToken } from "../middleware/authentication.js";

export const register = async (req, res) => {
    try {
        await signUpSchema.validateAsync(req.body);
        const user = await createUser(req.body);
        return res.status(user.statusCode).send(user);
    } catch (error) {
        console.log("Error in Register API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        await signInSchema.validateAsync(req.body);
        let user = await loginUser(req.body);
        if (user.status != 'error') {
            let token;
            token = await getJwtToken(user.data);

            user.data = {"token":token};
        }
        return res.status(user.statusCode).send(user);
    } catch (error) {
        console.log("Error in Login API: ", error);
        return res.status(500).send({ statusCode: 500, status: CONSTANT_MESSAGE.STATUS.ERROR, message: error.message });
    }
};