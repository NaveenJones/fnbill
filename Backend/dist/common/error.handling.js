"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withErrorHandling = void 0;
const withErrorHandling = (func) => {
    return async function (...args) {
        try {
            return await func.apply(this, args);
        }
        catch (error) {
            // Handle the error here
            console.error("Error occurred:", error);
            // Return JSON response with error message
            return { code: 400, message: "Error occurred" };
        }
    };
};
exports.withErrorHandling = withErrorHandling;
