"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFile = exports.getFile = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const response_handling_1 = require("../common/response.handling");
const getFile = (req, res) => {
    const filename = req.params.filename;
    const filePath = path_1.default.join(__dirname, "../../uploads", filename);
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        if (err)
            return res.sendFile(path_1.default.join(__dirname, "../../uploads", "error.png"));
        return res.sendFile(filePath);
    });
};
exports.getFile = getFile;
const postFile = (req, res) => {
    if (!req.file)
        return res.json((0, response_handling_1.res_func)({ code: 1422 }));
    const content = { filename: req.file.filename };
    return res.json((0, response_handling_1.res_func)({ code: 1200, content }));
};
exports.postFile = postFile;
