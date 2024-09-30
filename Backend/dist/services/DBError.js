"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBError = void 0;
const client_1 = require("@prisma/client");
// Has to implemented
const DBError = async (func) => {
    try {
        await func();
    }
    catch (e) {
        if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            return e;
        }
    }
};
exports.DBError = DBError;
