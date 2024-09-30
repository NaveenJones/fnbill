import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { log } from "console";

const token_validation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    try {
      const user_response = await axios.get(
        `https://auth.fnmoney.ai/realms/fnauth/protocol/openid-connect/userinfo`,
        {
          headers: {
            Authorization: req.headers.authorization,
          },
        }
      );

      if (user_response.status === 200) {
        req.user = user_response.data;
        next();
      } else {
        res.status(401).json({
          error: "UNAUTHORIZED - Token Validation Failed",
        });
      }
    } catch (error) {
      res.status(401).json({
        error: "UNAUTHORIZED - Request Failed",
      });
    }
  } else {
    res.status(401).json({
      error: "UNAUTHORIZED - No Token",
    });
  }
};

export default token_validation;
