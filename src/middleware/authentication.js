import jwt from 'jsonwebtoken';
import { Token } from "../model/token.model.js";
import { CONSTANT_MESSAGE } from '../common/constants.js';

export const getJwtToken =async (req) => {
    const token = jwt.sign({ email: req.email, userId: req._id}, process.env.JWT_TOKEN_SECRET_KEY, { expiresIn: "10d" })
    const obj={
        token: token,
        userId: req._id
    }
    const tokenSave = Token(obj);
    await tokenSave.save();
    return token;
};

export const checkJwtToken = async (req, res , next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({ statuCode: 401, message: CONSTANT_MESSAGE.ERROR_MSG.UNAUTHORIZED_NO_PERMISSION_ERROR });
    }
    const token = authHeader.split(' ')[1]
    if (token) {
        const userTokenValid = await Token.findOne({token: token});
        if(!userTokenValid){
            return res.status(401).send({ statuCode: 401, message: CONSTANT_MESSAGE.ERROR_MSG.UNAUTHORIZED_NO_PERMISSION_ERROR , data: { isLogout : true } });
        }
        jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(401).send({ statuCode: 401, message: err.message, data: { isTokenExpired : true } });
            } else {
                req.user = user;
                next();
            }
        });
    } else {
        return res.status(401).send({ statuCode: "401", message: "Invalid Request : Authentication Error"});
    }
};