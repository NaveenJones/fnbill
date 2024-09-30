import { Request, Response, NextFunction } from "express";

const exclude_route = (
  middleware: (req: Request, res: Response, next: NextFunction) => void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const path_1 = /^\/api\/files\/.+\..+$/;
    const path_2 = /^\/api(.*)$/;

    if ((path_1.test(req.url) && req.method === "GET") || !path_2.test(req.url))
      return next();
    else return middleware(req, res, next);
  };
};
export default exclude_route;
