"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma_convert = void 0;
const prisma_convert = (data) => {
    return JSON.parse(JSON.stringify(data));
};
exports.prisma_convert = prisma_convert;
