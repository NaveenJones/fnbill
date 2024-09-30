"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const token_validation_middleware_1 = __importDefault(require("./middleware/token_validation.middleware"));
const exclude_route_middleware_1 = __importDefault(require("./middleware/exclude_route.middleware"));
const ApiError_1 = __importDefault(require("./services/ApiError"));
var corsOptions = {
    origin: "http://example.com",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
// for exclude [files/:id] [GET] route
// For Production - Uncomment
app.use((0, exclude_route_middleware_1.default)(token_validation_middleware_1.default));
app.use("/api", routes_1.default);
app.use((err, req, res, next) => {
    let statusCode = 500;
    if (err instanceof ApiError_1.default)
        statusCode = err.statusCode;
    console.error(err);
    res.status(statusCode).json({ error: err.message });
});
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
});
app.listen(3000, () => console.log("REST API server ready at: http://localhost:3000"));
