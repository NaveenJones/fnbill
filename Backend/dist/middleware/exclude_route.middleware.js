"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exclude_route = (middleware) => {
    return (req, res, next) => {
        const path_1 = /^\/api\/files\/.+\..+$/;
        const path_2 = /^\/api(.*)$/;
        if ((path_1.test(req.url) && req.method === "GET") || !path_2.test(req.url))
            return next();
        else
            return middleware(req, res, next);
    };
};
exports.default = exclude_route;
