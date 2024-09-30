import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { res_func } from "../common/response.handling";

export const getFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../uploads", filename);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) return res.sendFile(path.join(__dirname, "../../uploads", "error.png"));
    return res.sendFile(filePath);
  });
};

export const postFile = (req: Request, res: Response) => {
  if (!req.file) return res.json(res_func({ code: 1422 }));
  const content = { filename: req.file.filename };
  return res.json(res_func({ code: 1200, content }));
};
