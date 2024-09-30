"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const token_validation = async (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const user_response = await axios_1.default.get(`https://auth.fnmoney.ai/realms/fnauth/protocol/openid-connect/userinfo`, {
                headers: {
                    Authorization: req.headers.authorization,
                },
            });
            if (user_response.status === 200) {
                req.user = user_response.data;
                next();
            }
            else {
                res.status(401).json({
                    error: "UNAUTHORIZED - Token Validation Failed",
                });
            }
        }
        catch (error) {
            res.status(401).json({
                error: "UNAUTHORIZED - Request Failed",
            });
        }
    }
    else {
        res.status(401).json({
            error: "UNAUTHORIZED - No Token",
        });
    }
};
exports.default = token_validation;
