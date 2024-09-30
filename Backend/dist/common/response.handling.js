"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.res_func = void 0;
const response_status = {
    1200: {
        message: "Successfully executed",
        code: 1200,
    },
    1201: {
        message: "Content Created",
        code: 1201,
    },
    1204: {
        message: "Content Deleted",
        code: 1204,
    },
    1304: {
        message: "Content Not Modified",
        code: 1304,
    },
    1409: {
        message: "Content Already Exists",
        code: 1409,
    },
    1400: {
        message: "Bad request",
        code: 1400,
    },
    1401: {
        message: "Unauthorized Request",
        code: 1401,
    },
    1403: {
        message: "Forbidden Request",
        code: 1403,
    },
    1404: {
        message: "Content Not Found",
        code: 1404,
    },
    1422: {
        message: "Unprocessable Entity",
        code: 1422,
    },
    2304: {
        message: "Payment Already Done",
        code: 2304,
    },
};
const res_func = ({ code, error, content }) => {
    let response = structuredClone(response_status[code]);
    if (error && error !== null)
        response.message = error;
    if (content)
        response.content = content;
    return response;
};
exports.res_func = res_func;
