"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const external_api_1 = require("../api/external.api");
const response_handling_1 = require("../common/response.handling");
const createUser = async (req, res) => {
    const { email, firstName, lastName, username, password } = req.body;
    const { data: { access_token }, } = await (0, external_api_1.getTokenAPI)();
    const userData = {
        email,
        firstName,
        lastName,
        username,
        emailVerified: true,
        enabled: true,
        credentials: [
            {
                type: "password",
                value: password,
                temporary: false,
            },
        ],
    };
    const response = await (0, external_api_1.createUserAPI)(access_token, userData);
    if (response.status === 201)
        return res.json((0, response_handling_1.res_func)({ code: 1201, content: username }));
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    const { data: { access_token }, } = await (0, external_api_1.getTokenAPI)();
    const user_list_response = await (0, external_api_1.getAllUsersAPI)(access_token);
    if (user_list_response.status === 200)
        return res.json((0, response_handling_1.res_func)({ code: 1200, content: user_list_response.data }));
};
exports.getUsers = getUsers;
