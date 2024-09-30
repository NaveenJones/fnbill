export const withErrorHandling = (func: Function): Function => {
  return async function (this: any, ...args: any[]) {
    try {
      return await func.apply(this, args);
    } catch (error) {
      // Handle the error here
      console.error("Error occurred:", error);
      // Return JSON response with error message
      return { code: 400, message: "Error occurred" };
    }
  };
};
